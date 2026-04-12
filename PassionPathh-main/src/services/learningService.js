import { mockPaths } from '../data/mockPaths';

// Mocking some internal database state to simulate persistence across calls
// In a real app, this would be a DB. Here we just use a local closure variable if needed, 
// but state primarily lives in Zustand. 
// These services simulate backend delays.

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getPaths = async () => {
  await delay(800);
  return [...mockPaths];
};

export const updateProgress = async (pathId, moduleId, status) => {
  await delay(400); // Simulate network
  return true; 
};

export const calculateProgress = (path) => {
  if (!path || !path.modules || path.modules.length === 0) return 0;
  const completed = path.modules.filter(m => m.status === 'completed').length;
  return Math.round((completed / path.modules.length) * 100);
};
