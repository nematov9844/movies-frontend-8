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
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Афиша</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Card key={movie._id} className="bg-[#2A2F37] pb-4 pt-0 overflow-hidden border-none text-white hover:shadow-emerald-500/20 hover:shadow-lg transition-shadow">
              <div className="aspect-[2/3] relative overflow-hidden group">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-emerald-500">{movie.rating}/10</Badge>
                </div>
                <button
                  onClick={() => handleAddToWishlist(movie._id)}
                  className="absolute top-2 left-2 p-2 rounded-full bg-black/50 text-white hover:bg-emerald-500 transition-colors"
                >
                  <HeartIcon className="h-5 w-5" />
                </button>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg font-bold">{movie.title}</CardTitle>
                <div className="flex gap-2 flex-wrap mt-2">
                  {movie.genre.map((genre) => (
                    <Badge key={genre} variant="outline" className="border-emerald-500 text-emerald-500">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-400 line-clamp-2 text-sm mb-4">
                  {movie.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400">Давомийлigi:</span>
                    <span className="font-medium">{movie.duration} дак.</span>
                  </div>
                  <Button
                    onClick={() => handleBuyTicket(movie._id)}
                    className="bg-emerald-500 hover:bg-emerald-600"
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