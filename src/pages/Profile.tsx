import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const auth = useAuth();
  const user = auth?.user?.user;
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/me`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      auth.setUser({ ...auth.user, user: res.data.user });
      setIsEditing(false);
    } catch (error: any) {
      console.error("Profilni yangilashda xatolik:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border">
        <div className="flex flex-col items-center space-y-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-semibold overflow-hidden">
            {formData.avatar ? (
              <img 
                src={formData.avatar} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              formData.name.charAt(0).toUpperCase() || "U"
            )}
          </div>

          {/* Ism */}
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-2xl font-bold text-gray-800 border p-2 rounded-md w-full text-center"
            />
          ) : (
            <h1 className="text-2xl font-bold text-gray-800">{user?.name || "Ism yo‘q"}</h1>
          )}

          {/* Ma'lumotlar bloki */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-500">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-lg font-medium border p-2 rounded-md w-full"
                />
              ) : (
                <p className="text-lg font-medium">{user?.email || "N/A"}</p>
              )}
            </div>

            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-500">Ro‘yxatdan o‘tgan sana</p>
              <p className="text-lg font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          {/* Avatar URL kiritish */}
          {isEditing && (
            <div className="w-full">
              <p className="text-sm text-gray-500 mb-1">Avatar URL</p>
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="text-lg font-medium border p-2 rounded-md w-full"
                placeholder="Rasm URL kiritish"
              />
            </div>
          )}

          {/* Tugmalar */}
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                Saqlash
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition"
              >
                Bekor qilish
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Profilni tahrirlash
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
