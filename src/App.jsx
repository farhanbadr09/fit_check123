import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser } from './store/slices/authSlice';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import GeneratePage from './pages/GeneratePage';
import BillingPage from './pages/BillingPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import PackagesPage from './pages/PackagesPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
