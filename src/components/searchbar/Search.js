import React from 'react';
import SelectSearch from 'react-select-search';

const options = [
    {name: 'Alencia', value: 'Alencia'},
    {name: 'pp', value: 'en'},
    {
    },
];

const Search = () => {
    return(
        <SelectSearch search options={options} placeholder="Choose Character" />
        )
}

export default Search;