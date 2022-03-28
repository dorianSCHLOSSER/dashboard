
export const localStorageExist = () => typeof window !== "undefined" && "localStorage" in window && window["localStorage"] !== null

export const setLocalStorage = (name, value) => {
    if (localStorageExist()) {
        localStorage.setItem(name, value);
    }
};

export const removeLocalStorage = (name) => {
    if (localStorageExist()) {
        localStorage.removeItem(name);
    }
};

export const getFromLocalStorage = (name) => localStorageExist() ? localStorage.getItem(name): null

export const setUser = (token) => {
    setLocalStorage("user", JSON.stringify("true"))
    setLocalStorage("token", JSON.stringify((token)))
};

export const setAToken = (access) => {
    setLocalStorage("access", JSON.stringify(access))
}

export const resetUser = () => {
    removeLocalStorage("user")
    removeLocalStorage("token")
};

export const getUser = () => {
    const user = getFromLocalStorage("user")
    return user ? JSON.parse(user) : null
}