// albumsApiSlice.ts
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

export const albumsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAlbum: builder.mutation<AlbumResponse, { data: CreateAlbumRequest, accessToken: string }>({
      query: ({ data, accessToken }) => ({
        url: `${import.meta.env.VITE_BACKENDURL}/api/album/create-album/${accessToken}`,
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useCreateAlbumMutation } = albumsApiSlice;
