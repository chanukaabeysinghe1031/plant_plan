import React, { useState } from "react";
import axios from "axios";
import "./ContactForm.css"; // Import your CSS file for styling

const ContactForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/email/saveEmail", { email });
      alert("Email saved successfully!");
    } catch (error) {
      console.error("Error saving email:", error);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Save Email</button>
    </form>
  );
};

export default ContactForm;
