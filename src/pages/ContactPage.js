import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/save-email", { email });
      alert("Email saved successfully!");
    } catch (error) {
      console.error("Error saving email:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit">Save Email</button>
    </form>
  );
};

export default ContactForm;
