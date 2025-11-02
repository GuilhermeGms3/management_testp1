import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333", // ou a porta do seu backend
});
