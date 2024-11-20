import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedRole = localStorage.getItem('userRole');
    const savedEmail = localStorage.getItem('userEmail');

    if (savedToken && savedRole && savedEmail) {
      setIsAuthenticated(true);
      setAuthToken(savedToken);
      setUserRole(savedRole);
    }
  }, []);

  const signIn = (role, email, token) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setAuthToken(token);
    localStorage.setItem('authToken', token);  
    localStorage.setItem('userRole', role);    
    localStorage.setItem('userEmail', email);  
  };

  
  const signOut = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setAuthToken(null);
    localStorage.removeItem('authToken');  
    localStorage.removeItem('userRole');   
    localStorage.removeItem('userEmail');  
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, authToken, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
