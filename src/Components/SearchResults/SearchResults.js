import React from "react";
import "./SearchResults.css";
import TrackList from "../Tracklist/Tracklist";

function SearchResults({ tracks, onAdd }) {
  return (
    <div className="SearchResults">
      <TrackList tracks={tracks} onAdd={onAdd}/>
    </div>
  )
}

export default SearchResults;
