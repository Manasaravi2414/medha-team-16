import { mockDiscoverTasks } from '../data/mockDiscoverTasks';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Filter paths and careers based on user interests.
 * Strictly shows ONLY what matches selected interests.
 */
export const getFilteredPaths = (interests) => {
  if (!interests || interests.length === 0) {
    return mockDiscoverTasks.careers;
  }

  // Normalize interests to lowercase for matching
  const normalizedInterests = interests.map(i => i.toLowerCase());

  return mockDiscoverTasks.careers.filter(career => {
    // Match against tags, title, or category
    const hasTagMatch = career.tags && career.tags.some(tag => normalizedInterests.includes(tag.toLowerCase()));
    const hasCategoryMatch = normalizedInterests.some(i => career.category.includes(i.toLowerCase()));
    
    // Check if any interest word is in the title (e.g. "Music" in "Music Production")
    const hasTitleMatch = normalizedInterests.some(i => career.title.toLowerCase().includes(i));

    return hasTagMatch || hasCategoryMatch || hasTitleMatch;
  });
};

/**
 * Get context-aware recommendations.
 * Recommends paths that match interests but are not the current main focus.
 */
export const getRecommendedPaths = (interests) => {
  const filtered = getFilteredPaths(interests);
  // Sort or prioritize by currentFocus if needed, for now just slice
  return filtered.slice(0, 3);
};

/**
 * Returns mentor context metadata based on interests.
 */
export const getMentorContext = (interests) => {
  if (!interests || interests.length === 0) {
    return { tone: 'general', domain: 'general' };
  }

  const primary = interests[0].toLowerCase();
  
  const mapping = {
    'music': { tone: 'inspirational', domain: 'music' },
    'sports': { tone: 'disciplined', domain: 'athletics' },
    'cricket': { tone: 'strategic', domain: 'cricket' },
    'art': { tone: 'expressive', domain: 'visual arts' },
    'dance': { tone: 'rhythmic', domain: 'performance' },
    'chess': { tone: 'analytical', domain: 'strategy' },
    'programming': { tone: 'systemic', domain: 'engineering' }
  };

  return mapping[primary] || { tone: 'mentorship', domain: primary };
};

/**
 * Defines which metrics should be prioritized for specific interests.
 */
export const getAnalyticsContext = (interests) => {
  if (!interests || interests.length === 0) return ['Progress', 'Consistency', 'Momentum'];

  const primary = interests[0].toLowerCase();

  const domainMetrics = {
    'music': ['Practice Hours', 'Theory Mastery', 'Composition Count'],
    'sports': ['Training Sessions', 'Physical Prep', 'Performance Drills'],
    'chess': ['Games Played', 'Tactic Accuracy', 'Victory Rate'],
    'art': ['Sketch Volume', 'Tool Proficiency', 'Project Finish Rate']
  };

  return domainMetrics[primary] || ['Skill Growth', 'Module Progress', 'Consistency'];
};
