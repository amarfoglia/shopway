import { HttpServer } from "@tsed/common";
import Role from "./models/role";
import { Server, Socket } from "socket.io";
interface StoreIds {
  storeIds: string[];
}
class NotificationProvider {
  private server: HttpServer;
  private port: string;
  private socketIo: Server;

  constructor(server: HttpServer, port: string) {
    this.server = server;
    this.port = port;
    this.socketIo = new Server(this.server, { cors: { origin: 'http://localhost:3000', credentials: true }});
    this.socketIo.on('connection', (socket: Socket) => {
      socket.handshake.query.role === Role.SELLER ? this.sellerListeners(socket) : this.customerListeners(socket);
    });
  }

  private customerListeners(socket: Socket) {
    console.log("customer");
    socket.on('joinFollowedStores', function (data: StoreIds) {
        data.storeIds.forEach((storeId:string) => {
          socket.join(storeId);
        });
    });
  }

  private sellerListeners(socket: Socket) {
    console.log("seller");
  }

  getSocket() { return this.socketIo; }
}
export default NotificationProvider;