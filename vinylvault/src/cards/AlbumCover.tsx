import React from "react";
import vinylSrc from '../assets/vuma.png';

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
        className="absolute w-full h-full object-contain left-16 top-2 "
      />
      {/* Album Cover */}
      <img
        src={albumSrc}
        alt="Album Cover"
        className="relative w-[260px] h-full object-contain shadow-lg  z-10 -left-4"
      />
    </div>
  );
};

export default AlbumCover;
