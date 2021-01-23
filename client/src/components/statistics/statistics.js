import React, { useEffect }  from "react";
import "./statistics.css";
import { socket } from "globals/socket.js";
import { getCharacterImage } from 'globals/utils.js';

const getStatistics = (data) => {
  return;
};

const Statistics = () => {
  useEffect(() => {
    const getStatisticsHandler = (data) => { getStatistics(data) };
    socket.on("getStatistics", getStatisticsHandler);

    return () => {
      socket.off("getStatisticsSuccess", getStatisticsHandler);
    };
  }, []);

  return (
    <div>
      <h1>Stats page</h1>

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
