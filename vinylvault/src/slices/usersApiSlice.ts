import { apiSlice } from './apiSlice';

const USERS_URL = `${import.meta.env.VITE_BACKEND_URI}/api/auth/login`;

// Define types for the login request and response
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: USERS_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
