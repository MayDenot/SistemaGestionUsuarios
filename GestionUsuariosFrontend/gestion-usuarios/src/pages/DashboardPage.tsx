import { useEffect, useState } from 'react'
import api from '../api/axiosConfig'
import type {User} from '../types'
import UserTable from '../components/users/UserTable'
import Navbar from "../components/Navbar.tsx";
import { toast } from "sonner";

export interface PageResponse<T> {
    content: T[]
    totalElements: number
    totalPages: number
    number: number
    size: number
}

const DashboardPage = () => {
    const [users, setUsers] = useState<User[]>([])

    const fetchUsers = async () => {
        try {
            const response = await api.get<PageResponse<User>>('/users')
            setUsers(response.data.content)
        } catch (err: any) {
            toast.error("Error al cargar los usuarios")
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar />

            {/* Contenido */}
            <main className="p-6">
                <UserTable users={users} onRefresh={fetchUsers} />
            </main>
        </div>
    )
}

export default DashboardPage