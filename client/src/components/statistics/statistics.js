import React, { useState, useEffect } from "react";
import { CharacterImages } from "globals/images.js";
import { webserver } from "globals/socket.js";
import "./statistics.css";
import counter from "assets/icons/counter.png";
import lifesteal from "assets/icons/lifesteal.png";
import StatsChart from "./stats-chart/stats-chart.js";

const Statistics = () => {
  const [totalGuilds, setTotalGuilds] = useState(0);
  const [mostUsed, setMostUsed] = useState([]);

  const getTotalGuilds = async () => {
    const response = await fetch(`${webserver}/api/statistics/total-intels`);
    const data = await response.json();
    setTotalGuilds(data.totalGuilds);
  };

  const getMostUsed = async () => {
    const response = await fetch(
      `${webserver}/api/statistics/most-frequently-used`
    );
    const data = await response.json();
    setMostUsed(data);
  };

  const getMostUsedImage = (characterIndex, teamIndex) => {
    if (mostUsed.length > 0) {
      return mostUsed[teamIndex][0].split(":")[characterIndex];
    }
    return "Enott";
  };

  useEffect(() => {
    getTotalGuilds();
    getMostUsed();
  }, []);

  return (
    <div className="statistics-container">
      <h1>Total Number of Guilds Analyzed: {totalGuilds}</h1>

      <p>Most Used Defence :</p>
      <div className="row">
        <div className="column">
          <img
            alt=""
            width="62"
            height="62"
            src={CharacterImages[getMostUsedImage(0, 0)]}
          />
          <p>{getMostUsedImage(0, 0)}</p>
        </div>

        <div className="column">
          <img
            alt=""
            width="62"
            height="62"
            src={CharacterImages[getMostUsedImage(1, 0)]}
          />
          <p>{getMostUsedImage(1, 0)}</p>
        </div>
        <div className="column">
          <img
            alt=""
            width="62"
            height="62"
            src={CharacterImages[getMostUsedImage(2, 0)]}
          />
          <p>{getMostUsedImage(2, 0)}</p>
        </div>
      </div>

      {/* pass in whatever the most commonly used units for that given time period are */}
      <div className="first-most-used slider-left slide-in">
        <div>
          <h2>Most Commonly Used Stats On: {getMostUsedImage(0, 0)}</h2>
          <p className="statistics-slide-up-artifact statistics-slide-stats">
            Artifact: {"Artifact"}{" "}
          </p>
          <p className="statistics-slide-up-hp statistics-slide-stats">
            Hp: {"435345"}{" "}
          </p>
          <p className="statistics-slide-up-speed statistics-slide-stats">
            Speed: {"1447"}{" "}
          </p>
          <p className="statistics-slide-up-gear statistics-slide-stats">
            LifeSteal ? Counter ? | null
          </p>
        </div>
        <div>
          <StatsChart index={0} characterStats={mostUsed[0]} />
        </div>
      </div>

      <div className="second-most-used slider-right slide-in">
        <div>
          <StatsChart index={1} characterStats={mostUsed[0]} />
        </div>
        <div>
          <h2>Most Commonly Used Stats On: {getMostUsedImage(1, 0)}</h2>
          <p className="statistics-slide-up-artifact statistics-slide-stats">
            Artifact: {"Artifact"}{" "}
          </p>
          <p className="statistics-slide-up-hp statistics-slide-stats">
            Hp: {"435345"}{" "}
          </p>
          <p className="statistics-slide-up-speed statistics-slide-stats">
            Speed: {"1447"}{" "}
          </p>
          <p className="statistics-slide-up-gear statistics-slide-stats">
            LifeSteal ? Counter ? | null
          </p>
        </div>
      </div>

      <div className="third-most-used slider-left slide-in">
        <div>
          <h2>Most Commonly Used Stats On: {getMostUsedImage(2, 0)}</h2>
          <p className="statistics-slide-up-artifact statistics-slide-stats">
            Artifact: {"Artifact"}{" "}
          </p>
          <p className="statistics-slide-up-hp statistics-slide-stats">
            Hp: {"435345"}{" "}
          </p>
          <p className="statistics-slide-up-speed statistics-slide-stats">
            Speed: {"1447"}{" "}
          </p>
          <p className="statistics-slide-up-gear statistics-slide-stats">
            LifeSteal ? Counter ? | null
          </p>
        </div>
        <div>
          <StatsChart index={2} characterStats={mostUsed[0]} />
        </div>
      </div>

      <h3>More Defences</h3>
      <div className="container">
        <ul>
          {mostUsed.slice(1).map((team, index) => (
            <li key={index}>
              <div className="row">
                <div className="column">
                  <img
                    alt=""
                    width="62"
                    height="62"
                    src={CharacterImages[getMostUsedImage(0, index + 1)]}
                  />
                  <p>{getMostUsedImage(0, index + 1)}</p>
                </div>

                <div className="column">
                  <img
                    alt=""
                    width="62"
                    height="62"
                    src={CharacterImages[getMostUsedImage(1, index + 1)]}
                  />
                  <p>{getMostUsedImage(1, index + 1)}</p>
                </div>
                <div className="column">
                  <img
                    alt=""
                    width="62"
                    height="62"
                    src={CharacterImages[getMostUsedImage(2, index + 1)]}
                  />
                  <p>{getMostUsedImage(2, index + 1)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;
