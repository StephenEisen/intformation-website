import React, { useEffect, useRef } from 'react';
import towerMap from 'assets/tower-map.png';
import './tower-map.css';

const TowerMap = () => {
  const imageRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    createImageMap();
  }, []);

  const createImageMap = () => {
    const imageWidth = imageRef.current.getAttribute('width');
    const imageHeight = imageRef.current.getAttribute('height');
    const areas = mapRef.current.querySelectorAll('area');

    imageRef.current.removeAttribute('usemap');
    mapRef.current.remove();

    // Create wrapper container
    const wrapper = document.createElement('div');
    wrapper.classList.add('tower-image-map');
    imageRef.current.parentNode.insertBefore(wrapper, imageRef.current);
    wrapper.appendChild(imageRef.current);

    areas.forEach((area) => {
      const coords = area.getAttribute('coords').split(',');
      let xCoords = [parseInt(coords[0]), parseInt(coords[2])];
      let yCoords = [parseInt(coords[1]), parseInt(coords[3])];
      xCoords = xCoords.sort(function (a, b) { return a - b });
      yCoords = yCoords.sort(function (a, b) { return a - b });

      const left = `left: ${((xCoords[0] / imageWidth) * 100).toFixed(2)}%`;
      const top = `top: ${((yCoords[0] / imageHeight) * 100).toFixed(2)}%`;
      const width = `width: ${(((xCoords[1] - xCoords[0]) / imageWidth) * 100).toFixed(2)}%`;
      const height = `height: ${(((yCoords[1] - yCoords[0]) / imageHeight) * 100).toFixed(2)}%`;

      wrapper.innerHTML += `<span class='area' style='${left}; ${top}; ${width}; ${height};'></span>`;
    });
  }

  return (
    <div className="tower-map">
      <img ref={imageRef} src={towerMap} alt="" width="1000" height="630" useMap="#tower-map" />

      <map ref={mapRef} name="tower-map">
        <area alt="Stronghold" title="Stronghold" coords="530,50,690,290" shape="rect" />
        <area alt="Bronze Fortress" title="Bronze Fortress" coords="270,80,380,276" shape="rect" />
        <area alt="Dalberg Fortess" title="Dalberg Fortess" coords="385,272,507,454" shape="rect" />
        <area alt="Silver Fortress" title="Silver Fortress" coords="565,401,670,588" shape="rect" />
      </map>
    </div>
  );
};

export default TowerMap;
