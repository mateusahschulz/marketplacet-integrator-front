import axios from 'axios';

// Configuração padrão do Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Substitua pelo seu endpoint base
  timeout: 10000, // Tempo limite de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async (url: string, params = {}) => {
  try {
    const response = await axiosInstance.get(url, { params });
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};

// POST
export const post = async (url: string, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};

// PUT
export const put = async (url: string, data = {}) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};

// DELETE
export const delet = async (url: string, params = {}) => {
  try {
    const response = await axiosInstance.delete(url, { params });
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};

// PATCH
export const patch = async (url: string, data = {}) => {
  try {
    const response = await axiosInstance.patch(url, data);
    return response;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Função para lidar com erros
const handleAxiosError = (error: any) => {
  if (error.response) {
    // Erro de resposta do servidor
    console.error('Erro de resposta:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Cabeçalhos:', error.response.headers);
  } else if (error.request) {
    // Erro de requisição sem resposta
    console.error('Erro de requisição:', error.request);
  } else {
    // Outros erros
    console.error('Erro:', error.message);
  }
  throw error; // Opcional: lançar o erro para o chamador tratar
};
