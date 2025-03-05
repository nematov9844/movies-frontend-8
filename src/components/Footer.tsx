import { Link } from "react-router-dom"
import { InstagramLogoIcon } from "@radix-ui/react-icons"

export function Footer() {
  return (
    <footer className="bg-[#1C2127] border-t border-gray-800 py-8">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Menu */}
          <div>
            <h3 className="text-white font-medium mb-4">Меню</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/movies" className="text-emerald-500 hover:text-emerald-400">
                  Афиша
                </Link>
              </li>
              <li>
                <Link to="/sessions" className="text-emerald-500 hover:text-emerald-400">
                  Сеансы
                </Link>
              </li>
              <li>
                <Link to="/soon" className="text-emerald-500 hover:text-emerald-400">
                  Скоро в кино
                </Link>
              </li>
              <li>
                <Link to="/cinema" className="text-emerald-500 hover:text-emerald-400">
                  Кинотеатр
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-emerald-500 hover:text-emerald-400">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-white font-medium mb-4">Способы оплаты</h3>
            <div className="flex gap-2">
              <img src="/payme.svg" alt="Payme" className="h-8" />
              <img src="/click.svg" alt="Click" className="h-8" />
            </div>
          </div>

          {/* Social Networks */}
          <div>
            <h3 className="text-white font-medium mb-4">Социальные сети</h3>
            <a 
              href="https://instagram.com/magiccinema" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400"
            >
              <InstagramLogoIcon className="h-5 w-5" />
              <span>Instagram</span>
            </a>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4">Ташкент</h3>
            <p className="text-gray-400 mb-2">
              ул. Бабура, 174
            </p>
            <div className="mb-4">
              <div className="text-gray-400 text-sm">Для информации</div>
              <a href="tel:+998712052050" className="text-white hover:text-emerald-400">
                +998(71) 2052050
              </a>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Время работы</div>
              <div className="text-white">С 10:00 до 23:00</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            © 2025. Все права защищены
          </div>
          <div className="text-gray-400 text-sm">
            Разработано в{" "}
            <a 
              href="https://neotech.uz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-400"
            >
              Neotech
            </a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Версия для слабовидящих
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 text-gray-500 text-xs">
          Все сеансы начинаются с рекламно-информационного блока.
          <br />
          Точную продолжительность сеансов можно уточнить в кинотеатре.
        </div>
      </div>
    </footer>
  )
} 