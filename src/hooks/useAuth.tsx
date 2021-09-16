import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { formDataClient, jsonClient, Payload, toFormData } from '../utils/axiosClient';
import User from '../model/users/user';
import Store from '../model/users/store';

interface Props {
  children: ReactNode;
}

interface LoginProps {
  email: string;
  password: string;
}

interface SignupProps {
  user: User;
  store?: Store;
}

interface UserContext {
  user?: User;
  updateMe: (user: Partial<User>) => Promise<Payload<User>>;
  register: (props: SignupProps) => Promise<Payload<User>>;
  login: (props: LoginProps) => Promise<Payload<User>>;
  forgotPassword: (email: string) => Promise<Payload<User>>;
}

const AuthContext = createContext<UserContext>({
  updateMe: (_) => new Promise(() => _),
  register: (_) => new Promise(() => _),
  login: (_) => new Promise(() => _),
  forgotPassword: (_) => new Promise(() => _),
});

export type { UserContext };

export const AuthProvider = (props: Props): React.ReactElement => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const _onUser = (res: Payload<User>) => {
    const user = res.data?.user;
    console.log(user);
    setUser(user);
    return res;
  };

  const updateMe = (user: Partial<User>): Promise<Payload<User>> =>
    formDataClient
      .patch<FormData, Payload<User>>('/users/updateMe', toFormData(user))
      .then(_onUser);

  const register = (props: SignupProps): Promise<Payload<User>> => {
    const { user, store } = props;
    return formDataClient
      .post<SignupProps, Payload<User>>(`/users/signup`, toFormData({ ...user, store }))
      .then(_onUser);
  };

  const login = (props: LoginProps): Promise<Payload<User>> =>
    jsonClient.post<LoginProps, Payload<User>>(`/users/login`, props).then(_onUser);

  const forgotPassword = (email: string): Promise<Payload<User>> =>
    jsonClient.post<string, Payload<User>>(`/users/forgotPassword`, { email }).then((res) => res);

  // const logout = () => console.log('logout');

  const checkUserLoggedIn = () =>
    jsonClient
      .get<void, Payload<User>>(`/users/me`)
      .then(_onUser)
      .catch((e) => console.log(e.message));

  return (
    <AuthContext.Provider value={{ user, updateMe, forgotPassword, register, login }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
