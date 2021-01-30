import React from "react";
import monke from "assets/monke1.png";
import './about.css';

const About = () => {
  return (
    <div className="container">
      <img className="monke" alt="monke" src={monke} />

      <div>
        Hello! My name is Steve and I'm a Software Developer! With the help of two good friends we developed this website from scratch.
      </div>
    </div>
  );
};

export default About;
