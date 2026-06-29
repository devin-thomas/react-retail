const rawApiBase = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5174/api";

export const API_BASE = rawApiBase.endsWith("/")
  ? rawApiBase.slice(0, -1)
  : rawApiBase;

export const IS_GITHUB_PAGES = window.location.hostname.includes("github.io");

export const STORAGE_KEYS = {
  auth: "react-retail/auth/v1",
  cart: "react-retail/cart/v1",
  recentlyViewed: "react-retail/recently-viewed/v1",
};
