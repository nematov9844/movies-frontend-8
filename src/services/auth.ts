import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export interface AuthResponse {
  token: string
  user: {
    _id: string
    name: string
    email: string
    isVerified: boolean
  }
}

export const register = async (name: string, email: string, password: string) => {
  const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
    name,
    email,
    password
  })
  return response.data
}

export const login = async (email: string, password: string) => {
  const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
    email,
    password
  })
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response.data
}

export const verifyEmail = async (token: string) => {
  const response = await axios.get(`${API_URL}/auth/verify-email/${token}`)
  return response.data
}

export const getMe = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
} 