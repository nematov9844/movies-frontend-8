import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const addToWishlist = async (movieId: string, userId: string) => {
  const token = localStorage.getItem('token')

  const response = await axios.post(
    `${API_URL}/wishlist/add`,
    { movieId,  userId },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
}

export const removeFromWishlist = async (movieId: string, userId: string) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(
    `${API_URL}/wishlist/remove`,
    { 
      headers: { Authorization: `Bearer ${token}` },
      data: { movieId,  userId }
    }
  )
  return response.data
}

export const getWishlist = async (userId: string) => {
  const token = localStorage.getItem('token')
  const response = await axios.get(
    `${API_URL}/wishlist/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
} 