import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./logo.png"; // Import your logo image file

const Navbar = ({ activeStyle }) => {
  const [activeStyle1, setActiveStyle1] = useState({
    color: "white",
    width: "200px",
    marginLeft: "30px",
  });
  const [activeStyle2, setActiveStyle2] = useState({
    color: "white",
    width: "200px",
    marginLeft: "30px",
  });
  const [activeStyle3, setActiveStyle3] = useState({
    color: "white",
    width: "200px",
    marginLeft: "30px",
  });
  const [activeStyle4, setActiveStyle4] = useState({
    color: "white",
    width: "200px",
    marginLeft: "30px",
  });

  useEffect(() => {
    console.log(activeStyle);
    if (activeStyle === "DataTable") {
      setActiveStyle2({
        color: "yellow",
        width: "100px",
        padding: "10px",
        marginLeft: "30px",
      });
    } else if (activeStyle === "HomePage") {
      setActiveStyle1({
        color: "yellow",
        marginLeft: "30px",
        padding: "10px",
      });
    } else if (activeStyle === "ContactPage") {
      setActiveStyle4({
        color: "yellow",
        marginLeft: "30px",
        padding: "10px",
      });
    } else if (activeStyle === "AboutUs") {
      setActiveStyle3({
        color: "yellow",
        marginLeft: "30px",
        padding: "10px",
      });
    }
  }, [activeStyle]);

  return (
    <nav
      style={{
        backgroundColor: "green",
        color: "white",
        padding: "10px",
        height: "100px",
        paddingTop: "20px",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ height: "80px", marginLeft: "10px" }}
      />

      <NavLink
        exact
        to="/"
        style={activeStyle1}
        activeStyle={{ fontWeight: "bold", color: "yellow" }}
      >
        Home
      </NavLink>
      <NavLink
        to="/data-table"
        style={activeStyle2}
        activeStyle={{ fontWeight: "bold", color: "yellow" }}
      >
        Logs
      </NavLink>
      <NavLink
        to="/about"
        style={activeStyle3}
        activeStyle={{ fontWeight: "bold", color: "yellow" }}
      >
        About Us
      </NavLink>
      <NavLink
        to="/contact"
        style={activeStyle4}
        activeStyle={{ fontWeight: "bold", color: "yellow" }}
      >
        Update Email
      </NavLink>
    </nav>
  );
};

export default Navbar;
