import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

export const login = async (payload) => {
  return await API.post("/user/log-in", payload);
};
