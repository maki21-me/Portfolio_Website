const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Message = require("../models/Message");
const verifyToken = require("../middleware/auth");


// Get all messages
router.get("/", verifyToken, async (req, res) => {
  console.log("🔍 Fetching all messages...");
  try {
    const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
    console.log(`✅ Found ${messages.length} messages`);
    const mappedMessages = messages.map(m => ({ ...m.toJSON(), _id: m.id }));
    res.json(mappedMessages);
  } catch (error) {
    console.error("❌ Error in GET /api/messages:", error);
    res.status(500).json({ message: error.message });
  }
});

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Message router is active" });
});

// Reply to a message
router.post("/reply/:id", verifyToken, async (req, res) => {
  const { replyText } = req.body;
  const messageId = req.params.id;

  try {
    const message = await Message.findByPk(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"Meklit Anteneh" <${process.env.SMTP_USER}>`,
      to: message.email,
      subject: `Response to your message: ${message.name}`,
      text: replyText,
      html: `<div style="font-family: sans-serif; padding: 20px; color: #333;">
               <h2>Hello ${message.name},</h2>
               <p>Thank you for reaching out! Here is my response to your message:</p>
               <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                 ${replyText.replace(/\n/g, '<br>')}
               </div>
               <p>Best regards,<br><strong>Meklit Anteneh</strong></p>
             </div>`,
    });

    // Update message status in DB
    await message.update({
      isReplied: true,
      replyContent: replyText
    });

    res.json({ success: true, message: "Reply sent successfully" });
  } catch (error) {
    console.error("❌ Error sending reply:", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a message
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const result = await Message.destroy({ where: { id: req.params.id } });
    if (result) {
      res.json({ message: "Message deleted" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
