import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"

const categories = [
  { id: 1, name: "Сегодня" },
  { id: 2, name: "Завтра" },
  { id: 3, name: "Вторник, 4 марта" },
  { id: 4, name: "Среда, 5 марта" }
]

const navItems = [
  { id: 1, name: "Афиша", path: "/" },
  { id: 2, name: "Сеансы", path: "/sessions" },
  { id: 3, name: "Скоро в кино", path: "/coming-soon" },
  { id: 4, name: "Кинотеатр", path: "/cinema" },
  { id: 5, name: "Контакты", path: "/contacts" },
]

export function Categories() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#1C2127] border-b border-gray-800">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-4 border-b border-gray-800">
          <nav>
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-gray-400 hover:text-white"
              onClick={() => navigate('/login')}
            >
              Войти
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              Написать отзыв
            </Button>
          </div>
        </div>

        {/* Date Categories */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={category.id === 1 ? "default" : "ghost"}
                className={
                  category.id === 1
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "text-gray-400 hover:text-white"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-emerald-500 text-emerald-500">
              1240 × 48
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 