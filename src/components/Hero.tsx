import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Movie {
  _id: string
  title: string
  description: string
  image: string
}

interface HeroProps {
  movies: Movie[]
}

export function Hero({ movies }: HeroProps) {
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {movies.slice(0, 5).map((movie) => (
            <CarouselItem key={movie._id}>
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-emerald-500">Скоро в кино</Badge>
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{movie.title}</h2>
                  <p className="text-lg max-w-2xl mb-6">{movie.description}</p>
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600">
                    Мне не пришёл билет
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  )
}