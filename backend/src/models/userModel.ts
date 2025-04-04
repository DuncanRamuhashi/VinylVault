import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Interface for User
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  jwt_secret: string;
  refreshToken?: string;
  matchPassword(inputPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    jwt_secret: { type: String, required: true },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error instanceof Error ? error : new Error("Error hashing password"));
  }
});

// Password comparison method
userSchema.methods.matchPassword = async function (inputPassword: string): Promise<boolean> {
  return bcrypt.compare(inputPassword, this.password);
};

// Remove password from returned object
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.jwt_secret;
  return obj;
};

export default mongoose.model<IUser>("User", userSchema);
