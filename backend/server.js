const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const sequelize = require("./config/database");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config({ override: true }); // Force reload to fix stuck environment variables

const app = express();
const PORT = process.env.PORT || 5001; // Switched to 5001 to avoid conflicts

// Middleware (Moved to top)
app.use(cors());
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} [${req.method}] ${req.url}`);
  next();
});

// Root route for connectivity test
app.get("/", (req, res) => {
  res.send("<h1>Portfolio Backend is Running on Port 5001 🚀</h1>");
});

// Connect to Database
sequelize.sync({ alter: true }) // CRITICAL: This will add missing columns to your MySQL tables
  .then(() => console.log(`✨ Database (${sequelize.getDialect().toUpperCase()}) Synced & Updated Successfully`))
  .catch(err => {
    console.error("❌ Database Sync Error!");
    console.error("Error details:", err.message);
  });

// Import Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const messageRoutes = require("./routes/messageRoutes");
const verifyToken = require("./middleware/auth");

// Register Routes
app.use("/api", authRoutes); // /api/login, /api/health
app.use("/api/projects", projectRoutes);
console.log("📂 Project Routes Registered");
app.use("/api/messages", messageRoutes);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(uploadDir));

// Protected Upload Route
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

app.post("/api/upload", verifyToken, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ success: true, imageUrl });
});

// Contact Route
const Message = require("./models/Message");
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address" });
  }

  try {
    // 1. Save message to Database
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New contact from ${name}`,
      text: `Message from ${name} <${email}>:\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Message sent and saved securely!" });
  } catch (error) {
    console.error("Error handling contact:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to process request" });
  }
});

// Global 404 Handler (JSON)
app.use((req, res) => {
  console.warn(`📢 404 Not Found: [${req.method}] ${req.url}`);
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found on this server.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Ready to handle requests ✨`);
});
