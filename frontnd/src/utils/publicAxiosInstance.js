import axios from "axios";


export const publicAxios = axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "https://hrms-server-app.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});