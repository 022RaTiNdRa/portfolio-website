require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// Test Routes
// ===============================
app.get("/", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from backend 👋",
    time: new Date().toISOString()
  });
});

// ===============================
// 📩 Contact Form API
// ===============================
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields are required"
    });
  }

  try {
    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // ===============================
    // 1️⃣ Email to YOU (Admin)
    // ===============================
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "📩 New Contact Message",
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `
    });

    // ===============================
    // 2️⃣ Auto-reply to USER
    // ===============================
    await transporter.sendMail({
      from: `"Ratindra Parate" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thanks for reaching out! 👋",
      text: `
Hi ${name},

Thanks for contacting me! 😊
I’ve received your message and will get back to you as soon as possible.

Here’s a copy of what you sent:

"${message}"

Best regards,
Ratindra Parate
      `
    });

    console.log("📧 Emails sent successfully");

    res.json({
      success: true,
      message: "Message sent successfully"
    });
  } catch (error) {
    console.error("❌ Email send failed:", error);

    res.status(500).json({
      success: false,
      error: "Failed to send email"
    });
  }
});

// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
