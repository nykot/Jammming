import React from "react";
import "./SearchBar.css";

function SearchBar({ searchSpotify, searchQuery, onSearchQueryChange }) {
  // const { searchSpotify } = props;

  return (
    <div className="SearchBar">
      <input
        onChange={onSearchQueryChange}
        placeholder="Enter A Song, Album, or Artist"
        value={searchQuery}
      />
      <button onClick={searchSpotify}>Search</button>
    </div>
  );
}

export default SearchBar;
