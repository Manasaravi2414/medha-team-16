import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Layers, User, Plus } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const BottomNav = () => {
  const { user, addNewGoal } = useAppStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-md flex justify-around items-center h-16 z-50 px-6 border-t border-outline-variant/10">
      <NavLink 
        to="/" 
        className={({ isActive }) => `flex flex-col items-center flex-1 py-1 transition-colors ${isActive ? 'text-primary-container' : 'text-on-surface-variant'}`}
      >
        <Home size={20} />
        <span className="font-label text-[8px] uppercase tracking-tighter mt-1">Home</span>
      </NavLink>

      <NavLink 
        to="/discover" 
        className={({ isActive }) => `flex flex-col items-center flex-1 py-1 transition-colors ${isActive ? 'text-primary-container' : 'text-on-surface-variant'}`}
      >
        <Search size={20} />
        <span className="font-label text-[8px] uppercase tracking-tighter mt-1">Discover</span>
      </NavLink>

      <div className="flex items-center justify-center flex-1 -mt-10">
        <button 
          onClick={addNewGoal}
          className="w-12 h-12 archival-gradient rounded-full shadow-lg flex items-center justify-center text-white scale-110 active:scale-95 transition-transform duration-200"
        >
          <Plus size={24} />
        </button>
      </div>

      <NavLink 
        to={`/path/${user.currentPath || 'path_creative'}`} 
        className={({ isActive }) => `flex flex-col items-center flex-1 py-1 transition-colors ${isActive ? 'text-primary-container' : 'text-on-surface-variant'}`}
      >
        <Layers size={20} />
        <span className="font-label text-[8px] uppercase tracking-tighter mt-1">Path</span>
      </NavLink>

      <NavLink 
        to="/profile" 
        className={({ isActive }) => `flex flex-col items-center flex-1 py-1 transition-colors ${isActive ? 'text-primary-container' : 'text-on-surface-variant'}`}
      >
        <User size={20} />
        <span className="font-label text-[8px] uppercase tracking-tighter mt-1">Profile</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
