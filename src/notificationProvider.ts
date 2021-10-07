import { Server, Socket } from 'socket.io';
import Role from './models/role';
import { HttpServer } from '@tsed/common';

interface StoreIds {
  storeIds: string[];
}

const addCustomerListeners = (socket: Socket) => {
  console.log('customer connected!');
  socket.on('joinFollowedStores', (data: StoreIds) => data.storeIds.forEach((id) => socket.join(id)));
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
    this.socketIo = new Server(this.server, { cors: { origin: 'http://localhost:3000', credentials: true } });
    this.socketIo.on('connection', (socket: Socket) => (socket.handshake.query.role === Role.SELLER
      ? addSellerListeners(socket) : addCustomerListeners(socket)));
  }

  emit = (code: Code, data?: Object, room?: string | string[]) => (room
    ? this.socketIo.to(room).emit(code, data) : this.socketIo.emit(code, data));

  // getSocket() { return this.socketIo; }
}

let instance: NotificationProvider;

const notifier = (server?: HttpServer, port?: string): NotificationProvider => {
  if (!instance && (!server || !port)) throw new Error("Server and port can't be null during notifier construction");
  if (!instance && server && port) instance = new NotificationProvider(server, port);
  return instance;
};

export default notifier;
