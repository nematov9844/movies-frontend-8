import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"
import { Button } from "../components/ui/button"

export const PaymentSuccess = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // 5 sekunddan keyin sessions sahifasiga qaytish
    const timer = setTimeout(() => {
      navigate('/sessions')
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center">
      <div className="bg-[#1C2127] p-8 rounded-xl shadow-xl text-center max-w-md w-full mx-4">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-20 h-20 text-emerald-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Оплата прошла успешно!
        </h1>
        
        <p className="text-gray-400 mb-8">
          Ваш билет был успешно оплачен. Вы можете найти его в своем профиле.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate('/profile')}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            Перейти в профиль
          </Button>
          
          <Button
            onClick={() => navigate('/sessions')}
            variant="outline"
            className="border-gray-700 text-gray-700 hover:bg-gray-800"
          >
            Вернуться к сеансам
          </Button>
        </div>
      </div>
    </div>
  )
} 