import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        backgroundColor: "green",
        color: "white",
        padding: "10px",
        height: "40px",
        paddingTop: "20px",
      }}
    >
      <Link style={{ color: "white", marginLeft: "30px" }} to="/">
        Home
      </Link>
      <Link style={{ color: "white", marginLeft: "30px" }} to="/data-table">
        Data Table
      </Link>
      <Link style={{ color: "white", marginLeft: "30px" }} to="/about">
        About Us
      </Link>
      <Link style={{ color: "white", marginLeft: "30px" }} to="/contact">
        Contact
      </Link>
    </nav>
  );
};

export default Navbar;
