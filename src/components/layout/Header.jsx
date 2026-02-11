import { useSelector, useDispatch } from 'react-redux';
import { Menu, Bell, Search, User, ChevronDown } from 'lucide-react';
import { toggleMobileSidebar } from '../../store/slices/uiSlice';

const Header = ({ title, subtitle }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-5 flex items-center justify-between sticky top-0 z-30 transition-all duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleMobileSidebar())}
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg text-slate-300 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{title}</h1>
          {subtitle && (
            <p className="text-sm text-slate-400 hidden sm:block mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden md:flex items-center bg-slate-800/50 rounded-full px-4 py-2.5 border border-white/5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300 w-64 lg:w-80">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search analytics..."
            className="bg-transparent text-sm outline-none w-full text-white placeholder:text-slate-500"
          />
        </div>

        <button className="relative p-2.5 hover:bg-white/5 rounded-full transition-all duration-300 group">
          <Bell className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full ring-2 ring-slate-900 animate-pulse" />
        </button>

        <div className="flex items-center gap-3 pl-3 sm:pl-6 border-l border-white/10">
          <div className="flex items-center gap-3 cursor-pointer group p-1.5 rounded-xl hover:bg-white/5 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/10 group-hover:ring-primary/50 transition-all">
              <span className="text-sm font-bold text-white tracking-wider">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors">{user?.name || 'User'}</p>
              <div className="flex items-center">
                <p className="text-xs text-slate-400">{user?.role || 'Administrator'}</p>
                <ChevronDown className="w-3 h-3 text-slate-500 ml-1 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
