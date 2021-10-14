declare global {
  declare module 'express' {
    import User from '../models/users/user';

    export interface Request {
      user?: User;
      file?: any;
    }
  }
}
