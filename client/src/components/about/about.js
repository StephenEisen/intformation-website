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

      <p>
        Want to help us out?
      </p>
      <div>
        Running this website for all you tryhard weebs out there is a little costly. If you want to help out we would gladly accept any donation you would be willing it give us.
        Any amount is helpful and goes to keeping the website active.
      </div>

      <p>
        Feel free to look at other projects that we've worked on!
      </p>
      <div>
        github garbage links here
      </div>
    </div>
  );
};

export default About;
