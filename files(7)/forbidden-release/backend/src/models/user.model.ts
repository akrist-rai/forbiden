import { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
  githubId: string;    // kept as generic userId field name
  login: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    githubId:  { type: String, required: true, unique: true },
    login:     { type: String, required: true },
    name:      String,
    email:     String,
    avatarUrl: String,
  },
  { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);
