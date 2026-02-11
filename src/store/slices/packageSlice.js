import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/mockApi';

export const fetchPackages = createAsyncThunk(
  'packages/fetchPackages',
  async () => {
    const response = await api.getPackages();
    return response.data;
  }
);

const packageSlice = createSlice({
  name: 'packages',
  initialState: {
    packages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default packageSlice.reducer;
