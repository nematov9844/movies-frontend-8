import { useAuth } from '../hooks/useAuth'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profil</h1>
        
        <div className="bg-card p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Ism</label>
              <p className="text-lg font-medium">{user?.name || 'N/A'}</p>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Ro'yxatdan o'tgan sana</label>
              <p className="text-lg font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 