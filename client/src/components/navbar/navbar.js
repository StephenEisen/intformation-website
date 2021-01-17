import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "assets/logo.png";
import { Routes } from 'globals/routes.js';

const getClassIfActive = (route) => {
  const currentPath = window.location.pathname;
  return route === currentPath ? 'navbar-link-active' : null;
}

const Navbar = () => {
  return (
    <section>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="IntFormation" />
          <a href="/">
            <div className="navbar-title-first">INT</div>
            <div className="navbar-title-second">Formation</div>
          </a>
        </div>

        <div className="navbar-menu"></div>

        <ul className="navbar-links">
          <li className={getClassIfActive(Routes.Home)}>
            <NavLink exact to={Routes.Home}>Home</NavLink>
          </li>
          <li className={getClassIfActive(Routes.Defence)}>
            <NavLink exact to={Routes.Defence}>Defence</NavLink>
          </li>
          <li className={getClassIfActive(Routes.Intel)}>
            <NavLink to={Routes.Intel}>Intel</NavLink>
          </li>
          <li className={getClassIfActive(Routes.Statistics)}>
            <NavLink to={Routes.Statistics}>Statistics</NavLink>
          </li>
          <li className={getClassIfActive(Routes.About)}>
            <NavLink exact to={Routes.About}>About</NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
