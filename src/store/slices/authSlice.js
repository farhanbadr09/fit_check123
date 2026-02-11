import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/mockApi';

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await api.getUser();
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    updateUserLocal(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateUserLocal } = authSlice.actions;
export default authSlice.reducer;
