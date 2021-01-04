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
        <li><NavLink exact to="/" className="project-link">Meme1</NavLink></li>
        <li><NavLink to="/" className="docs-link">Meme2</NavLink></li>
        <li><NavLink to="/" className="blogs-link">Meme3</NavLink></li>
        <li><NavLink to="/" className="about-link">Meme4</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;