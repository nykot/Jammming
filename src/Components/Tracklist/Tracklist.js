import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track";

function TrackList({ tracks, onAdd, onRemove }) {
  return (
    <div className="Tracklist">
      {tracks.map(({ id, name, artist, album }) => (
        <Track
          key={id}
          id={id}
          name={name}
          artist={artist}
          album={album}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default TrackList;
