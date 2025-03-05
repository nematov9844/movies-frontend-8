import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { buyTicket } from "../services/tickets"
import { useAuth } from "../hooks/useAuth"
import { useToast } from "../providers/ToastContext"

interface Session {
  _id: string
  time: string
  seats: {
    number: string
    isOccupied: boolean
  }[]
}

export function SessionsPage() {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth() // useAuth hookidan foydalanish
  const [sessions, setSessions] = useState<Session[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    // Load sessions
    setLoading(false)
  }, [movieId])

  const handleSeatClick = (seatNumber: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatNumber)
        ? prev.filter(seat => seat !== seatNumber)
        : [...prev, seatNumber]
    )
  }

  const handleBuyTickets = async () => {
    try {
      if (!user || !movieId || selectedSeats.length === 0) {
        addToast("Iltimos, o'rindiqlarni tanlang", "error")
        return
      }

      const totalPrice = 50000 * selectedSeats.length
      const ticketData = {
        userId: user.user._id,
        movieId: movieId,
        seatNumber: selectedSeats,
        price: totalPrice
      }

      const response = await buyTicket(ticketData)
      
      if (response?.url) {
        addToast("To'lov sahifasiga yo'naltirilmoqda", "success")
        window.location.href = response.url
      } else {
        addToast("To'lov jarayonida xatolik yuz berdi", "error")
      }
    } catch (error) {
      addToast("Chipta sotib olishda xatolik yuz berdi", "error")
    }
  }

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>
  }

  return (
    <div className="max-w-[1440px] mx-auto py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Выбор места</h1>
      
      <div className="grid grid-cols-10 gap-2 mb-8">
        {Array.from({ length: 100 }).map((_, index) => {
          const seatNumber = (index + 1).toString()
          const isSelected = selectedSeats.includes(seatNumber)
          
          return (
            <Button
              key={index}
              variant={isSelected ? "default" : "outline"}
              className={`
                aspect-square p-0
                ${isSelected ? 'bg-emerald-500 hover:bg-emerald-600' : 'border-emerald-500 text-emerald-500'}
              `}
              onClick={() => handleSeatClick(seatNumber)}
            >
              {seatNumber}
            </Button>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-white">
          <p>Выбрано мест: {selectedSeats.length}</p>
          <p className="text-lg font-bold">
            Итого: {(50000 * selectedSeats.length).toLocaleString()} сум
          </p>
        </div>
        <Button
          className="bg-emerald-500 hover:bg-emerald-600"
          disabled={!user || selectedSeats.length === 0}
          onClick={handleBuyTickets}
        >
          Купить билеты
        </Button>
      </div>
    </div>
  )
} 