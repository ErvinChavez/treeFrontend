import { jwtDecode } from "jwt-decode";

//save token after login
export const setToken = (token) => {
    localStorage.setItem("token", token);
    
};

//get token from requests
export const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token")
};

//logout
export const removeToken = () => {
    localStorage.removeItem("token");
};

//check if logged in
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    const valid = decoded.exp * 1000 > Date.now();

    if (!valid) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (err) {
    localStorage.removeItem("token");
    return false;
  }
};