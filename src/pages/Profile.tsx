import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { useToast } from "../hooks/useToast";
import { Badge } from "../components/ui/badge";

interface Ticket {
  _id: string
  movie: string
  seatNumber: string
  price: number
  paymentStatus: string
  purchasedAt: string
}

interface UserProfile {
  _id: string
  name: string
  email: string
  isVerified: boolean
  isAdmin: boolean
  avatar: string
  tickets: Ticket[]
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()
  const { getMe } = useAuth()
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await getMe()
        setProfile(response.user)
      } catch (error) {
        console.error("Profil ma'lumotlarini yuklashda xatolik:", error)
        addToast("Profil ma'lumotlarini yuklashda xatolik yuz berdi", "error")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="text-white">Profil topilmadi</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-[#1C2127] rounded-xl shadow-xl overflow-hidden border border-gray-800">
          <div className="p-6">
            {/* Profil ma'lumotlari */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/4">
                <div className="aspect-square rounded-full overflow-hidden bg-gray-800">
                  {profile.avatar ? (
                    <img 
                      src={profile.avatar} 
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No image
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-4">{profile.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-gray-400 text-sm">Email</span>
                    <p className="text-white">{profile.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Status</span>
                    <div className="flex items-center gap-2">
                      {profile.isVerified ? (
                        <Badge className="bg-emerald-500">Tasdiqlangan</Badge>
                      ) : (
                        <Badge variant="destructive">Tasdiqlanmagan</Badge>
                      )}
                      {profile.isAdmin && (
                        <Badge className="bg-blue-500">Admin</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chipta tarixi */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-6">Chipta tarixi</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2A2F37] text-gray-400">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm">Sana</th>
                      <th className="px-4 py-3 text-left text-sm">O'rindiq</th>
                      <th className="px-4 py-3 text-left text-sm">Narxi</th>
                      <th className="px-4 py-3 text-left text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {profile.tickets.map((ticket) => (
                      <tr key={ticket._id} className="text-gray-300">
                        <td className="px-4 py-3 text-sm">
                          {new Date(ticket.purchasedAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">{ticket.seatNumber}</td>
                        <td className="px-4 py-3 text-sm">
                          {ticket.price.toLocaleString()}0 000 сум
                        </td>
                        <td className="px-4 py-3">
                          <Badge 
                            className={
                              ticket.paymentStatus === 'paid' 
                                ? 'bg-emerald-500' 
                                : 'bg-yellow-500'
                            }
                          >
                            {ticket.paymentStatus === 'paid' ? 'To\'langan' : 'Kutilmoqda'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
