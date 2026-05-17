import {createContext, useContext, useState} from "react";
import {setGlobalSetLoading} from "../store/loadingStore.ts";

interface LoadingContextType {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const LoadingProvider = ({children}: any) => {
    const [loading, setLoading] = useState(false);

    setGlobalSetLoading(setLoading);

    return (
        <LoadingContext.Provider value={{loading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    );
}

export const useLoading = () => {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error("useLoading() must be inside LoadingProvider");
    }
    return context;
}