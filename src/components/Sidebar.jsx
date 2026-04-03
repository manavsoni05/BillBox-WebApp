import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  BarChart3, 
  User, 
  Settings,
  X,
  LogOut
} from 'lucide-react';
import { logout } from '../services/authService';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Receipts', path: '/receipts', icon: Receipt },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-on-surface/20 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-surface transform transition-transform duration-300 ease-in-out border-r border-outline-variant/15
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-8">
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-primary to-primary-container rounded-xl flex items-center justify-center shadow-md">
                <Receipt className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-on-surface">BillBox</h1>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden text-on-surface-variant hover:text-on-surface transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-surface-container-highest text-primary shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                    <span className="font-medium">{item.name}</span>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="mt-auto border-t border-outline-variant/15 pt-8">
            <button 
              onClick={logout}
              className="flex items-center gap-4 px-4 py-3.5 w-full text-on-surface-variant hover:text-error transition-colors rounded-xl hover:bg-error/5 group"
            >
              <LogOut className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
