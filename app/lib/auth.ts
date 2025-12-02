export type StoredUser = {
  Name?: string;
  Surname?: string;
  Email?: string;
};

type JwtPayload = {
  given_name?: string;
  family_name?: string;
  email?: string;
};

const AUTH_EVENT = "auth-changed";

type RawUser = {
  Name?: string;
  name?: string;
  given_name?: string;
  firstName?: string;
  Surname?: string;
  surname?: string;
  family_name?: string;
  lastName?: string;
  Email?: string;
  email?: string;
};

const normalizeUser = (raw: RawUser | null | undefined): StoredUser | null => {
  if (!raw || typeof raw !== "object") return null;
  return {
    Name: raw.Name ?? raw.name ?? raw.given_name ?? raw.firstName,
    Surname: raw.Surname ?? raw.surname ?? raw.family_name ?? raw.lastName,
    Email: raw.Email ?? raw.email,
  };
};

export const getStoredUser = (): StoredUser | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return normalizeUser(JSON.parse(raw));
  } catch {
    return null;
  }
};

export const getStoredToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
};

export const getUserFromToken = (): StoredUser | null => {
  if (typeof window === "undefined") return null;
  const token = getStoredToken();
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = JSON.parse(atob(parts[1])) as JwtPayload;
    return normalizeUser(payload);
  } catch {
    return null;
  }
};

export const setAuth = (token: string, user?: StoredUser) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("authToken", token);
  if (user) {
    localStorage.setItem("user", JSON.stringify(normalizeUser(user)));
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const clearAuth = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event(AUTH_EVENT));
};

export const authEventName = AUTH_EVENT;
