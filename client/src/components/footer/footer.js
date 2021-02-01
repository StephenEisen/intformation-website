import React from "react";
import ravi from 'assets/ravi-triggerd.png';
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left">
          <img className="ravi-slide-up" src={ravi} alt="" width="50px" />
          v0.1
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
