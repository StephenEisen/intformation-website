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
              src="https://www.youtube.com/embed/TA8MJaK-ZnY"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <h3>Title</h3>
          </div>
        </li>
        <li>
          <iframe
            title="archdemon"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/1sDEwr6qmS0"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </li>
      </ul>
    </div>
  );
};

export default Card;
