import type {User} from "../../types";
import {useState} from "react";
import api from "../../api/axiosConfig.ts";
import UserForm from './UserForm';
import { toast } from "sonner";

interface Props {
    user: User,
    onRefresh: () => void,
}

const UserRow = ({user, onRefresh}: Props) => {
    const [editing, setEditing] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`¿Eliminar a ${user.name}?`)) return;

        try {
            await api.delete(`/users/${user.id}`);
            onRefresh();
        } catch (err) {
            toast.error('Error al eliminar el usuario');
        }
    }

    if (editing) {
        return (
            <tr>
                <td colSpan={5} className="py-2 px-4">
                    <UserForm
                        user={user}
                        onClose={() => setEditing(false)}
                        onSuccess={() => {
                            setEditing(false)
                            onRefresh()
                        }}
                    />
                </td>
            </tr>
        );
    }

    return (
        <tr className="border-b hover:bg-gray-50 transition">
            <td className="py-3 px-4 text-gray-500">{user.id}</td>
            <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
            <td className="py-3 px-4 text-gray-600">{user.email}</td>
            <td className="py-3 px-4">
        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
          {user.role}
        </span>
            </td>
            <td className="py-3 px-4 flex gap-2">
                <button
                    onClick={() => setEditing(true)}
                    className="text-sm bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                >
                    Editar
                </button>
                <button
                    onClick={handleDelete}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default UserRow;