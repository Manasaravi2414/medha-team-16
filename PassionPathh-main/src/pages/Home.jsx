import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, BookOpen, Target, CheckCircle2 } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import PsychometricTest from '../components/psychometric/PsychometricTest';

const Home = () => {
  const navigate = useNavigate();
  const { user, learning, dashboard, setCurrentPath, addNewGoal } = useAppStore();
  
  if (!user || learning.paths.length === 0) return null;

  const activePath = learning.paths.find(p => p.id === user.currentPath) || learning.paths[0];
  const progressPercent = learning.progress[activePath.id] || 0;

  const handleStatClick = () => {
    navigate('/growth');
  };

  const handleContinueLearningClick = () => {
    navigate(`/path/${activePath.id}`);
  };

  const handleViewAllPathsClick = () => {
    navigate('/discover');
  };

  const handleRecommendationClick = (pathId) => {
    setCurrentPath(pathId);
    navigate(`/path/${pathId}`);
  };

  const handleNewGoalClick = () => {
    addNewGoal();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 page-enter">
      {/* Header */}
      <header className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-2">
          Welcome back, {user.name}
        </h1>
        <p className="font-body text-on-surface-variant text-lg">
          Here is your progress overview and active trajectory.
        </p>
      </header>

      {/* Progress Overview */}
      <Section title="Progress Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hoverable className="cursor-pointer active:scale-95 transition-transform" onClick={handleStatClick}>
            <div className="flex items-center gap-3 mb-2">
              <Target className="text-primary" size={20} />
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">Clarity</span>
            </div>
            <p className="font-headline text-3xl">{dashboard.stats.clarityScore}/100</p>
          </Card>
          <Card hoverable className="cursor-pointer active:scale-95 transition-transform" onClick={handleStatClick}>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-secondary" size={20} />
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">Skills</span>
            </div>
            <p className="font-headline text-3xl">{user.skills.length} Active</p>
          </Card>
          <Card hoverable className="cursor-pointer active:scale-95 transition-transform" onClick={handleStatClick}>
            <div className="flex items-center gap-3 mb-2">
              <Play className="text-tertiary" size={20} />
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">Momentum</span>
            </div>
            <p className="font-headline text-3xl">{dashboard.stats.momentum}%</p>
          </Card>
          <Card hoverable className="cursor-pointer active:scale-95 transition-transform" onClick={handleStatClick}>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="text-primary-container" size={20} />
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant opacity-60">Goals</span>
            </div>
            <p className="font-headline text-3xl">{dashboard.stats.goalsMet} / {dashboard.stats.totalGoals}</p>
          </Card>
        </div>
      </Section>

      {/* Psychometric Interest Discovery */}
      <Section title="Interest Intelligence">
        <PsychometricTest />
      </Section>

      {/* Active Learning Path */}
      <Section title="Active Path">
        <Card className="border-l-4 border-l-primary">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-2 block">
                Current Focus
              </span>
              <h3 className="font-headline text-2xl mb-2">{activePath.title}</h3>
              <p className="font-body text-sm text-on-surface-variant max-w-xl">
                {activePath.desc}
              </p>
            </div>
            <Button variant="primary" onClick={handleContinueLearningClick}>
              Continue Path
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center font-label text-[10px] uppercase tracking-widest">
              <span>Overall Progress</span>
              <span className="font-bold">{progressPercent}%</span>
            </div>
            <ProgressBar progress={progressPercent} />
          </div>
        </Card>
      </Section>

      {/* Quick Actions & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Section title="Suggested For You">
          <div className="space-y-4">
            {dashboard.recommendations.map(rec => (
              <Card key={rec.id} className="flex justify-between items-center group cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => handleRecommendationClick(rec.id)}
              >
                <div>
                  <h4 className="font-headline text-lg mb-1">{rec.title}</h4>
                  <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant opacity-60">
                    Recommended Path
                  </span>
                </div>
                <Button variant="ghost" className="opacity-0 group-hover:opacity-100">
                  Select <ArrowRight size={14} />
                </Button>
              </Card>
            ))}
          </div>
        </Section>
        
        <Section title="Quick Actions">
          <div className="grid grid-cols-2 gap-4">
            <Card hoverable className="flex flex-col items-center justify-center text-center gap-3 active:scale-95 cursor-pointer"
              onClick={handleNewGoalClick}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Target size={20} />
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest font-bold">New Goal</span>
            </Card>
            <Card hoverable className="flex flex-col items-center justify-center text-center gap-3 active:scale-95 cursor-pointer"
              onClick={handleViewAllPathsClick}
            >
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <BookOpen size={20} />
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest font-bold">Browse Paths</span>
            </Card>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Home;