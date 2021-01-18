import React from "react";
import SelectSearch from "react-select-search";
import "./artifact-select.css";

const updateInfo = (event, props) => {
  props.onChange(props.options.findIndex((option) => option.value === event));
};

const ArtifactSelect = (props) => {
  return (
    <div>
      <SelectSearch
        search
        options={props.options}
        placeholder="Choose Artifact"
        onChange={(event) => updateInfo(event, props)}
      />
    </div>
  );
};

export default ArtifactSelect;
