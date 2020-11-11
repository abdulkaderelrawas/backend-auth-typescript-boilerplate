import mongoose from 'mongoose';
export default interface UserInterface extends mongoose.Document {
  matchPassword(password: string): Promise<boolean>;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
