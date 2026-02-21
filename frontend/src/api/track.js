import { apiRequest } from "./index";

export const trackEvent = async (feature) => {
  if (!feature || typeof feature !== "string") return;

  return await apiRequest("/track", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      feature_name: feature
    })
  });
};
