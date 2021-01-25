import React, { useState, useEffect }  from "react";
import { getCharacterImage } from 'globals/utils.js';
import { webserver } from 'globals/socket.js';
import "./statistics.css";

const Statistics = () => {
  const[totalGuilds, setTotalGuilds] = useState(0);

  const getStatistics = async () => {
    const response = await fetch(`${webserver}/api/statistics/totalIntels`);
    const data = await response.json();
    setTotalGuilds(data.totalGuilds);
  }

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <div>
      <h1>Total Number of Guilds Analyzed: {totalGuilds}</h1>

      <p>
        Most Used Defence
      </p>
      <img alt="" width="62" height="62" src={getCharacterImage("Enott")} />
      <img alt="" width="62" height="62" src={getCharacterImage("Enott")} />
      <img alt="" width="62" height="62" src={getCharacterImage("Enott")} />

      {/* pass in whatever the most commonly used units for that given time period are */}
      <h2>Most Commonly Used Stats On: {"Enott"}</h2>
      <p>
        Artifact: {"Artifact"} <br></br>
        Hp: {"435345"} <br></br>
        Speed: {"1447"} <br></br>
        LifeSteal ? Counter ? | null
      </p>
      <h2>Most Commonly Used Stats On: {"Enott"}</h2>
      <p>
        Artifact: {"Artifact"} <br></br>
        Hp: {"435345"} <br></br>
        Speed: {"1447"} <br></br>
        LifeSteal ? Counter ? | null
      </p>
      <h2>Most Commonly Used Stats On: {"Enott"}</h2>
      <p>
        Artifact: {"Artifact"} <br></br>
        Hp: {"435345"} <br></br>
        Speed: {"1447"} <br></br>
        LifeSteal ? Counter ? | null
      </p>

      <h3>More Defences</h3>
      <p>
        MORE ENOTTT etc etc etc
      </p>
    </div>
  );
};

export default Statistics;
