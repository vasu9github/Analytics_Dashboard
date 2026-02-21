const BASE_URL = "http://localhost:3000/api";

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
};

export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.message);

  return result;
};