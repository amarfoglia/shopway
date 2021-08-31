/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import client from '../utils/axiosClient';
import User from '../model/User';
import { ErrorConsumer, DataConsumer, Response, AppError } from '../model/http';

interface Props {
  children: ReactNode;
}

interface UserPayload {
  user: User;
}

interface UserContext {
  user?: User;
  error?: string;
  isLoading: boolean;
  register: (user: User) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<UserContext>({
  isLoading: false,
  register: (_u) => {},
  login: (_e, _p) => {},
  logout: () => {},
});

export type { UserContext };

export const AuthProvider = (props: Props): React.ReactElement => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  function _authFun<T>(
    promise: Promise<Response<T>>,
    onData: DataConsumer<T>,
    onError?: ErrorConsumer,
  ) {
    setError('');
    setIsLoading(true);
    return promise
      .then((res) => {
        onData(res.data);
        setIsLoading(false);
      })
      .catch((error: AppError) => {
        setError(error.message);
        onError?.(error);
        setIsLoading(false);
      });
  }

  const register = (user: User) =>
    _authFun<UserPayload>(client.post(`/users/signup`, user), ({ data }) => setUser(data?.user));

  const login = (email: string, password: string) =>
    _authFun<UserPayload>(client.post(`/users/login`, { email, password }), ({ data }) =>
      setUser(data?.user),
    );

  const logout = () => console.log('logout');

  const checkUserLoggedIn = () =>
    _authFun<UserPayload>(client.get(`/users/me`), ({ data }) => setUser(data?.user));

  return (
    <AuthContext.Provider value={{ user, error, isLoading, register, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
