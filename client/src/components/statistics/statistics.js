import React from "react";
import "./statistics.css";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context("assets/characters", false, /\.(png|jpe?g|svg)$/)
);

function getImage(charName){
  const imageIndex = images.findIndex(function (element) {
    const text = element.split('/')[3].split('.')[0];
    return text === charName;
  });
  return  images[imageIndex];
}

const Statistics = () => {
  return (
    <div>
      <h1>stats page</h1>

      <p>
        Most Used Defence
      </p>
      <img alt=""  width="62" height="62" src={getImage("Enott")} />
      <img alt=""  width="62" height="62" src={getImage("Enott")} />
      <img alt=""  width="62" height="62" src={getImage("Enott")} />

      {/* pass in whatever the most commonly used units for that given time period are */}
      <h2>Most Commonly Used Stats On: {"Enott"}</h2>
      <p>
        Artifact: {"Big pp artifact"} <br></br>
        Hp: {"6969"} <br></br>
        Speed: {"1447"} <br></br>
        LifeSteal ? Counter ? | null
      </p>
      <h2>Most Commonly Used Stats On: {"Enott"}</h2>
      <p>
        Artifact: {"Big pp artifact"} <br></br>
        Hp: {"6969"} <br></br>
        Speed: {"1447"} <br></br>
        LifeSteal ? Counter ? | null
      </p>
      <h2>Most Commonly Used Stats On: {"Enott"}</h2>
      <p>
        Artifact: {"Big pp artifact"} <br></br>
        Hp: {"6969"} <br></br>
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
