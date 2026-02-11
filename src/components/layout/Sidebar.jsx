import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Sparkles,
  Package,
  Settings,
  X,
  Crown,
} from 'lucide-react';
import { closeMobileSidebar } from '../../store/slices/uiSlice';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { path: '/billing', label: 'Billing & Invoices', icon: FileText },
  { path: '/generate', label: 'Generate', icon: Sparkles },
  { path: '/packages', label: 'Packages', icon: Package },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { mobileSidebarOpen } = useSelector((state) => state.ui);
  const user = useSelector((state) => state.auth.user);

  const handleClose = () => {
    dispatch(closeMobileSidebar());
  };

  return (
    <>
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={handleClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-sidebar z-50 flex flex-col transition-transform duration-300 w-64
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-bold">
              Look<span className="text-secondary">Check</span>
            </span>
          </div>
          <button
            onClick={handleClose}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'bg-sidebar-active text-white shadow-lg shadow-primary/25'
                      : 'text-white/60 hover:text-white hover:bg-sidebar-hover'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 pb-5">
          <div className="bg-sidebar-hover rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-4 h-4 text-accent" />
              <span className="text-white text-sm font-semibold">Current Plan</span>
            </div>
            <p className="text-secondary font-bold text-lg">{user?.plan || 'Advanced'}</p>
            <p className="text-white/40 text-xs mt-1">
              {user?.planExpiry
                ? `Expires: ${new Date(user.planExpiry).toLocaleDateString()}`
                : 'Active subscription'}
            </p>
            <NavLink
              to="/packages"
              className="mt-3 block text-center bg-primary hover:bg-primary-dark text-white text-xs font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Upgrade Plan
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
