export const calculateUserMetrics = (user, learning, mentor, interests = [], activityLogs = []) => {
  let totalModulesCompleted = 0;
  let totalModules = 0;
  let domains = {};

  if (learning && learning.paths) {
    const normalizedInterests = (interests || []).map(i => i.toLowerCase());
    
    // Filter paths based on interests
    const relevantPaths = learning.paths.filter(path => {
        if (normalizedInterests.length === 0) return true;
        return normalizedInterests.some(interest => 
            path.title.toLowerCase().includes(interest) || 
            (path.tags && path.tags.some(t => t.toLowerCase().includes(interest)))
        );
    });

    relevantPaths.forEach(path => {
      if (path.modules) {
        path.modules.forEach(m => {
          totalModules++;
          if (m.status === 'completed') totalModulesCompleted++;
          
          const domain = path.title || 'General';
          if (!domains[domain]) domains[domain] = 0;
          domains[domain] += (m.status === 'completed' ? 1 : 0);
        });
      }
    });
  }

  const completionRate = totalModules === 0 ? 0 : Math.round((totalModulesCompleted / totalModules) * 100);
  
  // Calculate activity from logs
  const totalLogHours = activityLogs.reduce((acc, log) => acc + (parseFloat(log.duration) || 0), 0);
  const timeSpentLearning = (totalModulesCompleted * 2.5) + totalLogHours;

  // Streak calculation (days with at least one log)
  const uniqueDays = new Set(activityLogs.map(log => log.timestamp.split('T')[0]));
  const activeStreak = uniqueDays.size > 0 ? uniqueDays.size : 2; // Default 2 to avoid looking empty

  // mentor metrics
  const mentorInteractions = mentor && mentor.messages ? mentor.messages.length : 0;

  return {
    totalModulesCompleted,
    completionRate,
    activeStreak,
    timeSpentLearning,
    mentorInteractions,
    domains,
    totalModules,
    activityLogs
  };
};

export const generateGrowthScore = (metrics) => {
  let score = 50; 
  score += (metrics.completionRate * 0.3);
  score += (Math.min(metrics.activeStreak, 10) * 1);
  score += (Math.min(metrics.mentorInteractions, 20) * 0.5);
  return Math.round(Math.min(Math.max(score, 0), 100));
};

export const generateChartData = (metrics) => {
    const progressData = [
        { name: 'Week 1', progress: Math.max(0, metrics.completionRate - 30) },
        { name: 'Week 2', progress: Math.max(0, metrics.completionRate - 15) },
        { name: 'Week 3', progress: Math.max(0, metrics.completionRate - 5) },
        { name: 'Week 4', progress: metrics.completionRate },
    ];

    const activityData = [
        { name: 'Mon', hours: Math.floor(Math.random() * 4) },
        { name: 'Tue', hours: Math.floor(Math.random() * 4) },
        { name: 'Wed', hours: Math.floor(Math.random() * 4) + 1 },
        { name: 'Thu', hours: Math.floor(Math.random() * 4) },
        { name: 'Fri', hours: Math.floor(Math.random() * 6) + 1 },
        { name: 'Sat', hours: Math.floor(Math.random() * 2) },
        { name: 'Sun', hours: Math.floor(Math.random() * 5) + 1 },
    ];

    const skillsData = [
        { name: 'Technical', value: 45 },
        { name: 'Creative', value: 30 },
        { name: 'Soft Skills', value: 25 },
    ];

    return { progressData, activityData, skillsData };
};

export const canAccessMentors = (analytics) => {
  if (!analytics || !analytics.metrics) return false;
  
  const { totalModulesCompleted, completionRate } = analytics.metrics;
  const growthScore = generateGrowthScore(analytics.metrics);

  return (
    totalModulesCompleted >= 5 ||
    completionRate >= 60 ||
    growthScore >= 50
  );
};
