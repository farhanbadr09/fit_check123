import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/mockApi';

export const generateLook = createAsyncThunk(
  'generate/generateLook',
  async ({ clothImage, modelImage }) => {
    const response = await api.generateLook(clothImage, modelImage);
    return response.data;
  }
);

export const fetchRecentTryOns = createAsyncThunk(
  'generate/fetchRecentTryOns',
  async () => {
    const response = await api.getRecentTryOns();
    return response.data;
  }
);

const generateSlice = createSlice({
  name: 'generate',
  initialState: {
    clothImage: null,
    modelImage: null,
    result: null,
    recentTryOns: [],
    generating: false,
    loading: false,
    error: null,
  },
  reducers: {
    setClothImage(state, action) {
      state.clothImage = action.payload;
    },
    setModelImage(state, action) {
      state.modelImage = action.payload;
    },
    clearResult(state) {
      state.result = null;
    },
    clearImages(state) {
      state.clothImage = null;
      state.modelImage = null;
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateLook.pending, (state) => {
        state.generating = true;
        state.error = null;
        state.result = null;
      })
      .addCase(generateLook.fulfilled, (state, action) => {
        state.generating = false;
        state.result = action.payload;
      })
      .addCase(generateLook.rejected, (state, action) => {
        state.generating = false;
        state.error = action.error.message;
      })
      .addCase(fetchRecentTryOns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecentTryOns.fulfilled, (state, action) => {
        state.loading = false;
        state.recentTryOns = action.payload;
      });
  },
});

export const { setClothImage, setModelImage, clearResult, clearImages } = generateSlice.actions;
export default generateSlice.reducer;
