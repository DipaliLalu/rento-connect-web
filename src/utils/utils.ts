import axios from "axios";
export const STORAGE_KEY = "jwt_access_token";
import { jwtDecode } from "jwt-decode";

export function getAccessToken() {
  return sessionStorage.getItem(STORAGE_KEY);
}

export async function setSession(accessToken: string | null) {
  try {
    if (accessToken) {
      sessionStorage.setItem(STORAGE_KEY, accessToken);

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      delete axios.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error("Error during set session:", error);
    throw error;
  }
}

export async function removeToken() {
  sessionStorage.removeItem(STORAGE_KEY);
  delete axios.defaults.headers.common.Authorization;
}

export interface AppJwtPayload {
  data: {
    user_id: number | null;
    username?: string | null;
    email?: string | null;
    roles?:string[];
    permission?:string[];
  };
}

export function decodeToken(token: string | null): AppJwtPayload | null {
  try {
    if (!token) return null;
    return jwtDecode<AppJwtPayload>(token);
  } catch (error) {
    return null;
  }
}

export function getUserInfo(): AppJwtPayload | null {
  const token = getAccessToken();
  const user = decodeToken(token);
  return user;
}

// Encode: Shift characters by +3
export function customEncode(str: string): string {
  return [...str].map(char => String.fromCharCode(char.charCodeAt(0) + 3)).join('');
}

// Decode: Shift characters by -3
export function customDecode(str: string): string {
  return [...str].map(char => String.fromCharCode(char.charCodeAt(0) - 3)).join('');
}

