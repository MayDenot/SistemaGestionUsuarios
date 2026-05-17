import type {ChangePasswordForm, UpdateProfileRequest, User} from "../../types";
import {useState} from "react";
import api from "../../api/axiosConfig.ts";
import {useAuth} from "../../hooks/useAuth.ts";

interface Props {
    user: User;
    onClose: () => void;
    onSuccess: () => void;
}


const EditProfileForm = ({
                             user,
                             onClose,
                             onSuccess
                         }: Props) => {
    const { updateUser } = useAuth();

    const [profileForm, setProfileForm] =
        useState<UpdateProfileRequest>({
            name: user.name,
            email: user.email,
        });

    const [passwordForm, setPasswordForm] =
        useState<ChangePasswordForm>({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });

    const [loading, setLoading] =
        useState(false);

    const [profileError, setProfileError] =
        useState<string | null>(null);

    const [passwordError, setPasswordError] =
        useState<string | null>(null);

    const handleChangeProfileForm = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProfileForm({
            ...profileForm,
            [e.target.name]: e.target.value
        });
    };

    const handleChangePasswordForm = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setProfileError(null);
        setPasswordError(null);

        setLoading(true);

        try {
            const profileResponse =
                await api.put(
                    '/users/me',
                    profileForm
                );

            updateUser(profileResponse.data);

            const shouldChangePassword =
                passwordForm.currentPassword ||
                passwordForm.newPassword ||
                passwordForm.confirmPassword;

            if (shouldChangePassword) {

                if (
                    passwordForm.newPassword !==
                    passwordForm.confirmPassword
                ) {
                    setPasswordError(
                        'Las contraseñas no coinciden'
                    );

                    return;
                }

                await api.put(
                    '/users/me/password',
                    {
                        currentPassword:
                        passwordForm.currentPassword,

                        newPassword:
                        passwordForm.newPassword,
                    }
                );
            }

            onSuccess();
            onClose();

        } catch (err: any) {

            const message =
                err.response?.data ||
                'Error al guardar';

            setProfileError(message);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-sm">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">

                <h3 className="text-lg font-semibold text-gray-800">
                    Configuración de perfil
                </h3>

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        text-sm
                        text-gray-500
                        hover:text-gray-700
                        transition
                        cursor-pointer
                    "
                >
                    Cerrar
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 text-start"
            >

                {/* PROFILE */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Editar usuario
                </h3>

                {profileError && (
                    <p className="text-red-500 text-sm mb-2">
                        {profileError}
                    </p>
                )}

                <div>
                    <label className="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        mb-2
                    ">
                        Nombre
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={profileForm.name}
                        onChange={handleChangeProfileForm}
                        required
                        placeholder="Nombre del usuario"
                        className="
                            w-full
                            bg-white
                            border
                            border-gray-300
                            text-gray-800
                            placeholder:text-gray-400
                            rounded-xl
                            px-4
                            py-2.5
                            shadow-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "
                    />
                </div>

                <div>
                    <label className="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        mb-2
                    ">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleChangeProfileForm}
                        required
                        placeholder="email@ejemplo.com"
                        className="
                            w-full
                            bg-white
                            border
                            border-gray-300
                            text-gray-800
                            placeholder:text-gray-400
                            rounded-xl
                            px-4
                            py-2.5
                            shadow-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "
                    />
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-8" />

                {/* PASSWORD */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Cambiar contraseña
                </h3>

                {passwordError && (
                    <p className="text-red-500 text-sm mb-2">
                        {passwordError}
                    </p>
                )}

                <div>
                    <label className="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        mb-2
                    ">
                        Contraseña actual
                    </label>

                    <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handleChangePasswordForm}
                        placeholder="Contraseña actual"
                        className="
                            w-full
                            bg-white
                            border
                            border-gray-300
                            text-gray-800
                            placeholder:text-gray-400
                            rounded-xl
                            px-4
                            py-2.5
                            shadow-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "
                    />
                </div>

                <div>
                    <label className="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        mb-2
                    ">
                        Contraseña nueva
                    </label>

                    <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handleChangePasswordForm}
                        placeholder="Contraseña nueva"
                        className="
                            w-full
                            bg-white
                            border
                            border-gray-300
                            text-gray-800
                            placeholder:text-gray-400
                            rounded-xl
                            px-4
                            py-2.5
                            shadow-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "
                    />
                </div>

                <div>
                    <label className="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        mb-2
                    ">
                        Confirmar contraseña
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handleChangePasswordForm}
                        placeholder="Confirmar contraseña"
                        className="
                            w-full
                            bg-white
                            border
                            border-gray-300
                            text-gray-800
                            placeholder:text-gray-400
                            rounded-xl
                            px-4
                            py-2.5
                            shadow-sm
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "
                    />
                </div>
                {/* ACTION */}
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            bg-blue-600
                            text-white
                            px-5
                            py-2.5
                            rounded-xl
                            hover:bg-blue-700
                            transition
                            disabled:opacity-50
                            cursor-pointer
                        "
                    >
                        {loading
                            ? 'Guardando...'
                            : 'Guardar cambios'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;