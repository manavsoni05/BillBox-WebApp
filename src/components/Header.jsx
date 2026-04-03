import React from 'react';
import { Menu, Bell, Search, User, LogOut } from 'lucide-react';
import useUserStore from '../store/userStore';
import { logout } from '../services/authService';

const Header = ({ toggleSidebar, title }) => {
  const { user } = useUserStore();

  return (
    <header className="sticky top-0 z-30 h-20 bg-surface/80 backdrop-blur-3xl border-b border-outline-variant/15 px-6 sm:px-12 flex items-center justify-between">
      {/* Search Bar / Menu Button */}
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-surface-container transition-colors"
        >
          <Menu size={24} />
        </button>
        
        <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2.5 rounded-2xl border border-outline-variant/10 focus-within:ring-2 focus-within:ring-primary/20 transition-all group lg:min-w-96">
          <Search size={20} className="text-on-surface-variant group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search transactions, vendors..." 
            className="bg-transparent border-none focus:ring-0 placeholder-on-surface-variant/50 text-on-surface text-sm w-full ml-3"
          />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4 sm:gap-8">
        <button className="relative p-2 text-on-surface-variant hover:text-on-surface transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface shadow-sm" />
        </button>

        <div className="flex items-center gap-4 group cursor-pointer border-l border-outline-variant/15 pl-4 sm:pl-8">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-on-surface truncate max-w-40 leading-none mb-1">
              {user?.displayName || 'Welcome Back'}
            </p>
            <p className="text-xs text-on-surface-variant/80 font-medium">Standard Plan</p>
          </div>
          <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                <User size={24} className="text-primary" />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
