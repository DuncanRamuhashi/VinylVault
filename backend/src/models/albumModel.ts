import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./userModel"; // Import IUser interface
// Interface for Album
export interface IAlbum extends Document {
   _id: string;
  albumName: string;
  artistName: string;
  image: string;
  user: mongoose.Types.ObjectId | IUser; // Reference User
  createdAt: string;
  updatedAt: string;
}

// Define Album Schema
const albumSchema = new Schema<IAlbum>(
  {
    albumName: { type: String, required: true },
    artistName: { type: String, required: true },
    image: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference User
  },
  { timestamps: true }
);

// Middleware to format names before saving
albumSchema.pre<IAlbum>("save", function (next) {
  if (this.isModified("albumName")) {
    this.albumName = this.albumName
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  if (this.isModified("artistName")) {
    this.artistName = this.artistName
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  next();
});

// Export Album Model

export default  mongoose.model<IAlbum>("Album", albumSchema);
