import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../services/AuthApi';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        toast.success("Successfully logged in!");
        return true;
      }
    } catch (err) {
      if (err.error) {
        toast.error(err.error);
      } else {
        toast.error("An error occurred during login.");
      }
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        toast.success("Registration successful!");
        return true;
      }
    } catch (err) {
      // DRF returns errors in objects where keys are fields
      if (typeof err === 'object') {
        Object.entries(err).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach(msg => toast.error(`${field}: ${msg}`));
          } else if (typeof messages === 'string') {
            toast.error(`${field}: ${messages}`);
          }
        });
      } else {
        toast.error("An error occurred during registration.");
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call the server first while the token is still in localStorage,
      // so Django can find and delete it from the database.
      await logoutUser();
    } catch (err) {
      console.error("Logout API error (token may still be deleted locally)", err);
    } finally {
      // Always clear local state regardless of server response.
      setToken(null);
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
