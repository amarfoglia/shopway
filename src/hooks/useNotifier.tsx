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

interface NotificationContext {
  notifications: Notification[];
  markNotification: (notificationId: string) => void;
}

type NewArticleData = {
  newArticle: Article;
  notify: Notification;
};

const NotifierContext = createContext<NotificationContext>({
  notifications: [],
  markNotification: (id) => console.log(`mark notification ${id}`),
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

  useEffect(() => {
    if (user?.role) {
      _setUpSocket(io(BACKEND_URL, { query: { role: user.role, userId: user._id ?? '-' } }));
      _getNotifications();
    }
    return _disconnect;
  }, [user?.role]);

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

  const _setUpSocket = (socket: Socket) => {
    socket.on('connect', () => {
      console.log('web socket connected');
      user?.role === Role.CUSTOMER && _handleCustomerConnection(socket, user as Customer);
      user?.role === Role.SELLER && _handleSellerConnection(socket);
    });

    socket.on('connect_error', () => {
      console.log('Connection Failed');
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

  const _disconnect = () => {
    socket?.disconnect();
  };

  return (
    <NotifierContext.Provider value={{ notifications, markNotification }}>
      {props.children}
    </NotifierContext.Provider>
  );
};
export default NotifierContext;
