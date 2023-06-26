import React, { createContext, useContext, useEffect, useState } from "react";

export const usePersistedState = (defaultValue, key) => {
    const value = JSON.parse(localStorage.getItem(key));
    const [state, setState] = useState(
        value === "" ? value : value || defaultValue,
        key
    );
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    const resetSate = () => setState(defaultValue);
    return [state, setState, resetSate];
};

export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

let store;

export const getStore = () => ({ ...store });

export const AppContextProvider = ({ children }) => {
    const user = usePersistedState("", "cc-user");

    store = {
        user,
    };

    return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};