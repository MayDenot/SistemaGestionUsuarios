import {useAuth} from "../../hooks/useAuth.ts";

const ProfileAvatar = () => {
    const {user} = useAuth();

    return (
        <div className="group w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold border-4 border-gray-400">
            <span className="text-gray-700 font-semibold text-2xl leading-none transition-transform duration-300 group-hover:scale-125">
                {user?.name.charAt(0).toUpperCase()}
            </span>
        </div>
    );
}

export default ProfileAvatar;