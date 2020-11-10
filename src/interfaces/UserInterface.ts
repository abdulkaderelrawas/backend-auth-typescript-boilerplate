import mongoose from 'mongoose';

export default interface IUser extends mongoose.Document {
  matchPassword(password: string): Promise<boolean>;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
