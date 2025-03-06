import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import useWindowSize from "../hooks/useWindowSize";
import { useRef } from "react";

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
  const divRef = useRef<HTMLDivElement>(null);

  const { width, height } = useWindowSize(divRef);

  return (
    <div className="bg-[#1C2127] border-b border-gray-800">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-4 border-b border-gray-800">
          <nav>
            <ul className="flex items-center gap-6 flex-wrap">
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
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              Написать отзыв
            </Button>
          </div>
        </div>

        {/* Date Categories */}
        <div className="flex items-center justify-between py-4 flex-wrap">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={category.id === 1 ? "default" : "ghost"}
                className={
                  category.id === 1
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "text-gray-400 hover:text-white hover:bg-emerald-500"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Button variant="outline" className="border-emerald-500 text-emerald-500">
              {width} × {height}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
