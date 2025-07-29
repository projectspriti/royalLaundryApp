import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Custom hook
export const useAuthContext = () => useContext(AuthContext);

// Context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This will store user details

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
