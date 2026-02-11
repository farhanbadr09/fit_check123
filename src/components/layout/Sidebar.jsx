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
  Plus
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

  const handleClose = () => {
    dispatch(closeMobileSidebar());
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#111827] z-50 flex flex-col transition-transform duration-300
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-8">
          <Sparkles className="w-6 h-6 text-[#d946ef] fill-[#d946ef]" />
          <span className="text-white text-xl font-bold tracking-tight">LookCheck</span>
          <button onClick={handleClose} className="lg:hidden ml-auto text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                  ? 'active-nav-item'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-6 border-t border-white/5 mt-auto">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Current Plan</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-sm leading-tight">Advanced</p>
              <p className="text-gray-500 text-[11px]">10,000 requests</p>
            </div>
            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
