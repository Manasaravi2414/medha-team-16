import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { PlayCircle, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';

const ModuleCard = ({ id, title, status, index, onComplete }) => {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  const handleCompleteClick = () => {
    onComplete(id, title);
  };

  return (
    <Card className={`flex items-center gap-6 transition-colors ${isActive ? 'border-primary shadow-sm bg-primary/5' : ''}`}>
      <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full font-headline text-lg ${isActive ? 'bg-primary text-white' : 'bg-surface-container-high'}`}>
        {index + 1}
      </div>
      
      <div className="flex-grow">
        <h4 className={`font-headline text-xl mb-1 ${isLocked ? 'text-on-surface-variant' : 'text-on-surface'}`}>
          {title}
        </h4>
        <div className="flex items-center gap-2">
          {isCompleted && <><CheckCircle2 size={14} className="text-primary-container" /> <span className="font-label text-[10px] uppercase tracking-widest opacity-60">Completed</span></>}
          {isActive && <><PlayCircle size={14} className="text-secondary" /> <span className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">In Progress</span></>}
          {isLocked && <><Lock size={14} className="text-on-surface-variant opacity-60" /> <span className="font-label text-[10px] uppercase tracking-widest opacity-60">Locked</span></>}
        </div>
      </div>

      <div className="flex-shrink-0 flex gap-2">
        {isActive && (
          <Button variant="primary" onClick={handleCompleteClick}>
            Complete Module
          </Button>
        )}
        {(isLocked || isCompleted) && (
          <Button 
            variant="outline" 
            disabled={isLocked || isCompleted}
          >
            {isCompleted ? 'Review' : 'Locked'}
          </Button>
        )}
      </div>
    </Card>
  );
};

const LearningPath = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { learning, user, startPath, completeModule, isLoading } = useAppStore();
  const [feedback, setFeedback] = useState(null);
  
  if (learning.paths.length === 0) return null;

  const activePath = learning.paths.find(p => p.id === id);

  if (!activePath) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center page-enter">
        <h2 className="font-headline text-3xl mb-4">Path Not Found</h2>
        <Button onClick={() => navigate('/discover')}>Browse Available Paths</Button>
      </div>
    );
  }

  const isCurrentPathActive = user.currentPath === activePath.id;
  const progressPercent = learning.progress[activePath.id] || 0;

  const handleStartPathClick = async () => {
    // initialize progress in store
    await startPath(activePath.id);
    setFeedback(`Path active! First module unlocked.`);
    setTimeout(() => setFeedback(null), 3000);
    // DO NOT navigate
  };

  const handleCompleteModuleClick = async (moduleId, title) => {
    // mark module complete -> unlock next -> update progress %
    await completeModule(activePath.id, moduleId, title);
    setFeedback(`Module Completed! Next module unlocked.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 page-enter relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-40 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Toast Feedback */}
      {feedback && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-primary text-white px-6 py-3 rounded-full font-label text-xs uppercase tracking-widest shadow-lg animate-in fade-in slide-in-from-top-4">
          {feedback}
        </div>
      )}

      <header className="mb-8">
        <button onClick={handleBackClick} className="flex items-center gap-2 text-on-surface-variant hover:text-primary mb-6 transition-colors font-label text-xs uppercase tracking-widest">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-2">
          Learning Roadmap
        </h1>
        <p className="font-body text-on-surface-variant text-lg">
          Track your progress through {activePath.title} modules.
        </p>
      </header>

      <Section>
        <Card className="border-l-4 border-l-primary mb-12 relative overflow-hidden">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-2 block">
                {isCurrentPathActive ? 'Active Trajectory' : 'Trajectory Preview'}
              </span>
              <h2 className="font-headline text-3xl mb-2">{activePath.title}</h2>
              <p className="font-body text-sm text-on-surface-variant max-w-lg mb-4">
                {activePath.desc}
              </p>
              {!isCurrentPathActive && (
                <Button variant="primary" onClick={handleStartPathClick}>
                  Start This Path
                </Button>
              )}
            </div>
            {isCurrentPathActive && (
              <div className="text-right">
                <span className="font-headline text-4xl">{progressPercent}%</span>
                <span className="block font-label text-[10px] uppercase tracking-widest opacity-60 mt-1">Completed</span>
              </div>
            )}
          </div>
          {isCurrentPathActive && <ProgressBar progress={progressPercent} />}
        </Card>
      </Section>

      <Section title="Course Modules" subtitle="Complete modules sequentially to unlock advanced material.">
        <div className={`space-y-4 ${!isCurrentPathActive ? 'opacity-50 pointer-events-none' : ''}`}>
          {activePath.modules.map((mod, idx) => (
            <ModuleCard 
              key={mod.id} 
              id={mod.id}
              title={mod.title}
              status={mod.status}
              index={idx}
              onComplete={handleCompleteModuleClick}
            />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default LearningPath;
