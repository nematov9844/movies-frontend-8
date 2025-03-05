import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useToast } from "../providers/ToastContext"
import { useAuth } from "../hooks/useAuth"
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Clock, MapPin, Users, Timer, CreditCard } from 'lucide-react'
import { Button } from "../components/ui/button"

interface Movie {
  _id: string
  title: string
  description: string
  genre: string[]
  duration: number
  image: string
  rating: number
}

interface Session {
  _id: string
  movie: Movie
  hall: string
  date: string
  time: string
  price: number
  availableSeats: number
  totalSeats: number
}

interface BuyTicketRequest {
  userId: string
  movieId: string
  seatNumber: string
}

export const SessionDetails = () => {
  const { sessionId } = useParams()
  const [session, setSession] = useState<Session | null>(null)
  const { addToast } = useToast()
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`)
        setSession(response.data)
      } catch (error) {
        console.error("Ошибка при загрузке сеанса:", error)
        addToast("Ошибка при загрузке сеанса", "error")
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      fetchSession()
    }
  }, [sessionId])

  const handleBuyTicket = async () => {
    if (!user) {
      addToast("Пожалуйста, войдите в систему", "error")
      return
    }

    if (!session) {
      addToast("Ошибка: информация о сеансе недоступна", "error")
      return
    }

    try {
      const ticketData: BuyTicketRequest = {
        userId: user.user._id,
        movieId: session.movie._id,
        seatNumber: "A1"
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tickets/buy`, 
        ticketData
      )
      
      if (response.data?.url) {
        window.location.href = response.data.url
      } else {
        throw new Error("Не получен URL для оплаты")
      }
    } catch (error: any) {
      console.error("Ошибка при покупке билета:", error)
      addToast(
        error.response?.data?.message || "Ошибка при создании заказа", 
        "error"
      )
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 bg-[#141414]">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="container mx-auto py-8 px-4 bg-[#141414]">
        <div className="text-center text-white">Сеанс не найден</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-[#1C2127] rounded-xl shadow-xl overflow-hidden border border-gray-800">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Постер */}
              <div className="w-full lg:w-1/3">
                <img 
                  src={session.movie.image} 
                  alt={session.movie.title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Информация */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-4">{session.movie.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    <span>{session.movie.duration} мин</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>Зал {session.hall}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{session.movie.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {session.movie.genre.map((genre, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-[#2A2F37] text-gray-300 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">
                      {session.availableSeats} из {session.totalSeats} мест свободно
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">
                      {session.price.toLocaleString()} сум
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleBuyTicket}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
                  disabled={session.availableSeats === 0}
                >
                  {session.availableSeats === 0 ? "Нет свободных мест" : "Купить билет"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 