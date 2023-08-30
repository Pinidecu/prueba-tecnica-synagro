import axios from "axios";

const jsonServerApi = axios.create({
  baseURL: "http://localhost:5000", // Cambia el puerto si es necesario
});

export default jsonServerApi;
