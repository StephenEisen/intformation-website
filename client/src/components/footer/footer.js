import React, { useEffect, useState } from "react";
import ravi from 'assets/ravi-triggerd.png';
import "./footer.css";

const Footer = () => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const updateMobileView = () => setIsMobileView(window.innerWidth <= 1280);
    window.addEventListener('resize', updateMobileView);
    updateMobileView();

    return () => {
      window.removeEventListener('resize', updateMobileView);
    }
  });

  const getRaviVersion = () => {
    return (<><img className="ravi-slide-up" src={ravi} alt="" width="50px" /> v1.1.34286f3</>);
  }

  const getRegularSteve = () => {
    return (
      <>
        <div className="footer-subtext">Developed by </div>
        <div>
          <span className="footer-name-first">REGULAR</span>
          <span className="footer-name-second">STEVE</span>
        </div>
      </>
    )
  }

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left" hidden={isMobileView}>{getRaviVersion()}</div>

        <div className="footer-middle">
          <p>All game content and assets are trademarks and copyrights of SUPERCREATIVE Corp and/or Smilegate Megaport.</p>
          <p>This site is fan made, not affiliated with SUPERCREATIVE Corp and/or Smilegate Megaport.</p>
        </div>

        <div className="footer-right" hidden={isMobileView}>{getRegularSteve()}</div>

        {/* MOBILE VIEW */}
        <div className="footer-bottom" hidden={!isMobileView}>
          <div className="flex-1">{getRaviVersion()}</div>
          <div className="flex-1">{getRegularSteve()}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
