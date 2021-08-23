import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

// Catch synchronous exception produced outside the express scope
process.on('uncaughtException', (err:Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/../config.env` });

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

const server = app.listen(port, () => console.log(`App running on port ${port}...`));

/* Catch Promise rejection (asyncronous exception) produced outside
   the express scope (es. database connection failure) */
process.on('unhandledRejection', (err:Error) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(process.exit(1)); // gracefuly shutdown
});
