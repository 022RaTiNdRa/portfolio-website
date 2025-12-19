require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 5000;

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// Resend setup
// ===============================
const resend = new Resend(process.env.RESEND_API_KEY);

// ===============================
// Health / Test Routes
// ===============================
app.get("/", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello from backend 👋",
    time: new Date().toISOString(),
  });
});

// ===============================
// 📩 Contact Form API (NON-BLOCKING)
// ===============================
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields are required",
    });
  }

  // ✅ RESPOND IMMEDIATELY (NO MORE PENDING)
  res.status(200).json({
    success: true,
    message: "Message sent successfully",
  });

  // ===============================
  // 🔥 Background Email Sending
  // ===============================
  (async () => {
    try {
      // Send email to YOU
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: process.env.EMAIL_TO,
        subject: `📩 New message from ${name}`,
        html: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        `,
      });

      // Auto-reply to USER
      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: email,
        subject: "Thanks for reaching out 👋",
        html: `
          <p>Hi ${name},</p>
          <p>Thanks for contacting me! 😊</p>
          <p>I’ve received your message and will reply soon.</p>
          <hr />
          <p><b>Your message:</b></p>
          <p>${message}</p>
          <br />
          <p>— Ratindra</p>
        `,
      });
    } catch (err) {
      console.error("❌ Background email failed:", err);
    }
  })();
});

// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
