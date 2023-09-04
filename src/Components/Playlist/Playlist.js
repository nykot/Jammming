import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ name, tracks, onRemove, onNameChange, onSave }) {
  return (
    <div className="Playlist">
      <input value={name} onChange={onNameChange} />

      <Tracklist tracks={tracks} onRemove={onRemove} />
      <button onClick={onSave}>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
