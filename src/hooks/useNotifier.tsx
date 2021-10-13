/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Customer from '../model/users/customer';
import Role from '../model/users/role';
import Notification from '../model/notification';
import AuthContext from './useAuth';
import Article from '../model/article';
import { BACKEND_URL, jsonClient, Payload } from '../utils/axiosClient';
import { AppError } from '../model/http';
import { useMutation } from 'react-query';
import User from '../model/users/user';

interface NotificationContext {
  notifications: Notification[];
  markNotification: (notificationId: string) => void;
  disconnect: () => void;
  connect: (user: User) => void;
  isConnected: () => boolean;
}

type NewArticleData = {
  newArticle: Article;
  notify: Notification;
};

const NotifierContext = createContext<NotificationContext>({
  notifications: [],
  markNotification: (_) => null,
  disconnect: () => null,
  connect: (_) => null,
  isConnected: () => false,
});

export type { NotifierContext };

const getNotifications = () =>
  jsonClient.get<void, Payload<Notification[]>>(`/users/notifications`).then((res) => res);

export const NotifierProvider: React.FC = (props) => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket>();

  const { mutate: _getNotifications } = useMutation<Payload<Notification[]>, AppError>(
    'getNotifications',
    getNotifications,
    {
      onSuccess: ({ data }) =>
        data && setNotifications((state) => [...state, ...data.notifications]),
    },
  );

  const disconnect = () => {
    setNotifications([]);
    socket?.disconnect();
  };

  const connect = () => socket?.connect();

  const isConnected = () => socket?.connected ?? false;

  const _reset = () => {
    disconnect();
    setSocket(undefined);
  };

  useEffect(() => {
    socket && connect();
  }, [socket]);

  useEffect(() => {
    if (user) {
      const params = { query: { role: user.role, userId: user._id ?? '-' } };
      _setUpSocket(io(BACKEND_URL, params), user);
    } else {
      _reset();
    }
    return _reset;
  }, [user]);

  const _handleCustomerConnection = (socket: Socket, customer: Customer) => {
    socket.on('newArticle', (data: NewArticleData) => {
      setNotifications((state) => [...state, data.notify]);
    });

    socket.emit('joinFollowedStores', { storeIds: customer.followerList });
  };

  const _handleSellerConnection = (socket: Socket) => {
    socket.on('newOrder', (data: NewArticleData) => {
      setNotifications((state) => [...state, data.notify]);
    });
  };

  const _setUpSocket = (socket: Socket, user: User) => {
    socket?.on('connect', () => {
      console.log('web socket connected');
      _getNotifications();
      if (!socket.hasListeners('newArticle') && !socket.hasListeners('newOrder')) {
        user?.role === Role.CUSTOMER && _handleCustomerConnection(socket, user as Customer);
        user?.role === Role.SELLER && _handleSellerConnection(socket);
      }
    });

    socket?.on('connect_error', () => {
      console.log('Connection Failed');
    });

    socket?.on('disconnect', () => {
      console.log('web socket disconnected');
    });

    setSocket(socket);
  };

  const markNotification = (notificationId: string) =>
    setNotifications((state) =>
      state.map((n) =>
        n._id === notificationId
          ? { ...n, readBy: [{ user: user?._id ?? '', readAt: new Date() }] }
          : n,
      ),
    );

  return (
    <NotifierContext.Provider
      value={{ notifications, markNotification, disconnect, connect, isConnected }}
    >
      {props.children}
    </NotifierContext.Provider>
  );
};
export default NotifierContext;
