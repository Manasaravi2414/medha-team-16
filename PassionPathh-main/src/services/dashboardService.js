import { mockDiscoverTasks } from '../data/mockDiscoverTasks';
import { getRecommendedPaths } from './personalizationService';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getRecommendations = async (interests = []) => {
  await delay(600);
  
  if (!interests || interests.length === 0) {
     // Fallback to original diverse shuffle if no interests
     const inactive = mockDiscoverTasks.careers.filter(c => c.status !== 'active');
     return inactive.sort(() => 0.5 - Math.random()).slice(0, 2);
  }

  return getRecommendedPaths(interests);
};

export const getStats = async () => {
  await delay(400);
  return {
    clarityScore: 82,
    momentum: 88,
    consistencyFlow: 0.94,
    goalsMet: 4,
    totalGoals: 6
  };
};
