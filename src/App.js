import "./App.css";
import Track from "./Components/Track/Track";
import Playlist from "./Components/Playlist/Playlist";
import TrackList from "./Components/Tracklist/Tracklist";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState } from "react";

const SEARCH_RESULTS = [
  { id: "1", name: "Song 1", artist: "Artist 1", album: "Album 1" },
  { id: "2", name: "Song 2", artist: "Artist 2", album: "Album 2" },
  { id: "3", name: "Song 3", artist: "Artist 3", album: "Album 3" },
  { id: "4", name: "Song 4", artist: "Artist 4", album: "Album 4" },
];

const renderTrack = SEARCH_RESULTS.map(({ id, name, artist, album }) => ({
  [name]: artist,
  album,
  id,
}));
console.log(renderTrack);

const newPlaylist = {
  playlistName: "My Playlist",
  playlistTracks: [
    { id: "1", name: "Song 1", artist: "Artist 1", album: "Album 1" },
    { id: "2", name: "Song 2", artist: "Artist 2", album: "Album 2" },
  ],
};

console.log({ Playlist });

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(SEARCH_RESULTS);
  const [playlistName, setPlaylistName] = useState("default name");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  function addNewTrack(track) {
    if (playlistTracks.find((t) => t.id === track.id)) {
      return null;
    }

    setPlaylistTracks([...playlistTracks, track]);
  }

  function RemoveTrack(track) {
    const updatePlaylist = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(updatePlaylist);
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-content">
        <SearchResults tracks={searchResults} onAdd={addNewTrack} />
        <Playlist
          tracks={playlistTracks}
          name={playlistName}
          onRemove={RemoveTrack}
        />
      </div>
    </div>
  );
}

export default App;
