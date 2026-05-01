import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          localStorage.removeItem("auth_token");
          window.location.href = "/login";
          break;
        case 403:
          console.error("❌ Acesso negado");
          break;
        case 404:
          console.error("❌ Recurso não encontrado");
          break;
        case 500:
          console.error("❌ Erro interno do servidor");
          break;
        default:
          console.error(`❌ Erro ${status}:`, data?.message || error.message);
      }
    } else if (error.request) {
      console.error("❌ Erro de rede:", error.message);
    } else {
      console.error("❌ Erro:", error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
