import React from "react";
import monke from "assets/monke1.png";
import PaypalButton from '../payments/paypal/paypal.js'
import './about.css';

const About = () => {
  return (
    <div className="container about-container">
      <img alt="monke" src={monke} />

      <div>
        <p>
          Hello! My name is Steve and I'm a Software Developer! With the help of two good friends we developed this website from scratch.
        </p>
        <p>
          Running this website for all you tryhard weebs out there is a little costly. If you want to help out we would gladly accept any donation you would be willing it give us.
          Any amount is helpful and goes to keeping the website active.
       </p>
      </div>

      <PaypalButton />
    </div>
  );
};

export default About;
