import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useMutation } from 'react-query';
import { formDataClient, jsonClient, Payload } from '../utils/axiosClient';
import User from '../model/users/user';
import Store from '../model/users/store';
import { AppError } from '../model/http';
import objectToFormData from '../utils/formdata';

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
  photo?: File;
}

interface ChangePasswordProps {
  passwordCurrent: string;
  password: string;
  passwordConfirm: string;
}

interface UserContext {
  user?: User;
  isLoading?: boolean;
  error?: AppError | null;
  updateMe: (user: Partial<User>) => Promise<Payload<User>>;
  register: (props: SignupProps) => Promise<Payload<User>>;
  login: (props: LoginProps) => Promise<Payload<User>>;
  forgotPassword: (email: string) => Promise<Payload<User>>;
  changePassword: (props: ChangePasswordProps) => Promise<Payload<User>>;
}

const AuthContext = createContext<UserContext>({
  updateMe: (_) => new Promise(() => _),
  register: (_) => new Promise(() => _),
  login: (_) => new Promise(() => _),
  forgotPassword: (_) => new Promise(() => _),
  changePassword: (_) => new Promise(() => _),
});

export type { UserContext };

export const AuthProvider = (props: Props): React.ReactElement => {
  const [user, setUser] = useState<User>();

  const checkUserLoggedIn = (): Promise<Payload<User>> =>
    jsonClient.get<void, Payload<User>>(`/users/me`).then(_onUser);

  const {
    error,
    isLoading,
    mutate: _checkUserLoggedIn,
  } = useMutation<Payload<User>, AppError>(checkUserLoggedIn);

  useEffect(() => {
    _checkUserLoggedIn();
  }, []);

  const _onUser = (res: Payload<User>) => {
    const user = res.data?.user;
    setUser(user);
    return res;
  };

  const updateMe = (user: Partial<User>): Promise<Payload<User>> =>
    formDataClient
      .patch<FormData, Payload<User>>('/users/updateMe', objectToFormData(user))
      .then(_onUser);

  const register: (props: SignupProps) => Promise<Payload<User>> = ({ user, store, photo }) =>
    formDataClient
      .post<SignupProps, Payload<User>>(
        `/users/signup`,
        objectToFormData({ ...user, store, photo }),
      )
      .then(_onUser);

  const login = (props: LoginProps): Promise<Payload<User>> =>
    jsonClient.post<LoginProps, Payload<User>>(`/users/login`, props).then(_onUser);

  const forgotPassword = (email: string): Promise<Payload<User>> =>
    jsonClient.post<string, Payload<User>>(`/users/forgotPassword`, { email }).then((res) => res);

  const changePassword = (props: ChangePasswordProps): Promise<Payload<User>> =>
    jsonClient.patch<string, Payload<User>>(`/users/updateMyPassword`, props).then(_onUser);

  // const logout = () => console.log('logout')

  return (
    <AuthContext.Provider
      value={{
        user,
        updateMe,
        forgotPassword,
        changePassword,
        register,
        login,
        error,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
