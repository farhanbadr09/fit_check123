import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import billingReducer from './slices/billingSlice';
import generateReducer from './slices/generateSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import packageReducer from './slices/packageSlice';
import settingsReducer from './slices/settingsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    billing: billingReducer,
    generate: generateReducer,
    subscriptions: subscriptionReducer,
    packages: packageReducer,
    settings: settingsReducer,
    ui: uiReducer,
  },
});
