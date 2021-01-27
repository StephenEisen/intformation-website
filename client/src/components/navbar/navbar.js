import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./navbar.css";
import logo from "assets/logo.png";
import { Routes } from 'globals/routes.js';

const Navbar = () => {
  const history = useHistory();
  const [navbarClasses, setNavbarClasses] = useState(['navbar']);

  useEffect(() => {
    closeNavBar();
    window.addEventListener('resize', closeNavBar);
  }, []);

  const closeNavBar = () => {
    const classes = ['navbar']

    if (window.innerWidth < 1200) {
      classes.push('hamburger-closed');
    }
    setNavbarClasses(classes);
  }

  const toggleMobileNavBar = () => {
    const newClasses = ['navbar'];

    if (navbarClasses.includes('hamburger-open')) {
      newClasses.push('hamburger-closed');
    } else {
      newClasses.push('hamburger-open');
    }

    setNavbarClasses(newClasses);
  }

  const getClassIfActive = (route) => {
    const currentPath = history.location.pathname;
    return route === currentPath ? 'navbar-link-active' : null;
  }

  return (
    <section>
      <nav className={navbarClasses.join(' ')}>
        <div className="navbar-logo">
          <img src={logo} alt="IntFormation" />
          <a href="/">
            <div className="navbar-title-first">Epic7</div>
            <div className="navbar-title-second">Real Time Intel</div>
          </a>
        </div>

        <div className="navbar-menu" onClick={() => toggleMobileNavBar()}></div>

        <ul className="navbar-links">
          <li className={getClassIfActive(Routes.Home)} onClick={() => toggleMobileNavBar()}>
            <NavLink exact to={Routes.Home}>Home</NavLink>
          </li>
          <li className={getClassIfActive(Routes.Intel)} onClick={() => toggleMobileNavBar()}>
            <NavLink to={Routes.Intel}>Intel</NavLink>
          </li>
          <li className={getClassIfActive(Routes.Statistics)} onClick={() => toggleMobileNavBar()}>
            <NavLink to={Routes.Statistics}>Statistics</NavLink>
          </li>
          <li className={getClassIfActive(Routes.About)} onClick={() => toggleMobileNavBar()}>
            <NavLink exact to={Routes.About}>About</NavLink>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Navbar;
