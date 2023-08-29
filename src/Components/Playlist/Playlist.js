import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ tracks, onRemove }) {
  return (
    <div className="Playlist">
      <input value={tracks.name} />

      <Tracklist tracks={tracks} onRemove={onRemove} />
      <button>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
