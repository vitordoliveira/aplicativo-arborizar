import axios from "axios";

// API de Identidade (Porta 8081)
export const apiIdentity = axios.create({
  baseURL: "http://localhost:8081",
});

// API Geoespacial (Porta 8082)
export const apiGeo = axios.create({
  baseURL: "http://localhost:8082",
});

// API de Gamificação (Porta 8083)
export const apiGamification = axios.create({
  baseURL: "http://localhost:8083",
});
