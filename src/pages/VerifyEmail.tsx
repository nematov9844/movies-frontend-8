import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { verifyEmail } from "../services/auth"

export function VerifyEmailPage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      verifyEmail(token)
        .then(() => {
          navigate("/login")
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Xatolik yuz berdi")
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [token, navigate])

  if (!token) {
    return (
      <div className="min-h-screen bg-[#1C2127] flex items-center justify-center">
        <div className="bg-[#2A2F37] p-8 rounded-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Email tasdiqlash
          </h2>
          <p className="text-gray-400">
            Emailingizni tasdiqlash uchun xabar yuborildi. Iltimos emailingizni tekshiring.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1C2127] flex items-center justify-center">
      <div className="bg-[#2A2F37] p-8 rounded-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Email tasdiqlash
        </h2>
        {loading ? (
          <p className="text-gray-400">Yuklanmoqda...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-emerald-500">Email muvaffaqiyatli tasdiqlandi!</p>
        )}
      </div>
    </div>
  )
} 