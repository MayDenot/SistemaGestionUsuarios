import {useAuth} from "../hooks/useAuth.ts";
import {useState} from "react";
import { useNavigate, Link } from 'react-router-dom'
import type {AuthResponse, LoginRequest} from "../types";
import api, {type CustomAxiosRequestConfig} from "../api/axiosConfig";
import { toast } from "sonner";

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        try {
            const response = await api.post<AuthResponse>('/auth/login', form, {skipGlobalLoading: true} as CustomAxiosRequestConfig);
            const { accessToken, refreshToken, user } = response.data;

            login(accessToken, refreshToken, user);
            navigate('/dashboard');
        } catch (err: any) {
            toast.error("Error al iniciar sesión")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md shadow-xl shadow-blue-200">
                <h2 className="text-2xl font-bold text-black mb-6 text-center">
                    Iniciar sesión
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 text-start mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 text-start mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="
                            w-full
                            bg-blue-600
                            text-white
                            py-2
                            rounded-lg
                            hover:bg-blue-700
                            transition
                            cursor-pointer
                        ">
                        Ingresar
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-4">
                    ¿No tenés cuenta?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Registrate
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;