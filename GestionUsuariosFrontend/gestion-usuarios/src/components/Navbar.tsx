import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";
import ProfileAvatar from "./users/ProfileAvatar.tsx";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-blue-600 shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-300">
                Gestión de Usuarios
            </h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-white">
                 Hola, <span className="font-bold">{user?.name}</span>
                </span>
                <Link to="/me">
                    {user && <ProfileAvatar />}
                </Link>
                <button
                    onClick={handleLogout}
                    className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Cerrar sesión
                </button>
            </div>
        </nav>
    );
}

export default Navbar;