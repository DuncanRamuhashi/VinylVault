import { apiSlice } from './apiSlice';

interface CreateAlbumRequest {
  artistName: string;
  albumName: string;
  image: string; // Base64 string
  user: string;
}

interface AlbumResponse {
  _id: string;
  albumName: string;
  artistName: string;
  image: string; // Base64 string or URL, depending on backend
  user: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationParams {
  page: number;
  limit: number;
}

interface PaginatedAlbumData {
  albums: AlbumResponse[];
  total: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface PaginatedAlbumResponse {
  success: boolean;
  data: PaginatedAlbumData;
}

export const albumsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAlbum: builder.mutation<AlbumResponse, { data: CreateAlbumRequest, accessToken: string }>({
      query: ({ data, accessToken }) => ({
        url: `${import.meta.env.VITE_BACKENDURL}/api/album/create-album/${accessToken}`, // Token in URL
        method: 'POST',
        body: data, // Sends { artistName, albumName, image, user } directly
      }),
    }),
    getUserAlbums: builder.query<PaginatedAlbumResponse, { user: string; pagination: PaginationParams; accessToken: string }>({
      query: ({ user, pagination, accessToken }) => ({
        url: `${import.meta.env.VITE_BACKENDURL}/api/album/get-albums/${accessToken}/${user}`, // Token in URL
        method: 'GET',
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      }),
    }),
  }),
});

export const { useCreateAlbumMutation, useGetUserAlbumsQuery } = albumsApiSlice;