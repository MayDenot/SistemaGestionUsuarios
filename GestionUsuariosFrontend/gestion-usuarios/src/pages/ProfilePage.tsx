import ProfileAvatar from "../components/users/ProfileAvatar.tsx";
import { useAuth } from "../hooks/useAuth.ts";
import {useState} from "react";
import EditProfileForm from "../components/users/EditProfileForm.tsx";

export const ProfilePage = () => {
    const { user } = useAuth();

    const [editing, setEditing] = useState(false);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">

                {/* Header */}
                <div className="h-32 bg-blue-600" />

                <div className="px-8 pb-8">

                    {/* Top section */}
                    <div className="flex items-end gap-6">

                        <div className="border-4 border-white rounded-full shadow-lg">
                            <ProfileAvatar />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                {user.name}
                            </h1>

                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                                    {user.role}
                                </span>

                                <span className="text-sm text-green-600 font-medium">
                                    Activo
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-blue-100 rounded-xl p-5 border border-blue-200">
                            <p className="text-sm text-gray-500 mb-1">
                                Email
                            </p>

                            <p className="text-gray-800 font-medium">
                                {user.email}
                            </p>
                        </div>

                        <div className="bg-blue-100 rounded-xl p-5 border border-blue-200">
                            <p className="text-sm text-gray-500 mb-1">
                                Rol
                            </p>

                            <p className="text-gray-800 font-medium">
                                {user.role}
                            </p>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="mt-10 flex gap-4">
                        <button
                            onClick={() => setEditing(true)}
                            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition cursor-pointer">
                            Editar perfil
                        </button>
                    </div>

                    {editing && (
                        <div className="mt-6">
                            <EditProfileForm
                                user={user}
                                onClose={() => setEditing(false)}
                                onSuccess={() => {
                                    setEditing(false);
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;