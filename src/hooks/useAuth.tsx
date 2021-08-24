import React, { createContext, useState, useEffect, ReactNode } from 'react';
import client from '../utils/axiosClient';
import { AppError } from '../model/http';
import User from '../model/User';
import { AxiosResponse } from 'axios';

interface Props {
  children: ReactNode;
}

interface UserContext {
  user?: User;
  error?: string;
  isLoading: boolean;
  register: (user: User) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

type DataConsumer = (res: AxiosResponse<any>) => void;
type ErrorConsumer = (error: AppError) => void;

const AuthContext = createContext<UserContext | null>(null);

export type { UserContext };

export const AuthProvider = (props: Props): React.ReactElement => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const _authFun = (
    promise: Promise<AxiosResponse<any>>,
    onData: DataConsumer,
    onError?: ErrorConsumer,
  ) => {
    setIsLoading(true);
    promise
      .then((res) => {
        onData(res);
        setIsLoading(false);
      })
      .catch((error: AppError) => {
        setError(error.message);
        onError?.(error);
        setIsLoading(false);
      });
  };

  const register = (user: User) => {
    client.post(`/users/signup`, user);
  };

  const login = (email: string, password: string) => {
    _authFun(client.post(`/users/login`, { email, password }), ({ data }) => setUser(data));
  };

  const logout = () => console.log('logout');

  const checkUserLoggedIn = () => {
    _authFun(client.get(`/users/me`), ({ data }) => setUser(data.data));
  };

  return (
    <AuthContext.Provider value={{ user, error, isLoading, register, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
