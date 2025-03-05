import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export interface PaymentSession {
  sessionId: string
  url: string
}

export const createCheckoutSession = async (
  movieId: string,
  seatNumbers: string[],
  price: number
) => {
  const token = localStorage.getItem('token')
  const response = await axios.post<PaymentSession>(
    `${API_URL}/payment/create-checkout-session`,
    { movieId, seatNumbers, price },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const getPaymentHistory = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(
    `${API_URL}/payment/history`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
} 