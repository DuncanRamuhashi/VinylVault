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
      query: ({ accessToken, ...data }) => ({
        url: `${import.meta.env.VITE_BACKENDURL}/api/album/create-album/${accessToken}`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getUserAlbums: builder.query<PaginatedAlbumResponse, { user: string; pagination: PaginationParams; accessToken: string }>({
      query: ({ user, pagination, accessToken }) => ({
        url: `${import.meta.env.VITE_BACKENDURL}/api/album/get-albums/${accessToken}/${user}`,
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