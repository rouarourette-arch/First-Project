import React, { useState } from "react";
const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  color: "#2C2A29",
  fontSize: "0.95rem",
};
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Something to ask about us",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "name") {
      setFormData({
        name: value,
        email: formData.email,
        topic: formData.topic,
        subject: formData.subject,
        message: formData.message,
      });
    }

    if (name === "email") {
      setFormData({
        name: formData.name,
        email: value,
        topic: formData.topic,
        subject: formData.subject,
        message: formData.message,
      });
    }

    if (name === "topic") {
      setFormData({
        name: formData.name,
        email: formData.email,
        topic: value,
        subject: formData.subject,
        message: formData.message,
      });
    }

    if (name === "subject") {
      setFormData({
        name: formData.name,
        email: formData.email,
        topic: formData.topic,
        subject: value,
        message: formData.message,
      });
    }
    if (name === "message") {
      setFormData({
        name: formData.name,
        email: formData.email,
        topic: formData.topic,
        subject: formData.subject,
        message: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };
  const sendAnotherMessage = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      topic: "Something to ask about us",
      subject: "",
      message: "",
    });
  };
  if (isSubmitted) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ background: "#fff", padding: "40px", borderRadius: "16px", boxShadow: "var(--shadow-md)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "10px" }}>✉️</div>
          <h2 style={{ color: "#A67B5B", fontSize: "2rem", margin: "0 0 15px 0" }}>Message Sent!</h2>
          <p style={{ fontSize: "1.1rem", color: "#757575", lineHeight: "1.6" }}>
            Thank you for reaching out, <strong style={{ color: "#2C2A29" }}>{formData.name}</strong>.
            We will review your message about <strong style={{ color: "#2C2A29" }}>{formData.topic}</strong> and reply shortly.
          </p>
          <button onClick={sendAnotherMessage} style={{ marginTop: "25px", padding: "12px 24px", background: "#2C2A29", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "500" }}>
            Send Another Message
          </button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#2C2A29", margin: "0 0 10px 0" }}>Contact Us</h1>
        <p style={{ color: "#757575", fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto" }}>
          Have a question or concern? Fill out this form and we will get back to you.
        </p>
      </div>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "40px", borderRadius: "16px", boxShadow: "var(--shadow-md)", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px" }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <label style={labelStyle}>Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
          </div>
        </div>
        <div>
          <label style={labelStyle}>What is this regarding?</label>
          <select name="topic" value={formData.topic} onChange={handleChange}>
            <option value="Something to ask about us">Something to ask about us</option>
            <option value="Reports/Complaints">Reports / Complaints</option>
            <option value="Contact Administration">Contact Administration</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Subject</label>
          <input type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="Brief summary of your message" />
        </div>

        <div>
          <label style={labelStyle}>Message</label>
          <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="Write your message here" rows="6" style={{ resize: "vertical" }} />
        </div>
        <button type="submit" style={{ padding: "16px", background: "#A67B5B", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", fontWeight: "600", cursor: "pointer", marginTop: "10px" }}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
