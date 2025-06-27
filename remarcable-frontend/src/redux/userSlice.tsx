import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User } from '../models/User';

interface UserState {
  user: User | null;
  token: string | null;
}

const getUserStateFromLocalStorage = (): UserState => {
  const user: User | null = JSON.parse(localStorage.getItem('user') || 'null');
  const token: string | null = localStorage.getItem('token') || null;

  if (user == null || token == null) return {user: null, token: null};
  return {user: user, token: token};
}

const setUserStateToLocalStorage = (user: User, token: string) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
}

const clearUserStateFromLocalStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

const initialState: UserState = getUserStateFromLocalStorage();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      setUserStateToLocalStorage(state.user, state.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      clearUserStateFromLocalStorage();
    },
  },
});

export const { login, logout} = userSlice.actions;
export default userSlice.reducer;