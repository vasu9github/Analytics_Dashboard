import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000/api";

export const apiRequest = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid response from server");
  }

  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("token");
      toast.error("Session expired. Please login again.");
      window.location.href = "/login";
    }

    throw new Error(data.message || "Something went wrong");
  }

  return data;
};