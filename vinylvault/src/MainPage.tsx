import React, { useState, useEffect, use } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import AlbumCover from './cards/AlbumCover';
import { useGetUserAlbumsQuery } from './slices/albumsApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ClipLoader } from 'react-spinners';
// Define interfaces
interface Album {
  _id: string;
  albumName: string;
  artistName: string;
  image: string; // Base64 string or URL
}

interface UserInfo {
  email: string;
  name?: string;
  accessToken?: string;
  refreshToken?: string;
  _id?: string;
  [key: string]: any;
}

interface AuthState {
  auth: {
    userInfo: UserInfo | null;
  };
}
interface ApiErrorResponse {
  message?: string;
  [key: string]: any;
}

const MainPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const albumsPerPage = 2; // Match backend default limit
  const [pageLoading,setPageLoad] =  useState(true); 
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: AuthState) => state.auth);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!userInfo || !userInfo.accessToken || !userInfo._id) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const { 
    data, 
    error, 
    isLoading 
  } = useGetUserAlbumsQuery(
    {
      user: userInfo?._id || '', 
      pagination: {
        page: currentPage + 1, 
        limit: albumsPerPage,
      },
      accessToken: userInfo?.accessToken || '',
    }, 
    {
      skip: !userInfo?._id || !userInfo?.accessToken,
    }
  );
  
  // Then call setPageLoad(false) in a useEffect, once data has been fetched
  useEffect(() => {
    if (!isLoading && data) {
      setPageLoad(false);
    }
  }, [isLoading, data]);
  
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };



  const albums = data?.data?.albums || [];
  const totalPages = data?.data?.totalPages || 1;
  if (pageLoading) {   //loading thinggg
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <ClipLoader size={50} color="#F87171" />
      </div>
    );
  };
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-16">
      {/* Title Section */}
      <h1 className="md:text-3xl font-extrabold tracking-tight mb-10 text-center bg-clip-text text-gray-800">
        Your Favorite Collection
      </h1>

      {/* Albums Grid */}
      <div className="flex items-center justify-center flex-wrap gap-[60px] max-w-6xl">
        {isLoading ? (
          <p className="text-gray-600">Loading albums...</p>
        ) : error ? (
          <p className="text-red-600">
          Error loading albums: {error && 'status' in error 
            ? ((error as FetchBaseQueryError).data as ApiErrorResponse)?.message || 'Unknown error'
            : 'Network error'}
        </p>
        ) : albums.length > 0 ? (
          albums.map((album: Album) => (
            <div
              key={album._id}
              className="relative h-[400px] w-[300px] group p-5 bg-gray-100 backdrop-blur-sm shadow-lg border border-gray-700/50 transition-all duration-300 hover:scale-105"
            >
              <AlbumCover albumSrc={album.image} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h2 className="text-xl font-bold text-gray-500">{album.albumName}</h2>
                <p className="text-sm text-gray-300">{album.artistName}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No albums found. Start adding some!</p>
        )}
      </div>

      {/* Call-to-Action */}
      <p className="mt-16 md:text-xl font-medium text-gray-600 tracking-wide animate-pulse subtle-pulse">
        Store your best albums of all time!
      </p>

      {/* Pagination */}
      {totalPages > 1 && (
        <ReactPaginate
          previousLabel="← "
          nextLabel=" →"
          breakLabel="..."
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center space-x-2 mt-4"
          pageClassName="px-3 py-1 border rounded bg-gray-200"
          activeClassName="bg-blue-500 text-white"
          previousClassName="px-3 py-1 border rounded bg-gray-300"
          nextClassName="px-3 py-1 border rounded bg-gray-300"
          forcePage={currentPage}
        />
      )}
    </div>
  );
};

export default MainPage;