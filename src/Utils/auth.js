import queryString from "querystring";

import { combineAuthorizeUrl, getUserData } from "./api";

const TOKEN_KEY = "thisToken";

export async function verifyAuthorisation() {
  const urlToken = retriveTokenFromUrl();

  if (!!urlToken) {
    saveToken(urlToken);
    window.location = "http://localhost:3000/";

    return;
  }

  const storageToken = retriveFromStorage();

  if (!!storageToken) {
    const data = await getUserData();

    if (!!data.error) {
      removeToken();
      window.location.reload();
    }

    return data;
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

function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function retriveFromStorage() {
  return localStorage.getItem(TOKEN_KEY);
}
