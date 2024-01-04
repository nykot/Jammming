import "./App.css";
import Track from "./Components/Track/Track";
import Playlist from "./Components/Playlist/Playlist";
import TrackList from "./Components/Tracklist/Tracklist";
import SearchResults from "./Components/SearchResults/SearchResults";
import { searchForTracks } from "./Utils/api";
import { verifyAuthorisation, retriveFromStorage } from "./Utils/auth";
import { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar/SearchBar";

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

const newPlaylist = {
  playlistName: "My Playlist",
  playlistTracks: [
    { id: "1", name: "Song 1", artist: "Artist 1", album: "Album 1", uri: "" },
    { id: "2", name: "Song 2", artist: "Artist 2", album: "Album 2" },
  ],
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(SEARCH_RESULTS);
  const [playlistName, setPlaylistName] = useState("default name");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    verifyAuthorisation().then((userData) => {
      setUser(userData);
    });
  }, []);

  function onSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  async function searchSpotify() {
    const result = await searchForTracks(searchQuery);
    console.log(result);
    setSearchResults(result);
  }

  function addNewTrack(track) {
    if (playlistTracks.find((t) => t.id === track.id)) {
      return null;
    }

    setPlaylistTracks([...playlistTracks, track]);
  }

  function removeTrack(track) {
    const updatePlaylist = playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(updatePlaylist);
  }

  function updatePlaylistName(event) {
    setPlaylistName(event.target.value);
  }

  function savePlaylist() {
    console.log("save playlist", { playlistName, playlistTracks });
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="App-search">
        <SearchBar
          searchSpotify={searchSpotify}
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
        />
      </div>
      <div className="App-content">
        <SearchResults tracks={searchResults} onAdd={addNewTrack} />
        <Playlist
          tracks={playlistTracks}
          name={playlistName}
          onRemove={removeTrack}
          onNameChange={updatePlaylistName}
          onSave={savePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
