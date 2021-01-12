import React from "react";
import SelectSearch from "react-select-search";
import "./character-select.css";

const updateInfo = (event, props) => {
  props.onChange(props.options.findIndex((option) => option.value === event));
};

const CharacterSelect = (props) => {
  return (
    <SelectSearch
      search
      options={props.options}
      placeholder="Choose Character"
      onChange={(event) => updateInfo(event, props)}
    />
  );
};

export default CharacterSelect;
