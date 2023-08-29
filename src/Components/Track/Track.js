import React from "react";
import "./Track.css";

function Track({ onAdd, onRemove, ...track }) {
  return (
    <div className="Track">
      <div className="TrackInfo">
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
        {onAdd && <button onClick={() => onAdd(track)}>+</button>}
        {onRemove && <button onClick={() => onRemove(track)}>-</button>}
      </div>
    </div>
  );
}

export default Track;
