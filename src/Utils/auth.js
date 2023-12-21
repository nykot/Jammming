import queryString from "querystring";

import { combineAuthorizeUrl } from "./api";

const TOKEN_KEY = "thisToken";

export function verifyAuthorisation() {
  const urlToken = retriveTokenFromUrl();

  if (!!urlToken) {
    saveToken(urlToken);
    window.location = "http://localhost:3000/";

    return;
  }

  const storageToken = retriveFromStorage();

  if (!!storageToken) {
    // profit

    return;
  }

  window.location = combineAuthorizeUrl();
}

function retriveTokenFromUrl() {
  const parsed = queryString.parse(window.location.hash.substring(1));

  return parsed.access_token;
}

function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function retriveFromStorage() {
  return localStorage.getItem(TOKEN_KEY);
}
