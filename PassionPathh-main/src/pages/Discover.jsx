import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Search, Database, Layout, Users, Briefcase, Filter, Music, Palette, Trophy, Swords, Lock, UserCheck } from 'lucide-react';
import { mockDiscoverTasks } from '../data/mockDiscoverTasks';
import { searchAll } from '../services/searchService';

const CareerCard = ({ id, title, desc, iconName, category, careers, tags, onExplore, onSelect, isCurrent }) => {
  const getIcon = () => {
    switch(iconName) {
      case 'database': return <Database size={24} className="text-secondary" />;
      case 'layout': return <Layout size={24} className="text-primary" />;
      case 'users': return <Users size={24} className="text-tertiary" />;
      case 'music': return <Music size={24} className="text-primary" />;
      case 'palette': return <Palette size={24} className="text-secondary" />;
      case 'trophy': return <Trophy size={24} className="text-primary-container" />;
      case 'swords': return <Swords size={24} className="text-tertiary" />;
      default: return <Briefcase size={24} className="text-on-surface-variant" />;
    }
  };

  return (
    <Card className={`flex flex-col h-full justify-between gap-6 relative overflow-hidden transition-all ${isCurrent ? 'border-primary shadow-sm bg-primary/5' : ''}`}>
      {isCurrent && (
        <div className="absolute top-0 right-0 bg-primary px-3 py-1 font-label text-[8px] uppercase tracking-widest text-white rounded-bl-lg font-bold">
          Active Trajectory
        </div>
      )}
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-surface-container-highest rounded-lg">
            {getIcon()}
          </div>
          <span className="font-label text-[10px] uppercase tracking-widest bg-surface-container-high px-2 py-1 rounded-sm">
            {category.replace('cat_', '').toUpperCase()}
          </span>
        </div>
        <h3 className="font-headline text-2xl mb-2">{title}</h3>
        <p className="font-body text-sm text-on-surface-variant leading-relaxed">
          {desc}
        </p>

        {careers && careers.length > 0 && (
          <div className="mt-4">
            <span className="font-label text-[10px] uppercase text-on-surface-variant/70 mb-2 block tracking-wider">Example Outcomes</span>
            <div className="flex flex-wrap gap-2">
              {careers.map((c, i) => (
                <span key={i} className="text-xs bg-surface-container-high px-2 py-1 rounded-md text-on-surface-variant">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button 
          variant={isCurrent ? 'outline' : 'primary'} 
          className="flex-[2]"
          onClick={() => onSelect(id)}
          disabled={isCurrent}
        >
          {isCurrent ? 'Selected' : 'Add to My Path'}
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => onExplore(id)}>
          Explore
        </Button>
      </div>
    </Card>
  );
};

const MentorCard = ({ mentor, isUnlocked, onClick }) => (
  <Card 
    className={`group relative overflow-hidden transition-all cursor-pointer border-l-4 ${isUnlocked ? 'border-l-primary hover:border-primary/50' : 'border-l-outline-variant/30 grayscale opacity-60'}`}
    onClick={() => onClick(mentor.id)}
  >
    {!isUnlocked && (
      <div className="absolute top-2 right-2 p-1 bg-surface-container rounded-full z-10">
        <Lock size={12} className="text-on-surface-variant" />
      </div>
    )}
    <div className="flex gap-4 items-start">
      <div className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden flex items-center justify-center ${isUnlocked ? 'bg-primary/5 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
        {mentor.avatar ? (
          <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
        ) : (
          <Users size={20} />
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-headline text-lg">{mentor.name}</h4>
          {isUnlocked && <UserCheck size={14} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />}
        </div>
        <span className="font-label text-[10px] uppercase tracking-widest text-primary mb-2 block font-bold">
          {mentor.domain}
        </span>
        <p className="font-body text-xs text-on-surface-variant line-clamp-2 mb-3">
          {mentor.desc}
        </p>
        <div className="flex flex-wrap gap-1">
          {mentor.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[9px] bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </Card>
);

const Discover = () => {
  const navigate = useNavigate();
  const { user, setCurrentPath, isLoading, mentorAccess, showToast } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('cat_all');

  const categories = mockDiscoverTasks.categories || [];

  const results = useMemo(() => {
    const all = searchAll(searchQuery, user.interests);
    
    // Mix category filter with search
    const filteredPaths = all.paths.filter(p => activeCategory === 'cat_all' || p.category === activeCategory);
    const filteredMentors = all.mentors.filter(m => activeCategory === 'cat_all' || m.domain.toLowerCase() === activeCategory.replace('cat_', '').toLowerCase());

    return { paths: filteredPaths, mentors: filteredMentors };
  }, [searchQuery, activeCategory, user.interests]);

  const handleAddPathClick = async (pathId) => {
    const normalizedPathId = pathId.replace('car_', 'path_');
    await setCurrentPath(normalizedPathId);
    showToast(`Path activated: ${normalizedPathId.replace('path_', '').replace('_', ' ')}`, "success");
  };

  const handleExploreClick = (pathId) => {
    const normalizedPathId = pathId.replace('car_', 'path_');
    setCurrentPath(normalizedPathId); 
    navigate(`/path/${normalizedPathId}`);
  };

  const handleMentorClick = (mentorId) => {
    if (mentorAccess.isUnlocked) {
      navigate('/mentor', { state: { selectedMentorId: mentorId } });
    } else {
      showToast("Complete more progress to unlock real mentors!", "info");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 page-enter relative pb-20">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-40 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      <header className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-2">
          Discover
        </h1>
        <p className="font-body text-on-surface-variant text-lg">
          Activate specialized learning trajectories or connect with industry mentors.
        </p>
      </header>

      {/* Search and Filters */}
      <div className="sticky top-[72px] z-30 bg-background/95 backdrop-blur-md pt-4 pb-4">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2">
            <Input 
              icon={Search}
              placeholder="Search pathways, mentors, or skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-1/2 flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <Button 
                key={cat.id}
                variant={activeCategory === cat.id ? 'primary' : 'outline'}
                onClick={() => setActiveCategory(cat.id)}
                className="whitespace-nowrap flex-shrink-0"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section: Paths */}
      <Section title={`Available Pathways (${results.paths.length})`}>
        {results.paths.length === 0 ? (
          <div className="text-center py-10 bg-surface-container-low rounded-xl border border-outline-variant/10 opacity-50">
            <p className="text-on-surface-variant text-sm font-body">No pathways match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.paths.map(career => (
              <CareerCard 
                key={career.id}
                {...career}
                onSelect={handleAddPathClick}
                onExplore={handleExploreClick}
                isCurrent={user.currentPath === career.id.replace('car_', 'path_')}
              />
            ))}
          </div>
        )}
      </Section>

      {/* Results Section: Mentors */}
      <Section title={`Real Mentors (${results.mentors.length})`}>
        {results.mentors.length === 0 ? (
          <div className="text-center py-10 bg-surface-container-low rounded-xl border border-outline-variant/10 opacity-50">
            <p className="text-on-surface-variant text-sm font-body">No mentors match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.mentors.map(m => (
              <MentorCard 
                key={m.id}
                mentor={m}
                isUnlocked={mentorAccess.isUnlocked}
                onClick={handleMentorClick}
              />
            ))}
          </div>
        )}
      </Section>
    </div>
  );
};

export default Discover;
