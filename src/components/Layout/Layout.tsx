
import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Navbar with logo, search, user menu */}
      <Navbar onMobileMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Secondary navigation bar with main navigation items */}
      <TopNavigation />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main content area with proper spacing from both navbars */}
        <main className="flex-1 min-h-[calc(100vh-8rem)]">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
