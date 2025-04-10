import { apiSlice } from './apiSlice';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  name?: string;
 
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (data) => ({
        url: `${import.meta.env.VITE_BACKENDURL}/api/auth/login`,
        method: 'POST',
        body: data,
       
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterCredentials>({
      query: (data) => ({
        url: `${import.meta.env.VITE_BACKENDURL}/api/auth/register`, 
        method: 'POST',
        body: data,
     
      
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = usersApiSlice;