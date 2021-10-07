import mongoose from 'mongoose';
import http from 'http';
import app from './app';
import NotificationProvider from './notificationProvider';
// Catch synchronous exception produced outside the express scope
process.on('uncaughtException', (err:Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE || 'invalid-db-path';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => console.log(`App running on port ${port}...`));
const notificationProvider = new NotificationProvider(server, port.toString());
process.on('unhandledRejection', (err:Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(process.exit(1)); // gracefully shutdown
});
export {notificationProvider}