
import React from 'react';
import { NavLink } from 'react-router-dom';
import type { NavLinkItem } from '../types';
import {
  DashboardIcon,
  PurchaseIcon,
  ListIcon,
  AccountIcon,
  MessageIcon,
  SettingsIcon,
  LogoutIcon,
} from './icons';

interface SidebarProps {
  onLogout: () => void;
  onLinkClick: () => void;
}

const navLinks: NavLinkItem[] = [
  { path: '/dashboard', name: 'داشبورد', icon: <DashboardIcon /> },
  { path: '/new-purchase', name: 'خرید', icon: <PurchaseIcon /> },
  { path: '/purchases-list', name: 'لیست خریدها', icon: <ListIcon /> },
  { path: '/account-statement', name: 'صورت حساب', icon: <AccountIcon /> },
  { path: '/messages', name: 'پیام‌رسان', icon: <MessageIcon /> },
  { path: '/settings', name: 'تنظیمات', icon: <SettingsIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ onLogout, onLinkClick }) => {
  return (
    <div className="w-64 bg-primary-maroon text-white flex flex-col h-screen shadow-lg">
      <div className="p-4 border-b border-white/10 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gray-200 mb-3 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-maroon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
        </div>
        <h2 className="font-bold text-lg">پورتال مشتریان</h2>
        <p className="text-sm text-gray-300">نام مشتری: مشتری نمونه 15</p>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-maroon-light shadow-inner'
                  : 'hover:bg-primary-maroon-light/50'
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => {
            onLinkClick();
            onLogout();
          }}
          className="w-full flex items-center px-4 py-3 rounded-md text-base font-medium hover:bg-primary-maroon-light/50 transition-colors duration-200"
        >
          <LogoutIcon />
          <span>خروج از سیستم</span>
        </button>
      </div>
       <div className="p-4 flex items-center justify-center border-t border-white/10">
         <div className="flex flex-col items-center">
            <div className="font-extrabold text-2xl tracking-wider">SIGMA</div>
            <div className="text-xs text-gray-400">تمام گستر ماندگار ( سیگما )</div>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
