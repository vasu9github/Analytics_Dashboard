const BASE_URL = "http://localhost:3000/api";

export const apiRequest = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
};
