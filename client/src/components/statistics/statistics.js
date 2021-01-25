import React, { useState, useEffect }  from "react";
import { CharacterImages } from 'globals/images.js';
import { webserver } from 'globals/socket.js';
import "./statistics.css";


const Statistics = () => {
  const[totalGuilds, setTotalGuilds] = useState(0);
  const[mostUsed, setMostUsed] = useState([]);

  const getTotalGuilds = async () => {
    const response = await fetch(`${webserver}/api/statistics/totalIntels`);
    const data = await response.json();
    setTotalGuilds(data.totalGuilds);
  }

  const getMostUsed = async () => {
    const response = await fetch(`${webserver}/api/statistics/mostFrequentlyUsed`);
    const data = await response.json();
    setMostUsed(data);
  }

  const getMostUsedImage = (index) => {
    if (mostUsed.length > 0){
      return mostUsed[0][0].split(":")[index];
    }
      return "Enott";
  }

  useEffect(() => {
    getTotalGuilds();
    getMostUsed();
  }, []);

  return (
    <div>
      <h1>Total Number of Guilds Analyzed: {totalGuilds}</h1>

      <p>
        Most Used Defence :
      </p>
      <img alt="" width="62" height="62" src={CharacterImages[getMostUsedImage(0)]} />
      <img alt="" width="62" height="62" src={CharacterImages[getMostUsedImage(1)]} />
      <img alt="" width="62" height="62" src={CharacterImages[getMostUsedImage(2)]} />

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
