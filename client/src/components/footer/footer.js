import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="footer-section"></div>
        </div>
        <div className="footer-content-right"></div>
      </div>

      <p>Developed by:</p>
      <a className="footer-logo" href="/">
        <div className="logo-first">REGULAR</div>
        <div className="logo-last">STEVE</div>
      </a>
    </footer>
  );
};
export default Footer;
