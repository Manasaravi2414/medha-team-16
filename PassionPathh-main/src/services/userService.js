import { mockUser } from '../data/mockUser';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUser = async () => {
  await delay(500);
  return { ...mockUser };
};

export const updateUser = async (updates) => {
  await delay(400);
  // Just simulating success
  return { ...mockUser, ...updates };
};
