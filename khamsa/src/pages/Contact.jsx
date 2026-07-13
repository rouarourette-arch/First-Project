import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '', email: '', topic: 'Something to ask about us', subject: '', message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      // THE NEW LOGIC: Save the message to LocalStorage for the Admin Inbox
      const newMessage = { 
        ...formData, 
        id: Date.now(), 
        date: new Date().toLocaleDateString('en-GB'),
        read: false 
      };
      
      const existingMessages = JSON.parse(localStorage.getItem('khamsa_inbox') || '[]');
      localStorage.setItem('khamsa_inbox', JSON.stringify([newMessage, ...existingMessages]));

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ background: '#fff', padding: '50px 40px', borderRadius: '24px', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✨</div>
          <h2 style={{ color: '#2C2A29', fontSize: '2.2rem', margin: '0 0 15px 0', letterSpacing: '-0.5px' }}>Message Sent!</h2>
          <p style={{ fontSize: '1.1rem', color: '#757575', lineHeight: '1.7', marginBottom: '30px' }}>
            Thank you for reaching out, <strong style={{color: '#A67B5B'}}>{formData.name}</strong>. 
            Our administration team will review your inquiry and respond shortly.
          </p>
          <button 
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', topic: 'Something to ask about us', subject: '', message: '' });
            }}
            style={{ padding: '14px 32px', background: '#F9F8F6', color: '#2C2A29', border: '1px solid #E0E0E0', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', color: '#2C2A29', margin: '0 0 15px 0', letterSpacing: '-1px' }}>Get in Touch.</h1>
        <p style={{ color: '#757575', fontSize: '1.15rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
          Have a question about our artisans or need to reach administration? We are here to help.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '50px', borderRadius: '24px', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. Jane Doe" />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={labelStyle}>Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="jane@example.com" />
          </div>
        </div>

        <div>
          <label style={labelStyle}>What is this regarding?</label>
          <select name="topic" value={formData.topic} onChange={handleChange} style={{ cursor: 'pointer' }}>
            <option value="Something to ask about us">Something to ask about us</option>
            <option value="Reports/Complaints">Reports / Complaints</option>
            <option value="Contact Administration">Contact Administration</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Subject</label>
          <input type="text" name="subject" required value={formData.subject} onChange={handleChange} placeholder="Brief summary of your inquiry" />
        </div>

        <div>
          <label style={labelStyle}>Message</label>
          <textarea name="message" required value={formData.message} onChange={handleChange} placeholder="How can we help you today?" rows="6" style={{ resize: 'vertical' }}></textarea>
        </div>

        <button type="submit" disabled={isSubmitting} style={{ padding: '16px', background: isSubmitting ? '#A67B5B' : '#2C2A29', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '600', cursor: isSubmitting ? 'wait' : 'pointer', marginTop: '15px' }}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2C2A29', fontSize: '0.95rem' };
export default Contact;