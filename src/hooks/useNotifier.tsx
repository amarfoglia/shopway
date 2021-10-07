import React, { createContext, useEffect, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Customer from '../model/users/customer';
import Role from '../model/users/role';
import Notification from '../model/notification';
import AuthContext from './useAuth';
import Article from '../model/article';
import { jsonClient, Payload } from '../utils/axiosClient';
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
    _getNotifications();
  }, []);

  const _handleCustomerConnection = (socket: Socket, customer: Customer) =>
    socket.emit('joinFollowedStores', { storeIds: customer.followerList });

  const _setUpSocket = (socket: Socket) => {
    socket.on('connect', () => {
      console.log('web socket connected');
      user?.role === Role.CUSTOMER && _handleCustomerConnection(socket, user as Customer);
    });

    socket.on('connect_error', () => {
      console.log('Connection Failed');
    });

    socket.on('newArticle', (data: NewArticleData) => {
      setNotifications((state) => [...state, data.notify]);
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

  useEffect(() => {
    user?.role && _setUpSocket(io('http://localhost:5000', { query: { role: user.role } }));
    return _disconnect;
  }, [user?.role]);

  return (
    <NotifierContext.Provider value={{ notifications, markNotification }}>
      {props.children}
    </NotifierContext.Provider>
  );
};
export default NotifierContext;
