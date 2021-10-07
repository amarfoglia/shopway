import { Server, Socket } from 'socket.io';
import { HttpServer } from '@tsed/common';
import Role from './models/role';

interface StoreIds {
  storeIds: string[];
}

const addCustomerListeners = (socket: Socket) => {
  console.log('customer connected!');
  socket.on('joinFollowedStores', (data: StoreIds) => {
    data.storeIds.forEach((id) => socket.join(id));
  });
};

const addSellerListeners = (socket: Socket) => {
  console.log('seller connected!');
};

type Code = 'newArticle' | 'none';

class NotificationProvider {
  private readonly server: HttpServer;

  private readonly socketIo: Server;

  private port: string;

  public constructor(server: HttpServer, port: string) {
    this.server = server;
    this.port = port;
    this.socketIo = new Server(this.server, {
      cors: { origin: process.env.ORIGIN, credentials: true },
    });
    this.socketIo.on('connection', (socket: Socket) => {
      if (socket.handshake.query.role === Role.SELLER) {
        addSellerListeners(socket);
      } else addCustomerListeners(socket);
    });
  }

  emit = (code: Code, data?: Object, room?: string | string[]) => {
    if (room) this.socketIo.to(room).emit(code, data);
    else this.socketIo.emit(code, data);
  };

  // getSocket() { return this.socketIo; }
}

let instance: NotificationProvider;

const notifier = (server?: HttpServer, port?: string): NotificationProvider => {
  if (!instance && (!server || !port)) {
    throw new Error(
      "Server and port can't be null during notifier construction"
    );
  }
  if (!instance && server && port) {
    instance = new NotificationProvider(server, port);
  }
  return instance;
};

export default notifier;
