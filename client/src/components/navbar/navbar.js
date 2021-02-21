import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Routes } from 'globals/routes.js';
import logo from "assets/logo.png";
import "./navbar.css";
import GoogleLogin from '../login/google-login/google-login'

const Navbar = () => {
  const history = useHistory();
  const [isNavbarOpen, setIsNavBarOpen] = useState(false);

  useEffect(() => {
    closeNavBar();
    window.addEventListener('resize', closeNavBar);

    return () => {
      window.removeEventListener('resize', closeNavBar);
    }
  }, []);

  const closeNavBar = () => {
    setIsNavBarOpen(false);
  }

  const toggleMobileNavBar = () => {
    setIsNavBarOpen(!isNavbarOpen);
  }

  const getClassIfActive = (route) => {
    const currentPath = history.location.pathname;
    return currentPath.includes(route) ? 'navbar-link-active' : null;
  }

  return (
    <section>
      <nav className={`navbar ${isNavbarOpen ? 'hamburger-open' : 'hamburger-closed'}`}>
        <div className="navbar-logo">
          <img src={logo} alt="IntFormation" />
          <div className="navbar-logo-text">
            <div className="navbar-title-first">Epic7</div>
            <div className="navbar-title-second">Intel</div>
          </div>
        </div>

        <div className="navbar-menu" onClick={() => toggleMobileNavBar()}></div>

        <GoogleLogin />

        <ul className="navbar-links">
          <NavLink to={Routes.Intel}>
            <li className={getClassIfActive(Routes.Intel)} onClick={() => toggleMobileNavBar()}>
              Intel
            </li>
          </NavLink>
          <NavLink to={Routes.Statistics}>
            <li className={getClassIfActive(Routes.Statistics)} onClick={() => toggleMobileNavBar()}>
              Statistics
            </li>
          </NavLink>
          <NavLink exact to={Routes.About}>
            <li className={getClassIfActive(Routes.About)} onClick={() => toggleMobileNavBar()}>
              About
            </li>
          </NavLink>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
