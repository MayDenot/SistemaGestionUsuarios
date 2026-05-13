import type {User} from "../../types";
import UserRow from './UserRow';

interface Props {
    users: User[],
    onRefresh: () => void,
}

const UserTable = ({users, onRefresh}: Props) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            {/* Encabezado con título y botón de agregar */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Usuarios</h2>
            </div>

            {/* Tabla */}
            {users.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No hay usuarios registrados</p>
            ) : (
                <table className="w-full text-sm text-left">
                    <thead>
                    <tr className="border-b text-gray-500 uppercase text-xs">
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">Nombre</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Rol</th>
                        <th className="py-3 px-4">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Por cada usuario, renderiza un UserRow */}
                    {users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onRefresh={onRefresh}
                        />
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserTable;