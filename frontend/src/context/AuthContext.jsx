import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (token && user) {
    setUser(JSON.parse(user));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  setLoading(false);
}, []);

  const login = async (email, password) => {
    const response = await authService.login({ email, password });
    if (response.success) {
      setUser(response.data);
    }
    return response;
  };

  const register = async (name, email, password) => {
    const response = await authService.register({ name, email, password });
    if (response.success) {
      setUser(response.data);
    }
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
