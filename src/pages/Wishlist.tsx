import { useEffect, useState } from "react"
import { getWishlist, removeFromWishlist } from "../services/wishlist"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { useAuth } from "../hooks/useAuth"
import { buyTicket } from "../services/tickets"
import { useToast } from "../providers/ToastContext"

interface Movie {
  _id: string
  title: string
  description: string
  image: string
  genre: string[]
  rating: number
  ticketPrice: number
}

export function WishlistPage() {
  const { user } = useAuth()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    if (user) {
      loadWishlist()
    }
  }, [user])

  const loadWishlist = async () => {
    try {
      if (!user) return
      const data = await getWishlist(user.user._id)
      
      const movies = data?.wishlist?.movies || []
      setMovies(movies)
    } catch (error) {
      console.error('Error loading wishlist:', error)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (movieId: string) => {
    try {
      if (!user) return
      await removeFromWishlist(movieId, user.user._id)
      setMovies(movies.filter(movie => movie._id !== movieId))
      addToast("Film sevimlilardan o'chirildi", "success")
    } catch (error) {
      addToast("Filmni o'chirishda xatolik yuz berdi", "error")
    }
  }

  const handleBuyTicket = async (movieId: string, price: number) => {
    try {
      if (!user) {
        addToast("Iltimos, avval tizimga kiring", "info")
        return
      }
      const response = await buyTicket({
        userId: user.user._id,
        movieId,
        seatNumber: ["A1"],
        price
      })
      
      window.location.href = response.url
    } catch (error) {
      addToast("Chipta sotib olishda xatolik yuz berdi", "error")
    }
  }

  if (loading) {
    return <div className="text-center py-8">Загрузка...</div>
  }

  return (
    <div className="max-w-[1440px] mx-auto py-8">
      <h1 className="text-2xl font-bold text-white mb-6">Избранные фильмы</h1>
      {!movies || movies.length === 0 ? (
        <div className="text-center text-gray-400">
          В избранном пока нет фильмов
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Card key={movie._id} className="bg-[#2A2F37] border-none text-white">
              <div className="aspect-[2/3] relative overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-emerald-500">{movie.rating}/10</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{movie.title}</CardTitle>
                <div className="flex gap-2 flex-wrap mt-2">
                  {movie.genre.map((genre) => (
                    <Badge key={genre} variant="outline" className="border-emerald-500 text-emerald-500">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 line-clamp-2 mb-4">{movie.description}</p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="default"
                    className="w-full bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => handleBuyTicket(movie._id, movie.ticketPrice)}
                  >
                    Купить билет - ${movie.ticketPrice}
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleRemove(movie._id)}
                  >
                    Удалить из избранного
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 