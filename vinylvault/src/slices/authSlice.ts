import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
  email: string;
  name?: string; 
  accessToken?: string;
  refreshToken?: string;
  [key: string]: any;
}

interface AuthState {
  userInfo: UserInfo | null;
}

const getInitialUserInfo = (): UserInfo | null => {
  const userData = localStorage.getItem('user');
  if (!userData) return null;
  
  try {
    return JSON.parse(userData) as UserInfo;
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
    localStorage.removeItem('user');
    return null;
  }
};

const initialState: AuthState = {
  userInfo: getInitialUserInfo(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;