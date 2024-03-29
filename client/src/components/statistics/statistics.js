import React, { useState, useEffect } from "react";
import { webserver } from "globals/socket.js";
import "./statistics.css";
import CharacterStats from "./character-stats/character-stats.js";
import LoadingIndicator from 'components/common/loading-indicator/loading-indicator.js';

const Statistics = () => {
  const [totalGuilds, setTotalGuilds] = useState(0);
  const [teamData, setTeamData] = useState([]);
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(`${webserver}/api/statistics/most-frequently-used`);
    const data = await response.json();
    setTotalGuilds(data.guildsAnalyzed);
    setTeamData(data.teamList);
    setIsLoading(false);
  };

  const onTeamClick = (teamKey) => {
    const teamIndex = teamData.findIndex(team => team.teamKey === teamKey);
    setSelectedTeamIndex(teamIndex);
  }

  return (
    <div className="statistics-container">
      <LoadingIndicator visible={isLoading} type="full"/>

      <h1>Total Number of Guilds Analyzed: {totalGuilds}</h1>

      {
        teamData.length > 0
          ? <CharacterStats hidden={false} showStats={true} teamData={teamData[selectedTeamIndex]} />
          : null
      }

      <div className="container">
        <h3>More Defenses</h3>
        {teamData.length > 0 ?
          teamData.map((value, index) => (
            <CharacterStats
              key={index}
              onTeamClick={onTeamClick}
              hidden={selectedTeamIndex === index}
              showStats={false}
              teamData={teamData[index]} />
          ))
          : null}
      </div>
    </div>
  );
};

export default Statistics;
