const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address" });
  }

  try {
    // Create transporter with TLS fix
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587, // STARTTLS port
      secure: false, // false for STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // ignore self-signed certificate
      },
    });

    // Optional: verify connection
    await transporter.verify();

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `New contact from ${name}`,
      text: `Message from ${name} <${email}>:\n\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to send email" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
