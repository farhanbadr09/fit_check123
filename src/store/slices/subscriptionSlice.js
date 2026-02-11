import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/mockApi';

export const fetchSubscriptions = createAsyncThunk(
  'subscriptions/fetchSubscriptions',
  async () => {
    const response = await api.getSubscriptions();
    return response.data;
  }
);

const subscriptionSlice = createSlice({
  name: 'subscriptions',
  initialState: {
    subscriptions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default subscriptionSlice.reducer;
