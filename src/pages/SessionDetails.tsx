import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useToast } from "../providers/ToastContext"
import { useAuth } from "../hooks/useAuth"
import axios from 'axios'
import { Clock, MapPin, Users, Timer, CreditCard } from 'lucide-react'
import { Button } from "../components/ui/button"

interface Movie {
  _id: string
  title: string
  description: string
  genre: string[]
  duration: number
  releaseDate: string
  ticketPrice: number
  director: string
  cast: string[]
  rating: number
  image: string
  trailer: string
}

interface MovieSession {
  _id: string
  movie: string // movie ID
  hall: string
  date: string
  time: string
  price: number
  availableSeats: number
  totalSeats: number
}

interface SessionResponse {
  movie: Movie
  sessions: MovieSession[]
}

interface BuyTicketRequest {
  userId: string
  movieId: string
  seatNumber: string
}

export const SessionDetails = () => {
  const { sessionId } = useParams()
  const [sessionData, setSessionData] = useState<SessionResponse | null>(null)
  const [currentSession, setCurrentSession] = useState<MovieSession | null>(null)
  const { addToast } = useToast()
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  console.log(user);
  

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`)
        
        if (!response.data?.data) {
          addToast("Сеанс не найден", "error")
          return
        }
        
        const data = response.data.data
        setSessionData(data)

        const session = data.sessions.find((s: MovieSession) => s.movie === sessionId)
        setCurrentSession(session || null)

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

    if (!sessionData || !currentSession) {
      addToast("Ошибка: информация о сеансе недоступна", "error")
      return
    }

    try {
      const ticketData: BuyTicketRequest = {
        userId: user.user._id,
        movieId: sessionData.movie._id,
        seatNumber: "A1"
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tickets/buy`,
        ticketData,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
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
    return <LoadingSpinner />
  }

  if (!sessionData || !currentSession) {
    return <NotFound message="Сеанс не найден" />
  }

  const { movie } = sessionData

  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-[#1C2127] rounded-xl shadow-xl overflow-hidden border border-gray-800">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Постер */}
              <div className="w-full lg:w-1/3">
                {movie.image ? (
                  <img 
                    src={movie.image} 
                    alt={movie.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>

              {/* Информация */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-4">{movie.title}</h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    <span>{movie.duration} мин</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{currentSession.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>Зал {currentSession.hall}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{movie.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genre.map((genre, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-[#2A2F37] text-gray-300 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Дополнительная информация */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="text-gray-400">
                    <span className="block text-sm mb-1">Режиссер</span>
                    <span className="text-white">{movie.director}</span>
                  </div>
                  <div className="text-gray-400">
                    <span className="block text-sm mb-1">В ролях</span>
                    <span className="text-white">{movie.cast.join(", ")}</span>
                  </div>
                  <div className="text-gray-400">
                    <span className="block text-sm mb-1">Рейтинг</span>
                    <span className="text-emerald-500">{movie.rating}/10</span>
                  </div>
                  <div className="text-gray-400">
                    <span className="block text-sm mb-1">Дата выхода</span>
                    <span className="text-white">{new Date(movie.releaseDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400">
                      {currentSession.availableSeats} из {currentSession.totalSeats} мест свободно
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">
                      {currentSession.price.toLocaleString()} сум
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={handleBuyTicket}
                    className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg text-lg font-semibold"
                    disabled={currentSession.availableSeats === 0}
                  >
                    {currentSession.availableSeats === 0 ? "Нет свободных мест" : "Купить билет"}
                  </Button>

                  {movie.trailer && (
                    <a 
                      href={movie.trailer} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <Button variant="outline">
                        Смотреть трейлер
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const LoadingSpinner = () => (
  <div className="container mx-auto py-8 px-4 bg-[#141414]">
    <div className="flex items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
    </div>
  </div>
)

const NotFound = ({ message }: { message: string }) => (
  <div className="container mx-auto py-8 px-4 bg-[#141414]">
    <div className="text-center text-white">{message}</div>
  </div>
) 