import { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import type {User} from '../types'
import UserTable from '../components/users/UserTable'
import Navbar from "../components/Navbar.tsx";

export interface PageResponse<T> {
    content: T[]
    totalElements: number
    totalPages: number
    number: number
    size: number
}

const DashboardPage = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Carga la lista de usuarios al entrar al dashboard
    const fetchUsers = async () => {
        try {
            const response = await api.get<PageResponse<User>>('/users')
            setUsers(response.data.content)
        } catch (err: any) {
            setError('Error al cargar los usuarios')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

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