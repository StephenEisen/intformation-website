import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left">
          &copy; Copyright 2021
      </div>

        <div className="footer-right">
          <span className="footer-subtext">Developed by </span>
          <a href="/">
            <span className="footer-name-first">REGULAR</span>
            <span className="footer-name-second">STEVE</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
