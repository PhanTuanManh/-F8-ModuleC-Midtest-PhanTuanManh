import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "Application/json",
  },
});

export default instance;
