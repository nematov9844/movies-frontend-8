import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

interface BuyTicketParams {
  userId: string
  movieId: string
  seatNumber: string[]
  price: number
}

export const buyTicket = async (params: BuyTicketParams) => {
  const token = localStorage.getItem('token')
  
  // Parametrlarni tekshiramiz
  if (!params.userId || !params.movieId || !params.seatNumber || !params.price) {
    throw new Error('Missing required parameters')
  }

  // seatNumber ni string ga o'tkazamiz
  const requestData = {
    ...params,
    seatNumber: params.seatNumber.join(',') // massivni vergul bilan ajratilgan string ga o'tkazamiz
  }

  const response = await axios.post(
    `${API_URL}/tickets/buy`,
    requestData,
    { headers: { Authorization: `Bearer ${token}` } }
  )

  console.log('Ticket request sent:', requestData)
  console.log('Server response:', response.data)

  return response.data
}

export const getMyTickets = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(
    `${API_URL}/tickets/my`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return response.data
} 