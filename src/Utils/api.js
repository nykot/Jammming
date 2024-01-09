import querystring from "querystring";

import { retriveFromStorage } from "./auth";

const client_id = "de85126d7c3e446b946349f420e369ab";
const redirect_uri = "http://localhost:3000/callback";

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export async function searchForTracks(query) {
  let accessToken = retriveFromStorage();

  const response = await fetch(
    "https://api.spotify.com/v1/search?q=" + query + "&type=track",
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const data = await response.json();

  return data.tracks.items.map((item) => ({
    id: item.id,
    name: item.name,
    album: item.album.name,
    artist: item.artists[0].name,
    uri: item.uri,
  }));
}

export async function getUserData() {
  let accessToken = retriveFromStorage();

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  return await response.json();
}

export function combineAuthorizeUrl() {
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email playlist-modify-private playlist-read-private";

  return (
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "token",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    })
  );
}

export async function savePlaylistToSpotify(
  userData,
  playlistName,
  playlistTracks
) {
  const playlistID = await createPlaylist(userData, playlistName);
  await updatePlaylist(playlistID, playlistTracks);
}

async function createPlaylist(user, playlistName) {
  let accessToken = retriveFromStorage();

  const response = await fetch(
    "https://api.spotify.com/v1/users/" + user.id + "/playlists",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      method: "POST",
      body: JSON.stringify({
        name: playlistName,
        description: "Created with React app",
        public: false,
      }),
    }
  );

  const data = await response.json();

  return data.id;
}

async function updatePlaylist(playlistID, playlistTracks) {
  let accessToken = retriveFromStorage();

  const response = await fetch(
    "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      method: "PUT",
      body: JSON.stringify({
        uris: playlistTracks.map((track) => "spotify:track:" + track.id),
      }),
    }
  );
}
