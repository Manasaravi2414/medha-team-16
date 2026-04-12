export const mockPaths = [
  {
    id: 'path_1',
    title: 'Backend Systems Engineer',
    fit: 82,
    recommended: false,
    desc: 'Focuses on deep infrastructure, algorithm efficiency, and system reliability.',
    modules: [
      { id: 'm_1', title: 'Data Structures Mastery', status: 'completed' },
      { id: 'm_2', title: 'Concurrency Models', status: 'active' },
      { id: 'm_3', title: 'Distributed Systems', status: 'locked' }
    ]
  },
  {
    id: 'path_music',
    title: 'Music Production',
    fit: 92,
    recommended: true,
    desc: 'Learn composing, mixing, and sound design.',
    modules: [
      { id: 'm_1', title: 'Music Theory Basics', status: 'completed' },
      { id: 'm_2', title: 'Digital Audio Workstations', status: 'active' },
      { id: 'm_3', title: 'Mixing & Mastering', status: 'locked' }
    ]
  },
  {
    id: 'path_art',
    title: 'Digital Art & Illustration',
    fit: 85,
    recommended: false,
    desc: 'Master visual storytelling through digital painting and vectors.',
    modules: [
      { id: 'm_1', title: 'Color Theory', status: 'active' },
      { id: 'm_2', title: 'Vector Illustration', status: 'locked' }
    ]
  },
  {
    id: 'path_dance',
    title: 'Dance Performance',
    fit: 78,
    recommended: false,
    desc: 'Express through movement, choreography, and rhythm.',
    modules: [
      { id: 'm_1', title: 'Rhythm Fundamentals', status: 'active' },
      { id: 'm_2', title: 'Contemporary Forms', status: 'locked' }
    ]
  },
  {
    id: 'path_cricket',
    title: 'Cricket Strategy & Play',
    fit: 88,
    recommended: false,
    desc: 'Develop physical skills, strategic thinking, and team dynamics.',
    modules: [
      { id: 'm_1', title: 'Batting Technique', status: 'active' },
      { id: 'm_2', title: 'Field Strategy', status: 'locked' }
    ]
  },
  {
    id: 'path_chess',
    title: 'Advanced Chess Masters',
    fit: 95,
    recommended: true,
    desc: 'Master deep analytical thinking and end-game strategies.',
    modules: [
      { id: 'm_1', title: 'Opening Theory', status: 'completed' },
      { id: 'm_2', title: 'Mid-game Tactics', status: 'active' },
      { id: 'm_3', title: 'End-game Scenarios', status: 'locked' }
    ]
  },
  {
    id: 'path_content',
    title: 'Digital Content Creation',
    fit: 90,
    recommended: true,
    desc: 'Build audiences across platforms through authentic storytelling.',
    modules: [
      { id: 'm_1', title: 'Video Editing Basics', status: 'active' },
      { id: 'm_2', title: 'Audience Engagement', status: 'locked' }
    ]
  }
];

export const mockMilestones = [
  { id: 'ms_1', date: 'MAR 2024', status: 'completed', text: 'Started System Research' },
  { id: 'ms_2', date: 'APR 2024', status: 'active', text: 'Completed System Synthesis' },
  { id: 'ms_3', date: 'JUN 2024', status: 'upcoming', text: 'Market Authority Confirmation' }
];
