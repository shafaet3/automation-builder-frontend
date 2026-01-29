//lib/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://automation-builder-app.onrender.com"
});
