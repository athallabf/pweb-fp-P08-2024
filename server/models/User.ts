import { Schema, model, Document } from 'mongoose';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface IUser extends Document {
  username: string;
  password: string;
  role: Role;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: Role, required: true },
});

const User = model<IUser>('User', UserSchema);

export default User;
