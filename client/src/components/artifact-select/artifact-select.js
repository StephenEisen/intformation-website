import React from "react";
import SelectSearch from "react-select-search";
import "./artifact-select.css";

const updateInfo = (event, props) => {
  props.onChange(props.options.findIndex((option) => option.value === event));
};

function renderFriend(props, option,className) {
  return (
    <button {...props} className={className} type="button">
      <span>
        <span>{option.name}</span>
      </span>
    </button>
  );
}

const ArtifactSelect = (props) => {
  return (
    <div>
      <SelectSearch
        renderOption={renderFriend}
        search
        options={props.options}
        placeholder="Choose Artifact"
        onChange={(event) => updateInfo(event, props)}
      />
    </div>
  );
};

export default ArtifactSelect;
