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
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar-bg z-50 flex flex-col transition-transform duration-300
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 border-r border-white/5`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-8 py-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d946ef] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-5 h-5 text-white fill-white/20" />
          </div>
          <span className="text-white text-2xl font-black tracking-tight">LookCheck</span>
          <button onClick={handleClose} className="lg:hidden ml-auto text-gray-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-4 space-y-1.5">
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
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all duration-200 ${isActive
                  ? 'active-nav-item'
                  : 'text-gray-500 hover:text-white hover:bg-sidebar-hover'
                  }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-white'}`} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-6 border-t border-white/5 mt-auto bg-white/5 backdrop-blur-sm m-4 rounded-2xl">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-3 opacity-60">Current Plan</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-black text-sm leading-tight">Advanced</p>
              <p className="text-gray-500 text-[11px] font-bold">10,000 requests</p>
            </div>
            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all group shadow-inner">
              <Plus className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </aside>

    </>
  );
};

export default Sidebar;
