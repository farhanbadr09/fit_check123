import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/mockApi';

export const fetchInvoices = createAsyncThunk(
  'billing/fetchInvoices',
  async (params = {}) => {
    const response = await api.getInvoices(params);
    return response;
  }
);

const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    invoices: [],
    meta: null,
    loading: false,
    error: null,
    filters: {
      search: '',
      status: 'all',
      page: 1,
      limit: 5,
    },
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = { search: '', status: 'all', page: 1, limit: 5 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, resetFilters } = billingSlice.actions;
export default billingSlice.reducer;
