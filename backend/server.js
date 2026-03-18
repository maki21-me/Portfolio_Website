require("dotenv").config({ override: true }); // Force reload to fix stuck environment variables
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const sequelize = require("./config/database");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

console.log("🛠️ DB_HOST:", process.env.DB_HOST);
console.log("🛠️ DB_PORT:", process.env.DB_PORT);
console.log("🛠️ DB_USER:", process.env.DB_USER);
console.log("🛠️ DB_NAME:", process.env.DB_NAME);

const app = express();
const PORT = process.env.PORT || 10000; 

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

// 🛠️ Database Initialization & Retry Logic
const initializeDatabase = async (retries = 5, delay = 5000) => {
  const mysql = require("mysql2/promise");
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    console.log(`📡 Connecting to MySQL at ${process.env.DB_HOST}:${process.env.DB_PORT}...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.end();
    console.log(`✅ Database "${process.env.DB_NAME}" initialized or already exists.`);

    // Now Sync with Sequelize
    await sequelize.sync({ alter: true });
    console.log(`✨ Database (${sequelize.getDialect().toUpperCase()}) Synced & Updated Successfully`);
    
    return true;
  } catch (err) {
    if (retries > 0) {
      console.warn(`⚠️ Database connection failed. Retrying in ${delay/1000}s... (${retries} retries left)`);
      console.error(`Error: ${err.message}`);
      await new Promise(res => setTimeout(res, delay));
      return initializeDatabase(retries - 1, delay);
    } else {
      console.error("❌ Failed to connect to Database after several attempts.");
      console.error("Error details:", err.message);
      // We don't crash the server immediately, but it won't function correctly.
      return false;
    }
  }
};

initializeDatabase();

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
    // 1. ALWAYS Save message to Database first
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    console.log(`💾 Message saved to database with ID: ${newMessage.id}`);

    // 2. Attempt to send Email (Non-blocking)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: 465, // Using 465 (SSL) for better reliability
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000, 
      tls: {
        rejectUnauthorized: false, // Bypass self-signed certificate errors
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `📧 New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // We use a separate try-catch so email failure doesn't stop the DB success response
    try {
      await transporter.sendMail(mailOptions);
      console.log("📤 Email sent successfully");
      res.status(200).json({ success: true, message: "Thank you! Your message has been sent and saved." });
    } catch (mailError) {
      console.error("⚠️ Email delivery failed (but message is saved):", mailError.message);
      // Return success because it IS saved in our admin dashboard!
      res.status(200).json({ 
        success: true, 
        message: "Message received! (Note: Email delivery had a hiccup, but I will see it in my dashboard)",
        partialSuccess: true 
      });
    }
  } catch (dbError) {
    console.error("❌ Database Error handling contact:", dbError);
    res.status(500).json({ success: false, message: "Failed to store your message. Please try again later." });
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
