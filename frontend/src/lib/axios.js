import axios from "axios";

const api = axios.create({
  baseURL: "https://college-placements-fi1p.onrender.com", 
  withCredentials: true, 
});

export default api;
