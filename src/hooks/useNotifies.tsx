import React, { createContext, useEffect, useContext, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import Customer from '../model/users/customer';
import Role from '../model/users/role';
import { BACKEND_URL } from '../utils/axiosClient';
import AuthContext from './useAuth';

// interface MyContext {}

const NotifiesContext = createContext({});

export type { NotifiesContext };

export const NotifiesProvider: React.FC = (props) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState<Socket>();

  const _handleCustomerConnection = (customer: Customer) =>
    socket?.emit('joinFollowedStores', { data: customer.followerList });

  const _setUpSocket = (socket: Socket) => {
    socket?.on('connect', () => {
      console.log('web socket connected');
      user?.role === Role.CUSTOMER && _handleCustomerConnection(user as Customer);
    });

    socket?.on('connect_error', () => {
      console.log('Connection Failed');
    });

    setSocket(socket);
  };

  const _disconnect = () => {
    socket?.disconnect();
  };

  useEffect(() => {
    user && _setUpSocket(socketIOClient(BACKEND_URL));
    return _disconnect;
  }, [user]);

  return <NotifiesContext.Provider value={{}}>{props.children}</NotifiesContext.Provider>;
};

export default NotifiesContext;
