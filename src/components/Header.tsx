import { Button } from "../components/ui/button"
import { InstagramLogoIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-[#1C2127] border-b border-gray-800">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="/magic-cinema-logo.svg" 
                alt="Magic Cinema" 
                className="h-12"
              />
            </Link>

            {/* Location */}
            <div className="text-white">
              <div className="font-medium">Ташкент</div>
              <div className="text-sm text-gray-400">
                Парк Magic City, ул. Бабура, 174
              </div>
            </div>
          </div>

          {/* Contact and Actions */}
          <div className="flex items-center gap-6">
            {/* Phone */}
            <div className="text-white">
              <div className="text-sm text-gray-400">Для информации</div>
              <a href="tel:+998712052050" className="font-medium">
                +998(71) 2052050
              </a>
            </div>

            {/* Social and Button */}
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/magiccinema" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <InstagramLogoIcon className="h-6 w-6" />
              </a>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-gray-400 hover:text-white">
                      {user.user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-[#2A2F37] border-gray-700">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="text-gray-400 hover:text-white hover:bg-gray-700">
                        Профиль
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist" className="text-gray-400 hover:text-white hover:bg-gray-700">
                        Избранное
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={logout}
                      className="text-red-500 hover:text-red-400 hover:bg-gray-700"
                    >
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/login">
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    Войти
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
} 