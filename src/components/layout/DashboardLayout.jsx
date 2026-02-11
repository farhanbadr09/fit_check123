import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-bg-main">
      {/* 
        The sidebar uses 'fixed' positioning. 
        We use a separate div or margin to ensure the main content 
        stays to the right of the sidebar on larger screens.
      */}
      <Sidebar />

      <main className="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-300">
        <div className="flex-1">
          <Outlet />
        </div>

        <footer className="px-8 py-10 text-center">
          <p className="text-[12px] text-gray-400 font-medium">
            © 2025 LookCheck. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default DashboardLayout;
