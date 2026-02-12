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
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40 lg:hidden transition-opacity duration-500 ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleClose}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar-bg z-50 flex flex-col transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 border-r border-white-[0.02] shadow-2xl shadow-black/50 overflow-hidden`}
      >
        {/* Decorative Background Glows */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[20%] w-[150%] h-[40%] bg-primary/10 blur-[120px] rounded-full rotate-12" />
          <div className="absolute top-[60%] -right-[20%] w-[100%] h-[30%] bg-secondary/5 blur-[100px] rounded-full -rotate-12" />
        </div>

        {/* Brand */}
        <div className="relative flex items-center gap-3 px-8 py-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#d946ef] to-[#7c3aed] blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#d946ef] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-primary/20 transition-transform duration-500 group-hover:scale-110">
              <Sparkles className="w-5 h-5 text-white fill-white/20" />
            </div>
          </div>
          <span className="text-white text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">LookCheck</span>
          <button onClick={handleClose} className="lg:hidden ml-auto p-2 text-gray-500 hover:text-white transition-all bg-white/5 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="relative flex-1 px-4 space-y-2">
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
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[13px] font-bold transition-all duration-300 group ${isActive
                  ? 'active-nav-item'
                  : 'text-gray-400/80 hover:text-white hover:bg-white/[0.03]'
                  }`}
              >
                <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:translate-x-1'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary-light'}`} />
                </div>
                <span className="relative z-10">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="relative p-6 mt-auto">
          <div className="sidebar-plan-card p-5 border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-md rounded-[24px] group hover:from-white/[0.12] transition-all duration-500">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] opacity-80">Current Plan</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-black text-base leading-tight">Advanced</p>
                <p className="text-gray-500 text-[11px] font-bold mt-1">10,000 requests</p>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-primary hover:shadow-lg hover:shadow-primary/40 transition-all group/plus active:scale-95 shadow-inner border border-white/5">
                <Plus className="w-5 h-5 text-white group-hover/plus:rotate-90 transition-transform duration-500" />
              </div>
            </div>

            {/* Progress Bar Mini */}
            <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-secondary to-primary rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
            </div>
          </div>
        </div>
      </aside>

    </>
  );
};

export default Sidebar;
