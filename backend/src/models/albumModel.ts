import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { request } from "http";

const albumSchema = new mongoose.Schema(

    {
        AlbumName:{
            type: String,
            required: true,

        },
        ArtistName:{
            type: String,
            required: true,

        },
        image: { type: String, required: true },

    },{timestamps: true}
);

// Middleware to format names before saving
albumSchema.pre("save", function (next) {
    if (this.isModified("AlbumName")) {
      this.AlbumName = this.AlbumName
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }
  
    if (this.isModified("ArtistName")) {
      this.ArtistName = this.ArtistName
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }
  
    next();
  });

  export default mongoose.model("Album", albumSchema);