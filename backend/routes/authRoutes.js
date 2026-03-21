const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

// Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  console.log(`🔑 Login attempt for: "${username}"`);
  console.log(`📏 Password length: ${password?.length}`);
  console.log(`📏 Hash length: ${adminPasswordHash?.length}`);

  try {
    if (!adminPasswordHash) {
      console.error("❌ ADMIN_PASSWORD_HASH is missing in .env");
      return res.status(500).json({ success: false, message: "Server configuration error" });
    }

    // Use a more robust check - trim just in case
    const isValid = bcrypt.compareSync(password.trim(), adminPasswordHash.trim());

    if (username.trim() === "admin" && isValid) {
      const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, { expiresIn: "24h" });
      console.log("✅ Login successful");
      return res.json({ success: true, token });
    }

    console.warn("❌ Invalid credentials for user:", username);
    res.status(401).json({ success: false, message: "Invalid username or password" });
  } catch (err) {
    console.error("❌ Login processing error:", err);
    res.status(500).json({ success: false, message: "Internal server error during login" });
  }
});

// Health check
router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Auth route is reachable" });
});

module.exports = router;
