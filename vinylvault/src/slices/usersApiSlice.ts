import { apiSlice } from './apiSlice';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;

}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (data) => ({
        url: `${import.meta.env.VITE_BACKENDURL}/api/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;