import React from "react";
import "./card.css";

const Card = () => {
  return (
    <div className="card-container">
      <ul>
        <li>
          <div className="card">
            <iframe
              title="politis"
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/TA8MJaK-ZnY?origin=https://epic7.gg"
              frameBorder="0"
              allowFullScreen>
            </iframe>
          </div>
        </li>
        <li>
          <iframe
            title="archdemon"
            width="560"
            height="315"
            src="https://www.youtube-nocookie.com/embed/1sDEwr6qmS0?origin=https://epic7.gg"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </li>
      </ul>
    </div>
  );
};

export default Card;
