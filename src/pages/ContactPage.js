import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactForm.css"; // Import your CSS file for styling
import Navbar from "../components/Navbar";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/email/getEmail"
        );
        if (response.data.success) {
          setCurrentEmail(response.data.email);
          setEmail(response.data.email);
        } else {
          console.error("Failed to fetch email");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching email:", error);
        setLoading(false);
      }
    };

    fetchEmail();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.post("http://localhost:3001/api/email/saveEmail", { email });
      setCurrentEmail(email);
      setEditing(false);
      alert("Email updated successfully!");
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  const handleCancel = () => {
    setEmail(currentEmail);
    setEditing(false);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <Navbar activeStyle="ContactPage" />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {editing ? (
            <div className="contact-form">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
              />
              <button onClick={handleUpdate}>Update Email</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <div className="contact-form">
              <p>Email: {currentEmail}</p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContactForm;
