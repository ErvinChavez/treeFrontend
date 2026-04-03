//save token after login
export const setToken = (token) => {
    localStorage.setItem("token", token);
    
};

//get token from requests
export const getToken = () => {
    return localStorage.getItem("token")
};

//logout
export const removeToken = () => {
    localStorage.removeItem("token");
};

//check if logged in
export const isAuthenticated = () => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
};