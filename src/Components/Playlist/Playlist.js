import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ tracks, name }) {
  return (
    <div className="Playlist">
      <input value={name} />

      <Tracklist tracks={tracks} />
      <button>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
