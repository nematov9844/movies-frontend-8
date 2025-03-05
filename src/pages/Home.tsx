import { Hero } from "@/components/Hero"
import { Categories } from "@/components/Categories"
import { MovieList } from "@/components/MovieList"
import { useEffect, useState } from "react"
import { getMovies } from "../services/api"

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

export function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    getMovies().then(response => setMovies(response.data))
  }, [])

  return (
    <div className="min-h-screen bg-[#1C2127]">
      <Hero movies={movies} />
      <Categories />
      <MovieList movies={movies} />
    </div>
  )
}