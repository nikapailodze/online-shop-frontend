export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

export const withAuthHeaders = (token: string | null) => {
  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
  };
};
