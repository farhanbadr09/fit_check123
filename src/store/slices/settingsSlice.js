import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/mockApi';

export const updateProfile = createAsyncThunk(
  'settings/updateProfile',
  async (updates) => {
    const response = await api.updateUser(updates);
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  'settings/changePassword',
  async (passwordData) => {
    const response = await api.changePassword(passwordData);
    return response.data;
  }
);

export const regenerateApiKey = createAsyncThunk(
  'settings/regenerateApiKey',
  async () => {
    const response = await api.regenerateApiKey();
    return response.data;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    saving: false,
    changingPassword: false,
    regeneratingKey: false,
    successMessage: null,
    error: null,
  },
  reducers: {
    clearMessages(state) {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.saving = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.saving = false;
        state.successMessage = 'Profile updated successfully!';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.saving = false;
        state.error = action.error.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.changingPassword = true;
        state.successMessage = null;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changingPassword = false;
        state.successMessage = 'Password changed successfully!';
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changingPassword = false;
        state.error = action.error.message;
      })
      .addCase(regenerateApiKey.pending, (state) => {
        state.regeneratingKey = true;
      })
      .addCase(regenerateApiKey.fulfilled, (state) => {
        state.regeneratingKey = false;
        state.successMessage = 'API key regenerated successfully!';
      })
      .addCase(regenerateApiKey.rejected, (state, action) => {
        state.regeneratingKey = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMessages } = settingsSlice.actions;
export default settingsSlice.reducer;
