import { useState } from 'react';
import type {User, UserRequestDTO} from '../../types';
import api from '../../api/axiosConfig';
import { toast } from "sonner";

interface Props {
    user?: User,
    onClose: () => void,
    onSuccess: () => void,
}

const UserForm = ({user, onClose, onSuccess}: Props) => {
    const [form, setForm] = useState<UserRequestDTO>({
        name: user?.name ?? '',
        email: user?.email ?? '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (user) {
                await api.put(`/users/${user.id}`, form);
            } else {
                await api.post(`/users`, form);
            }
            onSuccess()

            toast.success(
                user
                    ? "Usuario actualizado"
                    : "Usuario creado"
            );
        } catch (err: any) {
            toast.error(
                err.response?.data ||
                "Error al guardar"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-gray-700 mb-3">
                {user ? 'Editar usuario' : 'Nuevo usuario'}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nombre del usuario"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="email@ejemplo.com"
                    />
                </div>

                <div className="flex gap-2 justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;

