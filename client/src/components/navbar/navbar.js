import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <a href="/">
          <div className="logo-first">INT</div>
          <div className="logo-last">Formation</div>
        </a>
      </div>
      <ul className="site-links">
        <li><NavLink exact to="/defence" className="defence-link">Guild Wars</NavLink></li>
        <li><NavLink to="/intel" className="intel-link">Intel</NavLink></li>
        <li><NavLink to="/statistics" className="stats-link">Statistics</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
