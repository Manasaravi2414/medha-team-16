import chanduAvatar from '../assets/avatars/chandu.png';

export const mockUser = {
  id: 'usr_123',
  name: 'Chandu',
  role: 'Student',
  avatar: chanduAvatar,
  clarityScore: 78,
  momentum: 84,
  consistencyFlow: 0.92,
  skills: ['React', 'Node.js', 'System Design'],
  goals: [
    {
      id: 'g1',
      title: 'Complete performance review',
      type: 'quarterly',
      status: 'active',
    },
    {
      id: 'g2',
      title: 'Publish technical blog post',
      type: 'monthly',
      status: 'pending',
    },
  ],
};
