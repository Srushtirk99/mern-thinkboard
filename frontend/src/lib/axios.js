import axios from "axios";

// backend runs on PORT 5000
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
