import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { Vendor } from "../types/vendor";

export const STORAGE_KEY = "jwt_access_vendor_token";

export interface AppJwtPayload {
  data: Vendor;
}

export function getAccessVendorToken(): string | null {
  return sessionStorage.getItem(STORAGE_KEY);
}

export async function setVendorSession(accessToken: string | null) {
  if (accessToken) {
    sessionStorage.setItem(STORAGE_KEY, accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    sessionStorage.removeItem(STORAGE_KEY);
    delete axios.defaults.headers.common.Authorization;
  }
}

export function removeVendorToken() {
  sessionStorage.removeItem(STORAGE_KEY);
  delete axios.defaults.headers.common.Authorization;
}

// ✅ Decode full payload { data: Vendor }
export function decodeVendorToken(token: string | null): AppJwtPayload | null {
  try {
    if (!token) return null;
    return jwtDecode<AppJwtPayload>(token);
  } catch {
    return null;
  }
}

// ✅ Extract vendor info from payload
export function getVendorInfo(): Vendor | null {
  const token = getAccessVendorToken();
  const decoded = decodeVendorToken(token);
  return decoded?.data ?? null;
}

export function getRemarkString(action: string, username: string) {
  const now = new Date();

  // IST time
  const istTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  // Time
  const time = istTime.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Date
  const date = istTime.toLocaleDateString("en-GB"); // dd/mm/yyyy

  return `Time : ${time} IST | Date : ${date} | User Name : ${username} | User Performed Action : ${action}`;
}
