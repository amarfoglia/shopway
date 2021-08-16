import { Document } from 'mongoose';

interface User extends Document {
  name: string,
  email: string,
  photo: string,
  role: string,
  password: string,
  passwordConfirm: string,
}

export default User;
