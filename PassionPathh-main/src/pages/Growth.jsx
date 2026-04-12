import React, { useEffect } from 'react';
import useAppStore from '../store/useAppStore';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
  Target,
  Activity,
  CheckCircle2,
  History,
  RefreshCw,
  Download,
  Zap,
  BrainCircuit,
  LibraryBig,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { generateReport } from '../services/reportService';

const COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#ec4899'];

const Growth = () => {
  const { user, dashboard, analytics, refreshAnalytics, isLoading } =
    useAppStore();

  useEffect(() => {
    if (!analytics.metrics && !isLoading) {
      refreshAnalytics();
    }
  }, [analytics.metrics, isLoading, refreshAnalytics]);

  if (!user || !analytics.metrics || Object.keys(dashboard.stats).length === 0)
    return null;

  const { metrics, insights, growthScore, charts } = analytics;
  const { activityTimeline } = dashboard;

  const defaultActivity = [
    {
      title: 'Activated Trajectory: Creative Tech',
      time: '1 day ago',
      icon: 'target',
    },
    { title: 'Chatted with Mentor Alan', time: '3 days ago', icon: 'activity' },
  ];

  const getIconComponent = (iconStr) => {
    switch (iconStr) {
      case 'check':
        return CheckCircle2;
      case 'target':
        return Target;
      case 'history':
        return History;
      default:
        return Activity;
    }
  };

  const displayedActivity = [...activityTimeline, ...defaultActivity];

  const handleRefreshAnalyticsClick = () => {
    refreshAnalytics();
  };

  const handleDownloadReportClick = () => {
    generateReport(user, analytics);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 page-enter relative pb-12">
      {isLoading && (
        <div className="absolute inset-0 z-40 bg-background/50 backdrop-blur-sm flex items-center justify-center -m-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      <header className="mb-12 flex flex-col md:flex-row md:justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl text-on-surface mb-2">
            Growth Intelligence
          </h1>
          <p className="font-body text-on-surface-variant text-lg">
            AI-powered analytics driving your personalized learning journey.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleDownloadReportClick}
            disabled={isLoading}
            className="flex gap-2"
          >
            <Download size={16} />
            Report
          </Button>
          <Button
            onClick={handleRefreshAnalyticsClick}
            disabled={isLoading}
            className="flex gap-2"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </Button>
        </div>
      </header>

      {/* Primary Analytics Grid */}
      <Section title="Overview">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={64} className="text-primary transform rotate-12" />
            </div>
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <Zap size={18} className="text-primary" />
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                Growth Score
              </span>
            </div>
            <div className="flex items-baseline gap-2 relative z-10">
              <p className="font-headline text-4xl text-primary">
                {growthScore}
              </p>
              <span className="font-label text-xs text-on-surface-variant">
                / 100
              </span>
            </div>
          </Card>

          <Card className="hover:border-secondary transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Target size={18} className="text-secondary" />
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                Completion Rate
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="font-headline text-4xl">
                {metrics.completionRate}%
              </p>
              <span className="font-label text-xs text-on-surface-variant">
                overall
              </span>
            </div>
          </Card>

          <Card className="hover:border-tertiary transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={18} className="text-tertiary" />
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                Active Streak
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="font-headline text-4xl">{metrics.activeStreak}</p>
              <span className="font-label text-xs text-on-surface-variant">
                Days
              </span>
            </div>
          </Card>

          <Card className="hover:border-primary-container transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <LibraryBig size={18} className="text-primary-container" />
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                Time Learning
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="font-headline text-4xl">
                ~{metrics.timeSpentLearning}
              </p>
              <span className="font-label text-xs text-on-surface-variant">
                Hours
              </span>
            </div>
          </Card>
        </div>
      </Section>

      {/* AI Insights Panel */}
      <Section title="AI Insights" className="mt-12">
        <div className="grid grid-cols-1 gap-4">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex gap-4 items-start transition-all duration-300 hover:shadow-md
              ${
                insight.type === 'action'
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-surface border-outline-variant/30 hover:border-outline-variant/60'
              }`}
            >
              <div className="mt-1">
                <BrainCircuit
                  size={18}
                  className={
                    insight.type === 'action'
                      ? 'text-primary'
                      : 'text-on-surface-variant'
                  }
                />
              </div>
              <div>
                <p
                  className={`font-body text-md ${
                    insight.type === 'action'
                      ? 'font-semibold text-primary'
                      : 'text-on-surface'
                  }`}
                >
                  {insight.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Graphs */}
      <Section title="Visual Analytics" className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FIX: Card has explicit h-[350px]; inner div uses fixed height instead of flex-grow+100% */}
          <Card className="h-[350px] flex flex-col border border-outline-variant/20 hover:border-primary/30 transition-colors">
            <h3 className="font-headline text-lg mb-4">Progress Over Time</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart
                data={charts.progressData}
                margin={{ top: 5, right: 20, bottom: 5, left: -20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'var(--surface)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#6366f1', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="h-[350px] flex flex-col border border-outline-variant/20 hover:border-secondary/30 transition-colors">
            <h3 className="font-headline text-lg mb-4">Activity Frequency</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={charts.activityData}
                margin={{ top: 5, right: 20, bottom: 5, left: -20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.1}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'var(--surface)',
                  }}
                  cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                />
                <Bar
                  dataKey="hours"
                  fill="#14b8a6"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </Section>

      {/* Skills Distribution & Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 pb-12">
        <Section title="Skill Distribution">
          <Card className="flex flex-col border border-outline-variant/20 hover:border-tertiary/30 transition-colors">
            {/* FIX: explicit pixel height on ResponsiveContainer instead of height="100%" inside flex-grow */}
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={charts.skillsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                >
                  {charts.skillsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--on-surface)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 flex-wrap mt-4">
              {charts.skillsData.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-surface-container-low px-3 py-1 rounded-full"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  ></div>
                  <span className="font-label text-xs font-semibold">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Activity Log */}
        <Section title="Activity Timeline">
          <Card className="h-[360px] flex flex-col border border-outline-variant/20">
            <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {displayedActivity.map((activity, idx) => {
                const IconComponent = getIconComponent(activity.icon);
                return (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="mt-1 bg-surface-container-high p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                      <IconComponent size={14} className="text-primary" />
                    </div>
                    <div className="border-b border-outline-variant/10 pb-4 flex-grow last:border-0 last:pb-0">
                      <p className="font-headline text-md group-hover:text-primary transition-colors">
                        {activity.title}
                      </p>
                      <span className="font-label text-[10px] uppercase tracking-widest opacity-60">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
};

export default Growth;
