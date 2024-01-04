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
  const scope = "user-read-private user-read-email";

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
