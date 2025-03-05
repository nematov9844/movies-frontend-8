import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { login } from "@/services/auth"
import { useToast } from "../hooks/useToast"

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await login(email, password)
      navigate("/")
      addToast("Muvaffaqiyatli kirildi", "success")
    } catch (err: any) {
      setError(err.response?.data?.message || "Xatolik yuz berdi")
      addToast("Kirishda xatolik yuz berdi", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <div className="min-h-screen bg-[#1C2127] flex items-center justify-center">
      <div className="bg-[#2A2F37] p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Вход в систему</h2>
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Электронная почта"
              value={email}
              onChange={handleChange}
              className="bg-[#1C2127] border-gray-700"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1C2127] border-gray-700"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600"
            disabled={loading}
          >
            {loading ? "Загрузка..." : "Войти"}
          </Button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-emerald-500 hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
} 