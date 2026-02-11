import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserLocal } from '../store/slices/authSlice';
import {
  updateProfile,
  changePassword,
  regenerateApiKey,
  clearMessages,
} from '../store/slices/settingsSlice';
import Header from '../components/layout/Header';
import { User, Key, Lock, Eye, EyeOff, Copy, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { saving, changingPassword, regeneratingKey, successMessage, error } = useSelector(
    (state) => state.settings
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    dispatch(updateUserLocal(formData));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) return;
    dispatch(changePassword(passwordData));
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleRegenerateKey = () => {
    dispatch(regenerateApiKey()).then((action) => {
      if (action.payload?.apiKey) {
        dispatch(updateUserLocal({ apiKey: action.payload.apiKey }));
      }
    });
  };

  const handleCopyKey = () => {
    if (user?.apiKey) {
      navigator.clipboard.writeText(user.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    return key.substring(0, 12) + '••••••••••••••••••••';
  };

  return (
    <div>
      <Header title="Settings" subtitle="Manage your account settings and preferences" />

      <div className="p-4 sm:p-6 space-y-6">
        {(successMessage || error) && (
          <div
            className={`flex items-center gap-2 p-4 rounded-lg text-sm font-medium animate-fade-in
              ${successMessage ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}
          >
            {successMessage ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {successMessage || error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary">Profile Information</h2>
              <p className="text-sm text-text-secondary">Update your personal details</p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-accent hover:bg-accent/90 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary">API Key</h2>
              <p className="text-sm text-text-secondary">Manage your API access key</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1 flex items-center bg-bg-input border border-border rounded-lg px-4 py-2.5 w-full">
              <code className="text-sm text-text-primary flex-1 font-mono">
                {showApiKey ? user?.apiKey : maskApiKey(user?.apiKey)}
              </code>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4 text-text-muted" />
                ) : (
                  <Eye className="w-4 h-4 text-text-muted" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyKey}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-text-secondary font-medium rounded-lg transition-colors text-sm flex items-center gap-2"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleRegenerateKey}
                disabled={regeneratingKey}
                className="px-4 py-2.5 bg-danger hover:bg-danger/90 disabled:bg-gray-300 text-white font-medium rounded-lg transition-colors text-sm flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${regeneratingKey ? 'animate-spin' : ''}`} />
                Regenerate
              </button>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-3">
            Keep your API key secure. Do not share it in publicly accessible areas.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary">Change Password</h2>
              <p className="text-sm text-text-secondary">Update your account password</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
            {['current', 'new', 'confirm'].map((field) => {
              const label =
                field === 'current'
                  ? 'Current Password'
                  : field === 'new'
                  ? 'New Password'
                  : 'Confirm New Password';
              const key =
                field === 'current'
                  ? 'currentPassword'
                  : field === 'new'
                  ? 'newPassword'
                  : 'confirmPassword';

              return (
                <div key={field}>
                  <label className="block text-sm font-medium text-text-primary mb-1.5">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords[field] ? 'text' : 'password'}
                      value={passwordData[key]}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, [key]: e.target.value })
                      }
                      className="w-full bg-bg-input border border-border rounded-lg px-4 py-2.5 pr-10 text-sm text-text-primary outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPasswords[field] ? (
                        <EyeOff className="w-4 h-4 text-text-muted" />
                      ) : (
                        <Eye className="w-4 h-4 text-text-muted" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}

            {passwordData.newPassword &&
              passwordData.confirmPassword &&
              passwordData.newPassword !== passwordData.confirmPassword && (
                <p className="text-xs text-danger">Passwords do not match</p>
              )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={
                  changingPassword ||
                  !passwordData.currentPassword ||
                  !passwordData.newPassword ||
                  passwordData.newPassword !== passwordData.confirmPassword
                }
                className="px-6 py-2.5 bg-accent hover:bg-accent/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm"
              >
                {changingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
