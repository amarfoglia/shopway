import { Document } from 'mongoose';

interface User extends Document {
  name: string,
  email: string,
  photo: string,
  role: string,
  password: string,
  passwordConfirm: string,
  // eslint-disable-next-line no-unused-vars
  passwordMatch(candidatePassword: string, userPassword: string): Promise<boolean>,
}

export default User;
