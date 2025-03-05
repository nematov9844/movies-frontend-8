import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getMovies = () => api.get('/movies');
export const login = (data: { email: string; password: string }) => 
  api.post('/api/auth/login', data);
export const register = (data: { name: string; email: string; password: string }) => 
  api.post('/api/auth/register', data);