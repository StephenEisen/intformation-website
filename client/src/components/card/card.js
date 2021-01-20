import React from "react";
import "./card.css";

const Card = () => {
  return (
    <div className="card-container">
      <ul>
        <li>
          <div className="card">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/TA8MJaK-ZnY"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <h3>Title</h3>
          </div>
        </li>
        <li>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/1sDEwr6qmS0"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </li>
      </ul>
    </div>
  );
};

export default Card;
