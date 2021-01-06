import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

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
      </ul>
    </nav>
  );
}

export default Navbar;