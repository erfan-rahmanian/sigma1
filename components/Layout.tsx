
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { MenuIcon } from './icons';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar onLogout={onLogout} onLinkClick={() => {}} />
      </div>

      {/* Mobile sidebar & overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <div className={`md:hidden fixed inset-y-0 right-0 z-40 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <Sidebar onLogout={onLogout} onLinkClick={handleLinkClick} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center text-primary-maroon">
          <h1 className="text-xl font-bold">پورتال مشتریان</h1>
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
