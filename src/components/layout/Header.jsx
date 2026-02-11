import { useSelector, useDispatch } from 'react-redux';
import { Menu, Bell, Search, User } from 'lucide-react';
import { toggleMobileSidebar } from '../../store/slices/uiSlice';

const Header = ({ title, subtitle }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="bg-white border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleMobileSidebar())}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-5 h-5 text-text-secondary" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-text-primary">{title}</h1>
          {subtitle && (
            <p className="text-sm text-text-secondary hidden sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center bg-bg-input rounded-lg px-3 py-2 border border-border">
          <Search className="w-4 h-4 text-text-muted mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none w-40 lg:w-56 text-text-primary placeholder:text-text-muted"
          />
        </div>

        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-border">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-text-primary">{user?.name || 'User'}</p>
            <p className="text-xs text-text-muted">{user?.role || 'Admin'}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
