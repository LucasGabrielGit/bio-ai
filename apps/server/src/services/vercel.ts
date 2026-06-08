import axios from "axios";

const VERCEL_API_URL = "https://api.vercel.com/v10";
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_ACCESS_TOKEN = process.env.VERCEL_ACCESS_TOKEN;

// Helper to handle API requests
const vercelApi = axios.create({
  baseURL: VERCEL_API_URL,
  headers: {
    Authorization: `Bearer ${VERCEL_ACCESS_TOKEN}`,
  },
});

export const addDomainToVercel = async (domain: string) => {
  if (!VERCEL_PROJECT_ID || !VERCEL_ACCESS_TOKEN) {
    console.log(`[Vercel Mock] Domínio ${domain} adicionado com sucesso (simulado).`);
    return { success: true, mocked: true };
  }

  try {
    const response = await vercelApi.post(
      `/projects/${VERCEL_PROJECT_ID}/domains`,
      { name: domain }
    );
    return { success: true, data: response.data, mocked: false };
  } catch (error: any) {
    console.error("Erro ao adicionar domínio na Vercel:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || "Erro ao configurar domínio personalizado.");
  }
};

export const removeDomainFromVercel = async (domain: string) => {
  if (!VERCEL_PROJECT_ID || !VERCEL_ACCESS_TOKEN) {
    console.log(`[Vercel Mock] Domínio ${domain} removido com sucesso (simulado).`);
    return { success: true, mocked: true };
  }

  try {
    const response = await vercelApi.delete(
      `/projects/${VERCEL_PROJECT_ID}/domains/${domain}`
    );
    return { success: true, data: response.data, mocked: false };
  } catch (error: any) {
    console.error("Erro ao remover domínio na Vercel:", error.response?.data || error.message);
    throw new Error("Erro ao remover domínio.");
  }
};

export const checkDomainStatusVercel = async (domain: string) => {
  if (!VERCEL_PROJECT_ID || !VERCEL_ACCESS_TOKEN) {
    console.log(`[Vercel Mock] Verificando status do domínio ${domain} (simulado).`);
    return { success: true, verified: true, mocked: true };
  }

  try {
    const response = await vercelApi.get(
      `/projects/${VERCEL_PROJECT_ID}/domains/${domain}`
    );
    return { success: true, data: response.data, verified: response.data.verified, mocked: false };
  } catch (error: any) {
    console.error("Erro ao verificar domínio na Vercel:", error.response?.data || error.message);
    throw new Error("Erro ao verificar status do domínio.");
  }
};
