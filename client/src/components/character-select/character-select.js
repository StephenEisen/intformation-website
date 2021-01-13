import React from "react";
import SelectSearch from "react-select-search";
import "./character-select.css";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context("assets/characters", false, /\.(png|jpe?g|svg)$/)
);

const updateInfo = (event, props) => {
  props.onChange(props.options.findIndex((option) => option.value === event));
};

function renderFriend(props, option, snapshot, className) {
  const imgStyle = {
    borderRadius: "50%",
    verticalAlign: "middle",
    marginRight: 10,
  };
  const imageIndex = images.findIndex(function (element) {
    const text = element.split('/')[3].split('.')[0];
    return text === option.value;
  });
  const imagePath = images[imageIndex];

  return (
    <button {...props} className={className} type="button">
      <span>
        <img alt="" style={imgStyle} width="32" height="32" src={imagePath} />
        <span>{option.name}</span>
      </span>
    </button>
  );
}

const CharacterSelect = (props) => {
  return (
    <div>
      <SelectSearch
        renderOption={renderFriend}
        search
        options={props.options}
        placeholder="Choose Character"
        onChange={(event) => updateInfo(event, props)}
      />
    </div>
  );
};

export default CharacterSelect;
