import * as React from 'react';

export interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within a AuthProvider with a value');
  }

  return ctx;
};

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [token, setToken] = React.useState<string | null>(() =>
    localStorage.getItem('token')
  );

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const value = React.useMemo(
    () => ({ token, login, logout }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
