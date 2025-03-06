import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import { Menu, X } from 'lucide-react';

import {data} from '../data';
const ids = data.map((item) => item._id);
console.log(ids);

export const Header = () => {
  const { user, checkAuth, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <header className="bg-[#1C2127] border-b border-gray-800">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left Section */}
          <div className="flex items-center gap-4 sm:gap-8">
            <Link to="/" className="flex items-center">
              <img src="/magic-cinema-logo.svg" alt="Magic Cinema" className="h-10 sm:h-12" />
            </Link>
            <div className="hidden sm:block text-white">
              <div className="font-medium">Ташкент</div>
              <div className="text-sm text-gray-400">Парк Magic City, ул. Бабура, 174</div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="block lg:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-white">
              <div className="text-sm text-gray-400">Для информации</div>
              <a href="tel:+998712052050" className="font-medium">+998(71) 2052050</a>
            </div>

            <a href="https://instagram.com/magiccinema" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <InstagramLogoIcon className="h-6 w-6" />
            </a>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-400 hover:text-white bg-[#2A2F37] hover:bg-gray-700">
                    {user.user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#2A2F37] border-gray-700">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="text-gray-400 hover:text-white hover:bg-gray-700">Профиль</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="text-gray-400 hover:text-white hover:bg-gray-700">Избранное</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-500 hover:text-red-400 hover:bg-gray-700">Выйти</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button className="bg-emerald-500 hover:bg-emerald-600">Войти</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden flex flex-col gap-4 py-4 border-t border-gray-700">
            <div className="text-white text-center">
              <div className="text-sm text-gray-400">Для информации</div>
              <a href="tel:+998712052050" className="font-medium">+998(71) 2052050</a>
            </div>

            <a href="https://instagram.com/magiccinema" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-center">
              <InstagramLogoIcon className="h-6 w-6 mx-auto" />
            </a>

            {user ? (
              <div className="flex flex-col items-center gap-2">
                <Link to="/profile" className="text-gray-400 hover:text-white">Профиль</Link>
                <Link to="/wishlist" className="text-gray-400 hover:text-white">Избранное</Link>
                <button onClick={logout} className="text-red-500 hover:text-red-400">Выйти</button>
              </div>
            ) : (
              <Link to="/login" className="text-center">
                <Button className="bg-emerald-500 hover:bg-emerald-600">Войти</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};