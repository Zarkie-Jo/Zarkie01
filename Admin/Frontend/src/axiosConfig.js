import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api", // Adjust this URL to match your backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
