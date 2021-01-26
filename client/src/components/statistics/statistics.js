import React, { useState, useEffect } from "react";
import { CharacterImages } from "globals/images.js";
import { webserver } from "globals/socket.js";
import "./statistics.css";

const Statistics = () => {
  const [totalGuilds, setTotalGuilds] = useState(0);
  const [mostUsed, setMostUsed] = useState([]);

  const getTotalGuilds = async () => {
    const response = await fetch(`${webserver}/api/statistics/total-intels`);
    const data = await response.json();
    setTotalGuilds(data.totalGuilds);
  };

  const getMostUsed = async () => {
    const response = await fetch(`${webserver}/api/statistics/most-frequently-used`);
    const data = await response.json();
    setMostUsed(data);
  };

  const getMostUsedImage = (index) => {
    if (mostUsed.length > 0) {
      return mostUsed[0][0].split(":")[index];
    }
    return "Enott";
  };

  useEffect(() => {
    getTotalGuilds();
    getMostUsed();
  }, []);

  return (
    <div>
      <h1>Total Number of Guilds Analyzed: {totalGuilds}</h1>

      <p>Most Used Defence :</p>
      <div className="row">
        <div className="column">
          <img
            alt=""
            width="62"
            height="62"
            src={CharacterImages[getMostUsedImage(0)]}
          />
          <p>{getMostUsedImage(0)}</p>
        </div>

        <div className="column">
          <img
            alt=""
            width="62"
            height="62"
            src={CharacterImages[getMostUsedImage(1)]}
          />
          <p>{getMostUsedImage(1)}</p>
        </div>
        <div className="column">
          <img
            alt=""
            width="62"
            height="62"
            src={CharacterImages[getMostUsedImage(2)]}
          />
          <p>{getMostUsedImage(2)}</p>
        </div>
      </div>

      {/* pass in whatever the most commonly used units for that given time period are */}
      <div className="first-most-used slider-left slide-in">
        <h2>Most Commonly Used Stats On: {getMostUsedImage(0)}</h2>
        <p>
          Artifact: {"Artifact"} <br></br>
          Hp: {"435345"} <br></br>
          Speed: {"1447"} <br></br>
          LifeSteal ? Counter ? | null
        </p>
      </div>

      <div className="second-most-used slider-right slide-in">
        <h2>Most Commonly Used Stats On: {getMostUsedImage(1)}</h2>
        <p>
          Artifact: {"Artifact"} <br></br>
          Hp: {"435345"} <br></br>
          Speed: {"1447"} <br></br>
          LifeSteal ? Counter ? | null
        </p>
      </div>

      <div className="third-most-used slider-left slide-in">
        <h2>Most Commonly Used Stats On: {getMostUsedImage(2)}</h2>
        <p>
          Artifact: {"Artifact"} <br></br>
          Hp: {"435345"} <br></br>
          Speed: {"1447"} <br></br>
          LifeSteal ? Counter ? | null
        </p>
      </div>

      <h3>More Defences</h3>
      <p>MORE ENOTTT etc etc etc</p>

      {
        mostUsed.map((team) => <p>{team[0].replaceAll(":", " ")}</p>)
      }

    </div>
  );
};

export default Statistics;
