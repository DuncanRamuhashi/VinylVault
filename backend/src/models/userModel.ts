import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, 
    },
    password: {
      type: String,
      required: true,
    },
    jwt_secret: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Hashing the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Ensure the middleware continues after hashing
  } catch (error) {
    next(error instanceof Error ? error : new Error("Unknown error in hashing password"));
  }
});

// Comparing passwords
userSchema.methods.matchPassword = async function (inputPassword: string) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Remove password from the returned object
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
