declare global {
  declare module 'express' {
    import User from '../models/user';

    export interface Request {
      user?: User;
    }
  }
}
