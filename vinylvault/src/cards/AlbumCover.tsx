import React from "react";
import vinylSrc from '../assets/pexels-didsss-2032719.jpg';

interface AlbumCoverProps {
  albumSrc: string;
}

const AlbumCover: React.FC<AlbumCoverProps> = ({ albumSrc }) => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 group">
      {/* Vinyl Record */}
      <img
        src={vinylSrc}
        alt="Vinyl Record"
        className="absolute w-full h-full object-cover -left-4 top-2 transition-transform duration-700 ease-in-out group-hover:rotate-[20deg] group-hover:-translate-x-4 group-hover:scale-105"
      />
      {/* Album Cover */}
      <img
        src={albumSrc}
        alt="Album Cover"
        className="relative w-full h-full object-cover shadow-lg rounded-lg z-10"
      />
    </div>
  );
};

export default AlbumCover;
