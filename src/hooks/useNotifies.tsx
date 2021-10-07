import React, { createContext, useEffect, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Customer from '../model/users/customer';
import Role from '../model/users/role';
import AuthContext from './useAuth';

const NotifiesContext = createContext({});

export type { NotifiesContext };

export const NotifiesProvider: React.FC = (props) => {
  const { user } = useContext(AuthContext);

  const [socket, setSocket] = useState<Socket>();

  const _handleCustomerConnection = (socket: Socket, customer: Customer) => {
    socket.emit('joinFollowedStores', { storeIds: customer.followerList });
  };

  const _setUpSocket = (socket: Socket) => {
    socket.on('connect', () => {
      console.log('web socket connected');
      user?.role === Role.CUSTOMER && _handleCustomerConnection(socket, user as Customer);
    });

    socket.on('connect_error', () => {
      console.log('Connection Failed');
    });
    socket.on('newArticle', (newArticle, notify) => {
      console.log('triggered new Article Client', newArticle, notify);
      console.log(newArticle);
      console.log(notify);
    });
    setSocket(socket);
  };

  const _disconnect = () => {
    socket?.disconnect();
  };

  useEffect(() => {
    user && _setUpSocket(io('http://localhost:5000', { query: { role: user.role } }));
    return _disconnect;
  }, [user]);

  return <NotifiesContext.Provider value={{}}>{props.children}</NotifiesContext.Provider>;
};
export default NotifiesContext;
