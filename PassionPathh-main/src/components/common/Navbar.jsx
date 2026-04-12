import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, History } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, showToast } = useAppStore();

  const handleDashboardClick = () => navigate('/');
  const handleLogsClick = () => navigate('/growth');
  const handleLibraryClick = () => navigate('/discover');
  const handleNotificationsClick = () =>
    showToast('Opening Archival Notifications...', 'info');
  const handleHistoryClick = () =>
    showToast('Retrieving Temporal Access Logs...', 'info');

  return (
    <header className="flex justify-between items-center w-full h-16 mb-12 md:mb-20">
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-sm overflow-hidden border border-outline-variant/20 shadow-sm cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => navigate('/profile')}
        >
          {user?.avatar ? (
            <img
              alt={user.name}
              className="w-full h-full object-cover"
              src={user.avatar}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-surface-container text-on-surface-variant font-bold text-sm">${
                  user.name?.charAt(0) ?? '?'
                }</div>`;
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-container text-on-surface-variant font-bold text-sm">
              {user?.name?.charAt(0) ?? '?'}
            </div>
          )}
        </div>

        <div className="hidden sm:block">
          <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant leading-none mb-1">
            {user?.role}
          </p>
          <p className="font-headline italic text-lg leading-tight">
            {user?.name}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden lg:flex items-center space-x-8 mr-8">
          <button
            onClick={handleDashboardClick}
            className="font-label text-[10px] tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary transition-all py-1"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogsClick}
            className="font-label text-[10px] tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary transition-all py-1"
          >
            Logs
          </button>
          <button
            onClick={handleLibraryClick}
            className="font-label text-[10px] tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary transition-all py-1"
          >
            Library
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleNotificationsClick}
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            <Bell size={20} />
          </button>
          <button
            onClick={handleHistoryClick}
            className="text-on-surface-variant hover:text-primary transition-colors duration-200"
          >
            <History size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
