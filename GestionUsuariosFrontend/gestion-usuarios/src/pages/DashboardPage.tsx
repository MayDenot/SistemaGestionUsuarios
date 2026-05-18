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
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState('name');
    const [textSearch, setTextSearch] = useState('');

    useEffect(() => {
        fetchUsers()
    }, [page, sort])

    const fetchUsers = async () => {
        try {
            const response = await api.get<PageResponse<User>>
                (`/users?page=${page}&size=5&sort=${sort}&name=${textSearch}&email=${textSearch}`);
            setUsers(response.data.content)
            setTotalPages(response.data.totalPages)
        } catch (err: any) {
            toast.error("Error al cargar los usuarios")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <select
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value)
                            setPage(0)
                        }}
                        className="border border-blue-300 rounded px-3 py-2 text-sm"
                    >
                        <option value="name">Ordenar por nombre</option>
                        <option value="email">Ordenar por email</option>
                        <option value="id">Ordenar por ID</option>
                    </select>

                    <div className="relative flex items-center">
                        <span className="absolute left-3 text-gray-400 pointer-events-none">🔍</span>
                        <input
                            className="border border-blue-300 rounded pl-9 pr-3 py-2 text-sm"
                            type="text"
                            value={textSearch}
                            placeholder="Buscar usuarios..."
                            onChange={(e) => setTextSearch(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setPage(0)
                                    fetchUsers()
                                }
                            }}
                        />
                    </div>
                </div>

                <UserTable users={users} onRefresh={fetchUsers} />

                {/* Controles de paginación */}
                <div className="flex justify-center items-center gap-4 mt-4">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                        className="px-4 py-2 bg-white rounded shadow text-sm disabled:opacity-50"
                    >
                        Anterior
                    </button>

                    <span className="text-sm text-gray-600">
                        Página {page + 1} de {totalPages}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page + 1 === totalPages}
                        className="px-4 py-2 bg-white rounded shadow text-sm disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </main>
        </div>
    );
}

export default DashboardPage