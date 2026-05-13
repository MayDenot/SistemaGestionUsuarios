import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import type {User} from '../types'
import UserTable from '../components/users/UserTable'

const DashboardPage = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Carga la lista de usuarios al entrar al dashboard
    const fetchUsers = async () => {
        try {
            const response = await api.get<User[]>('/users')
            setUsers(response.data)
        } catch (err: any) {
            setError('Error al cargar los usuarios')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">
                    Gestión de Usuarios
                </h1>
                <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Hola, <span className="font-medium text-gray-700">{user?.name}</span>
          </span>
                    <button
                        onClick={handleLogout}
                        className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </nav>

            {/* Contenido */}
            <main className="p-6">
                {loading && (
                    <p className="text-center text-gray-500">Cargando usuarios...</p>
                )}
                {error && (
                    <p className="text-center text-red-500">{error}</p>
                )}
                {!loading && !error && (
                    <UserTable users={users} onRefresh={fetchUsers} />
                )}
            </main>
        </div>
    )
}

export default DashboardPage