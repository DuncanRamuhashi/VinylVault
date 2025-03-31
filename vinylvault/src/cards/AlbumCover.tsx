import React from "react";
import vinylSrc from '../assets/pexels-didsss-2032719.jpg'
const AlbumCover= ({ albumSrc }) => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 group">
      {/* Vinyl Record */}
      <img
        src={vinylSrc}
        alt="Vinyl Record"
        className="absolute w-full h-full object-cover -left-4 top-2 transition-transform duration-500 ease-in-out group-hover:rotate-[15deg] group-hover:-translate-x-2"
      />
      {/* Album Cover */}
      <img
        src={albumSrc}
        alt="Album Cover"
        className="relative w-full h-full object-cover shadow-lg rounded-lg"
      />
    </div>
  );
};

export default AlbumCover;
