import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from "./pages/ProfilePage.tsx";
import {useLoading} from "./context/LoadingContext.tsx";
import FullScreenLoader from "./components/FullScreenLoader.tsx";
import { Toaster } from "sonner";

function App() {
  const { loading } = useLoading();

  return (
      <BrowserRouter>
          {loading && <FullScreenLoader/>}

          <Toaster
              position="top-right"
              richColors
          />

          <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Ruta protegida - redirige a login si no hay token */}
              <Route path="/dashboard" element={
                  <PrivateRoute>
                      <DashboardPage />
                  </PrivateRoute>
              }/>

              <Route path="/me" element={<ProfilePage />} />

              {/* Cualquier ruta desconocida redirige a login */}
              <Route path="*" element={<Navigate to="/login"/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
