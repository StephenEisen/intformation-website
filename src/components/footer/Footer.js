import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-content-left">
          <div className="footer-section">
          <p>Special Thanks:</p>
            <h2 className="footer-name" style={{ color: '#00FECA' }}>AESOL</h2>
          </div>

        </div>
        <div className="footer-content-right">
        </div>

      </div>

      <p>Developed by:</p>
      <a className="footer-logo" href="/">
        <div className="logo-first">REGULAR</div>
        <div className="logo-last">STEVE</div>
      </a>

    </footer>
  );
}
export default Footer;