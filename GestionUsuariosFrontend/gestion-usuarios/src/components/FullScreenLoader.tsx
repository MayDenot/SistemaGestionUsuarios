const FullScreenLoader = () => {
    return (
        <div
            className="
                fixed
                inset-0
                bg-black/20
                backdrop-blur-sm
                flex
                items-center
                justify-center
                z-50
            "
        >
            <div
                className="
                    w-12
                    h-12
                    rounded-full
                    border-4
                    border-transparent
                    border-t-blue-600
                    border-r-blue-600
                    animate-spin
                "
            />
        </div>
    );
};

export default FullScreenLoader;