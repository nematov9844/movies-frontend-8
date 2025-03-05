import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useToast } from "../providers/ToastContext"
import axios from 'axios'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Clock, MapPin, Users, Timer, CreditCard } from 'lucide-react'
import { Button } from "../components/ui/button"
import { useAuth } from "../hooks/useAuth"

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

export const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [uniqueDates, setUniqueDates] = useState<string[]>([])
  const { addToast } = useToast()
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/sessions`)
        const allSessions = response.data
        
        // Barcha sanalarni yig'ib olish
        const dates = Array.from(new Set(
          allSessions.map((session: Session) => 
            format(parseISO(session.date), 'yyyy-MM-dd')
          )
        )) as string[];
        
        setUniqueDates(dates)
        setSelectedDate(dates[0])
        setSessions(allSessions)
      } catch (error) {
        console.error("Seanslarni yuklashda xatolik:", error)
        addToast("Seanslarni yuklashda xatolik yuz berdi", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString)
      return format(date, "d MMMM", { locale: ru })
    } catch (error) {
      console.error("Sanani formatlashda xatolik:", error)
      return dateString
    }
  }

  const filteredSessions = sessions.filter(session =>
    format(parseISO(session.date), 'yyyy-MM-dd') === selectedDate
  )

  // Filmlar bo'yicha guruhlaymiz
  const groupedSessions = filteredSessions.reduce((acc, session) => {
    const movieId = session.movie._id
    if (!acc[movieId]) {
      acc[movieId] = {
        movie: session.movie,
        sessions: []
      }
    }
    acc[movieId].sessions.push(session)
    return acc
  }, {} as Record<string, { movie: Movie, sessions: Session[] }>)

  const handleBuyTicket = async (e: React.MouseEvent, session: Session) => {
    e.preventDefault() // Link ichida bo'lgani uchun
    
    if (!user) {
      addToast("Пожалуйста, войдите в систему", "error")
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

  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-white mb-6">Расписание сеансов</h1>

        {/* Календарь */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {uniqueDates.map(date => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                selectedDate === date
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-[#1C2127] text-gray-300 hover:bg-[#252A31]"
              }`}
            >
              {formatDate(date)}
            </button>
          ))}
        </div>

        {/* Фильмы и сеансы */}
        <div className="grid grid-cols-1 gap-8">
          {Object.values(groupedSessions).map(({ movie, sessions }) => (
            <div key={movie._id} className="bg-[#1C2127] rounded-xl shadow-xl overflow-hidden border border-gray-800">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Постер */}
                  <div className="w-full md:w-48 h-72 flex-shrink-0">
                    <img 
                      src={movie.image} 
                      alt={movie.title}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <div className="flex items-center gap-1">
                          <Timer className="w-4 h-4" />
                          <span>{movie.duration} мин</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {movie.genre.map((g, i) => (
                            <span key={i} className="px-2 py-1 rounded-md bg-[#2A2F37] text-xs">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Сеансы */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {sessions
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((session) => (
                          <Link 
                            to={`/sessions/${session._id}`}
                            key={session._id}
                            className="group bg-[#2A2F37] p-4 rounded-lg border border-gray-700 hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/10"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <Clock className="w-4 h-4 text-emerald-500" />
                              <span className="text-lg font-semibold text-white group-hover:text-emerald-500 transition-colors">
                                {session.time}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2 text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span>Зал {session.hall}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2 text-gray-400">
                              <Users className="w-4 h-4" />
                              <span>{session.availableSeats} из {session.totalSeats}</span>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-700">
                              <div className="flex items-center gap-2 text-emerald-500">
                                <CreditCard className="w-4 h-4" />
                                <span>{(session.price).toLocaleString()} сум</span>
                              </div>
                              
                              <Button
                                onClick={(e) => handleBuyTicket(e, session)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 text-sm rounded-lg"
                                disabled={session.availableSeats === 0}
                              >
                                {session.availableSeats === 0 ? "Нет мест" : "Купить билет"}
                              </Button>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 