import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"
import { HeartIcon } from "@radix-ui/react-icons"
import { addToWishlist } from "../services/wishlist"
import { useAuth } from "../hooks/useAuth"
import { useToast } from "../providers/ToastContext"

interface Movie {
  _id: string
  title: string
  description: string
  genre: string[]
  duration: number
  rating: number
  image: string
  director: string
  ticketPrice: number
}

interface MovieListProps {
  movies: Movie[]
}

export function MovieList({ movies }: MovieListProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToast } = useToast()

  const handleBuyTicket = (movieId: string) => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate(`/sessions/${movieId}`)
  }

  const handleAddToWishlist = async (movieId: string) => {
    try {
      if (!user) {
        addToast("Iltimos, avval tizimga kiring", "info")
        return
      }
      await addToWishlist(movieId, user.user._id)
      addToast("Film sevimlilarga qo'shildi", "success")
    } catch (error: any) {
      console.error("Filmlarni yuklashda xatolik:", error)
      addToast(error?.response?.data?.message || "Filmlarni yuklashda xatolik", "error")
    }
  }

  return (
    <div className="bg-[#1C2127] py-8">
      <div className="max-w-[1440px] mx-auto px-4">
        <h2 className="text-2xl sm:text-xl md:text-2xl font-bold text-white mb-6">Афиша</h2>
        <div className="grid grid-cols-1 nr:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-5 md:mx-0">
          {movies.map((movie) => (
            <Card key={movie._id} className="bg-[#2A2F37] pb-4 pt-0 overflow-hidden border-none text-white hover:shadow-emerald-500/20 hover:shadow-lg transition-shadow">
              <div className="aspect-[2/3] relative overflow-hidden group">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-emerald-500 text-xs sm:text-xs md:text-sm">{movie.rating}/10</Badge>
                </div>
                <button
                  onClick={() => handleAddToWishlist(movie._id)}
                  className="absolute top-2 left-2 p-1 sm:p-2 rounded-full bg-black/50 text-white hover:bg-emerald-500 transition-colors"
                >
                  <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              
              <CardHeader className="justify-between">
                <CardTitle className="text-base sm:text-sm md:text-lg font-bold">{movie.title}</CardTitle>
                <div className="flex gap-1 sm:gap-2 flex-wrap mt-1">
                  {movie.genre.map((genre) => (
                    <Badge key={genre} variant="outline" className="border-emerald-500 text-emerald-500 text-xs sm:text-sm">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-400 line-clamp-2 text-xs sm:text-sm md:text-sm mb-3">
                  {movie.description}
                </p>
                <div className="flex flex-col gap-4 sm:flex-row justify-between items-center">
                  <div className="flex flex-wrap">
                    <span className="text-xs sm:text-sm text-gray-400">Давомийлги:</span>
                    <span className="font-medium text-xs sm:text-sm">{movie.duration} дак.</span>
                  </div>
                  <Button
                    onClick={() => handleBuyTicket(movie._id)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-xs sm:text-sm"
                  >
                    Купить билет
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
