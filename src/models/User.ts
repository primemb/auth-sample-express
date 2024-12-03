import { Schema, model } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default model<IUser>("User", UserSchema);
