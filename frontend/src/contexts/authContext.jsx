/* eslint-disable react/prop-types */
import { useContext, useState, createContext } from "react";
import api from "../component/services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const register = async (formData) => {
      const response = await api.post('/register', formData);
      return response?.data
  };

  const login = async (formData) => {
    const response = await api.post('/login', formData);
    return response?.data
  };

  const logout = () => {
    localStorage.removeItem('fere_user');
    localStorage.removeItem('fere_token');
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout, register }}>
        {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
