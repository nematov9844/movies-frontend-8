import { Routes, Route, BrowserRouter } from "react-router-dom"
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
import { Header } from "./components/Header"
import Profile from "./pages/Profile"
import { SessionDetails } from "./pages/SessionDetails"
import { PaymentSuccess } from "./pages/PaymentSuccess"

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
              <Route path="/sessions/:sessionId" element={<SessionDetails />} />
              <Route path="/sessions" element={<SessionsPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App