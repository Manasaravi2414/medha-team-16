import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import BottomNav from '../components/common/BottomNav';
import Navbar from '../components/common/Navbar';
import useAppStore from '../store/useAppStore';
import NewEntryModal from '../components/common/NewEntryModal';

const MainLayout = () => {
  const { toast } = useAppStore();

  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      {/* Global Toast */}
      {toast.visible && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-sm font-label text-[10px] uppercase tracking-widest shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300 border border-white/10 ${
          toast.type === 'success' ? 'bg-primary text-white' : 
          toast.type === 'error' ? 'bg-red-900 text-white' : 
          'bg-surface-container-highest text-on-surface'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen p-6 md:p-12 lg:p-20 overflow-x-hidden pb-24 md:pb-12">
        <Navbar />
        
        {/* Page Content */}
        <div className="page-enter">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Modals */}
      <NewEntryModal />
    </div>
  );
};

export default MainLayout;
