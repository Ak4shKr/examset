import axios from "axios";

const service = axios.create({
  baseURL: "https://examset-1.onrender.com/api",
  // withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

export default service;
