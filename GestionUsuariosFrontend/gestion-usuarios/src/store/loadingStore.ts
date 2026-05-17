let globalSetLoading:
    ((loading: boolean) => void);

export const setGlobalSetLoading = (
    setter: (loading: boolean) => void
) => {
    globalSetLoading = setter;
};

export const getGlobalSetLoading = () => {
    return globalSetLoading;
};