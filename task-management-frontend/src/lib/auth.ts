import api from "./axios";

export const refreshToken = async () => {
  const res = await api.post("/auth/refresh");
  return res.data.accessToken;
};