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
  data: User;
}

interface LoginProps {
  email: string;
  password: string;
}

interface ForgotPasswordProps {
  email: string;
}

interface UserContext {
  user?: User;
  error?: string;
  isLoading: boolean;
  register: (user: User, onData?: DataConsumer<UserPayload>, onError?: ErrorConsumer) => void;
  login: (props: LoginProps, onData?: DataConsumer<UserPayload>, onError?: ErrorConsumer) => void;
  forgotPassword: (
    props: ForgotPasswordProps,
    onData?: DataConsumer<void>,
    onError?: ErrorConsumer,
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<UserContext>({
  isLoading: false,
  register: (_u) => {},
  login: (_e, _p) => {},
  logout: () => {},
  forgotPassword: (_e) => {},
});

export type { UserContext };

export const AuthProvider = (props: Props): React.ReactElement => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  async function _authFun<T>(
    promise: Promise<Response<T>>,
    onData: DataConsumer<T>,
    onError?: ErrorConsumer,
  ) {
    setError('');
    setIsLoading(true);
    try {
      const res = await promise;
      console.log(res.data);
      onData(res.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      onError?.(error);
      setIsLoading(false);
    }
  }

  const register = (user: User, onData?: DataConsumer<UserPayload>, onError?: ErrorConsumer) =>
    _authFun<UserPayload>(
      client.post(`/users/signup`, user),
      (res) => {
        setUser(res?.data?.data);
        onData?.(res);
      },
      onError,
    );

  const login = (props: LoginProps, onData?: DataConsumer<UserPayload>, onError?: ErrorConsumer) =>
    _authFun<UserPayload>(
      client.post(`/users/login`, props),
      (res) => {
        setUser(res.data?.data);
        onData?.(res);
      },
      onError,
    );

  const forgotPassword = (
    props: ForgotPasswordProps,
    onData?: DataConsumer<void>,
    onError?: ErrorConsumer,
  ) => _authFun<void>(client.post(`/users/forgotPassword`, props), (res) => onData?.(res), onError);

  const logout = () => console.log('logout');

  const checkUserLoggedIn = () =>
    _authFun<UserPayload>(client.get(`/users/me`), ({ data }) => setUser(data?.data));

  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, forgotPassword, register, login, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
