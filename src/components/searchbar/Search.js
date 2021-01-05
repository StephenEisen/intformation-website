import React from 'react';
import SelectSearch from 'react-select-search';
import "./Search.css";

const updateInfo = (event, props) =>{
    props.onChange(props.options.findIndex(
        (option) => option.value === event));
}


const Search = (props) => {
    return(
        <SelectSearch
            search
            options={props.options} 
            placeholder="Choose Character" 
            onChange={(event) =>updateInfo(event, props)}/>
        )
}

export default Search;