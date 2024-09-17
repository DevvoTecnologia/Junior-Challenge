import { Schema, model } from "mongoose";

export type User = {
  email: string;
  password: string;
};

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, optimisticConcurrency: true }
);

const UserModel = model("User", userSchema);

export default UserModel;
