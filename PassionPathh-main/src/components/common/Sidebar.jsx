import { useNavigate, NavLink } from 'react-router-dom';
import {
  Home,
  Search,
  TrendingUp,
  GraduationCap,
  Layers,
  Settings,
  BookOpen,
} from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, addNewGoal, archiveSession } = useAppStore();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Discover You', path: '/discover', icon: Search },
    {
      name: 'Path',
      path: `/path/${user?.currentPath || 'path_creative'}`,
      icon: Layers,
    },
    { name: 'Mentor', path: '/mentor', icon: GraduationCap },
    { name: 'Growth', path: '/growth', icon: TrendingUp },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 border-r border-on-background/10 bg-background fixed left-0 top-0 z-50 py-8">
      <div className="px-6 mb-12">
        <h1 className="font-headline italic text-2xl font-medium text-on-background">
          PassionPath
        </h1>
        <p className="font-label text-[10px] uppercase tracking-widest text-on-background/40 mt-1">
          {user.role || 'From confusion to clarity'}
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-3 px-6 py-3 transition-all duration-300
              ${
                isActive
                  ? 'text-primary-container font-bold border-l-2 border-primary-container bg-surface-container/30'
                  : 'text-on-background/60 hover:text-on-background hover:bg-surface-container/50 border-l-2 border-transparent'
              }
            `}
          >
            <item.icon size={18} />
            <span className="font-mono text-[11px] uppercase tracking-widest">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 space-y-4">
        <button
          onClick={addNewGoal}
          className="w-full py-3 archival-gradient text-white font-label text-[10px] uppercase tracking-widest rounded-sm shadow-sm active:opacity-80 active:scale-[0.99] transition-all"
        >
          New Entry
        </button>

        <div className="space-y-1 pt-4 border-t border-on-background/5">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center space-x-3 text-on-background/60 hover:text-on-background transition-colors py-2 text-[10px] font-mono uppercase tracking-widest w-full text-left"
          >
            <Settings size={14} />
            <span>Settings</span>
          </button>
          <button
            onClick={archiveSession}
            className="flex items-center space-x-3 text-on-background/60 hover:text-on-background transition-colors py-2 text-[10px] font-mono uppercase tracking-widest w-full text-left"
          >
            <BookOpen size={14} />
            <span>Archive</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
