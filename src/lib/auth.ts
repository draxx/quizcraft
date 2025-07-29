import {
  COGNITO_URL,
  COGNITO_CLIENT_ID,
  COGNITO_REDIRECT_URL,
  COGNITO_LOGOUT_CALLBACK_URL
} from "@/config/env";

export function getLoginUrl() {
  return `${COGNITO_URL}/login?client_id=${COGNITO_CLIENT_ID}&response_type=token&scope=email+openid+profile&redirect_uri=${COGNITO_REDIRECT_URL}`;
}

export function login() {
  console.log("Logging in");
  const url = getLoginUrl();
  window.location.href = url;
}

export function logout() {
  console.log("Déconnexion");
  localStorage.removeItem("id_token");
  localStorage.setItem("hasLoggedOut", "1");
  window.location.href = "/login";
  //window.location.href = `${COGNITO_URL}/logout?client_id=${COGNITO_CLIENT_ID}&logout_uri=${COGNITO_LOGOUT_CALLBACK_URL}`;
}

export function getTokenFromUrl(): string | null {
  const hash = window.location.hash.substring(1);
  console.log("hash: " + hash);
  const params = new URLSearchParams(hash);
  return params.get("id_token");
}

export function extractAndStoreToken(): string | null {
  const token = getTokenFromUrl();
  if (token) {
    localStorage.setItem("id_token", token);
  }
  return token;
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("id_token");
}

// lib/auth.ts

export function loginWithPopup(): void {

  window.open(
    getLoginUrl(),
    "CognitoLogin",
    "width=500,height=600"
  );
  
}

export function getToken(): string | null {
  return localStorage.getItem("id_token");
}