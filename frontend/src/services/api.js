import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend ka URL
});

export const getCapsule = (id) => API.get(`/capsules/${id}`);

export default API;
