import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/mockApi';

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async () => {
    const response = await api.getDashboardStats();
    return response.data;
  }
);

export const fetchDailyBreakdown = createAsyncThunk(
  'dashboard/fetchDailyBreakdown',
  async (period = '7d') => {
    const response = await api.getDailyBreakdown(period);
    return response.data;
  }
);

export const fetchRequestHistory = createAsyncThunk(
  'dashboard/fetchRequestHistory',
  async (params = {}) => {
    const response = await api.getRequestHistory(params);
    return response;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: null,
    dailyBreakdown: [],
    requestHistory: [],
    requestHistoryMeta: null,
    selectedPeriod: '7d',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedPeriod(state, action) {
      state.selectedPeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDailyBreakdown.fulfilled, (state, action) => {
        state.dailyBreakdown = action.payload;
      })
      .addCase(fetchRequestHistory.fulfilled, (state, action) => {
        state.requestHistory = action.payload.data;
        state.requestHistoryMeta = action.payload.meta;
      });
  },
});

export const { setSelectedPeriod } = dashboardSlice.actions;
export default dashboardSlice.reducer;
