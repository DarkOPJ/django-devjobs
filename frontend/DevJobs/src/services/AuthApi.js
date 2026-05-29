// const AUTH_API_URL = 'localhost:8000/auth';

const AUTH_API_URL =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "http://localhost:8000/auth"
    : import.meta.env.VITE_API + "/auth";

export const loginUser = async (credentials) => {
  const res = await fetch(`${AUTH_API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data;
};

export const registerUser = async (userData) => {
  const res = await fetch(`${AUTH_API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data;
};

export const logoutUser = async () => {
  // Always read from localStorage to guarantee we send the live token,
  // not a potentially-stale value captured in React state.
  const token = localStorage.getItem("token");
  if (!token) return;

  const res = await fetch(`${AUTH_API_URL}/logout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data;
};
