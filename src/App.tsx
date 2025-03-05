import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Header } from "./components/Header"
import { HomePage } from "./pages/Home"
import { LoginPage } from "./pages/Login"
import { RegisterPage } from "./pages/Register"
import { VerifyEmailPage } from "./pages/VerifyEmail"
import { WishlistPage } from "./pages/Wishlist"
import { SessionsPage } from "./pages/Sessions"
import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react"
import { ToastProvider } from "./providers/ToastContext"
import { Footer } from "./components/Footer"

function App() {
  const { checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/sessions/:movieId" element={<SessionsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App