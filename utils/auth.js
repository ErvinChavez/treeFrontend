import { jwtDecode } from "jwt-decode";

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

  const token = localStorage.getItem("token");
  console.log("TOKEN:", token);

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    console.log("DECODED:", decoded);

    const valid = decoded.exp * 1000 > Date.now();
    console.log("IS VALID:", valid);

    return valid;
  } catch (err) {
    console.log("JWT ERROR:", err);
    return false;
  }
};