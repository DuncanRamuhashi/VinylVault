import React, { useState } from 'react';
import AlbumCover from './cards/AlbumCover';
import art from './assets/qqq.jpg';
 import ReactPaginate from 'react-paginate';
const albums = [
  { id: 1, title: "Midnight Vibes", artist: "DJ Shadow", cover: art },
  { id: 2, title: "Neon Dreams", artist: "Synth Lord", cover: art },
  { id: 3, title: "Lost Frequencies", artist: "Deep Waves", cover: art },
  { id: 4, title: "Retro Groove", artist: "Vinyl Master", cover: art },
];

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (event:any) => {
    setCurrentPage(event.selected);
  };
  return (
    <div className="flex flex-col items-center  min-h-screen px-6 py-16">
      {/* Title Section */}
      <h1 className="text-3xl font-extrabold tracking-tight mb-10 text-center bg-clip-text text-gray-800">
        Your Favorite Collection 
      </h1>
         
      {/* Albums Grid */}
      <div className="flex  flex-wrap gap-[60px] max-w-6xl">
        {albums.map((album) => (
          <div
            key={album.id}
            className="relative h-[400px] w-[300px] group p-5 bg-gray-100 backdrop-blur-sm shadow-lg border border-gray-700/50 transition-all duration-300 hover:scale-105 "
          >
            <AlbumCover albumSrc={album.cover} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pb-2  opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-xl font-bold text-gray-500">{album.title}</h2>
              <p className="text-sm text-gray-300">{album.artist}</p>
            </div>
          </div>

        ))}
      </div>

      {/* Call-to-Action */}
      <p className="mt-16 text-xl font-medium text-gray-600 tracking-wide animate-pulse subtle-pulse">
        Store your best albums of all time! 
      </p>

      {/* Pagination*/}
        <ReactPaginate
                previousLabel={"← "}
                nextLabel={" →"}
                breakLabel={"..."}
                pageCount={10} 
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-center space-x-2 mt-4"}
                pageClassName={"px-3 py-1 border rounded bg-gray-200"}
                activeClassName={"bg-blue-500 text-white"}
                previousClassName={"px-3 py-1 border rounded bg-gray-300"}
                nextClassName={"px-3 py-1 border rounded bg-gray-300"}
        />
    </div>
  );
};

export default MainPage;