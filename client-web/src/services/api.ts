import axios from "axios";

// API do Serviço de Identidade (Porta 8081)
export const apiIdentity = axios.create({
  baseURL: "http://localhost:8081",
});

// API do Serviço Geoespacial (Porta 8082)
export const apiGeo = axios.create({
  baseURL: "http://localhost:8082",
});

// API do Serviço de Gamificação (Porta 8083)
export const apiGamification = axios.create({
  baseURL: "http://localhost:8083",
});

const api = axios.create();
export default api;
