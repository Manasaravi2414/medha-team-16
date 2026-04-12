export const mockDiscoverTasks = {
  categories: [
    { id: 'cat_all', label: 'All Fields' },
    { id: 'cat_eng', label: 'Engineering' },
    { id: 'cat_creative', label: 'Creative' },
    { id: 'cat_perf', label: 'Performing Arts' },
    { id: 'cat_sports', label: 'Sports' },
    { id: 'cat_strat', label: 'Strategic' },
    { id: 'cat_life', label: 'Lifestyle' }
  ],
  careers: [
    { 
      id: 'car_1', 
      title: 'Backend Systems Engineer', 
      desc: 'Focus on highly scalable microservices and infrastructure.', 
      category: 'cat_eng', 
      status: 'idle', 
      icon: 'database',
      careers: ['Backend Engineer', 'Cloud Architect', 'DevOps'],
      tags: ['engineering', 'backend', 'tech']
    },
    { 
      id: 'car_music',
      title: 'Music Production',
      desc: 'Learn composing, mixing, and sound design.',
      category: 'cat_creative',
      status: 'idle',
      icon: 'users',
      careers: ['Music Producer', 'Sound Engineer', 'Composer'],
      tags: ['creative', 'music', 'production']
    },
    { 
      id: 'car_art',
      title: 'Digital Art & Illustration',
      desc: 'Master visual storytelling through digital painting and vectors.',
      category: 'cat_creative',
      status: 'idle',
      icon: 'layout',
      careers: ['Illustrator', 'Graphic Designer', 'Animator'],
      tags: ['creative', 'art', 'design']
    },
    { 
      id: 'car_dance',
      title: 'Dance Performance',
      desc: 'Express through movement, choreography, and rhythm.',
      category: 'cat_perf',
      status: 'idle',
      icon: 'users',
      careers: ['Performer', 'Choreographer', 'Instructor'],
      tags: ['performance', 'dance', 'creative']
    },
    { 
      id: 'car_cricket',
      title: 'Cricket Strategy & Play',
      desc: 'Develop physical skills, strategic thinking, and team dynamics.',
      category: 'cat_sports',
      status: 'idle',
      icon: 'database',
      careers: ['Professional Player', 'Coach', 'Analyst'],
      tags: ['sports', 'cricket', 'analytical']
    },
    { 
      id: 'car_chess',
      title: 'Advanced Chess Masters',
      desc: 'Master deep analytical thinking and end-game strategies.',
      category: 'cat_strat',
      status: 'idle',
      icon: 'layout',
      careers: ['Professional Player', 'Coach', 'Streamer'],
      tags: ['analytical', 'chess', 'strategy']
    },
    { 
      id: 'car_content',
      title: 'Digital Content Creation',
      desc: 'Build audiences across platforms through authentic storytelling.',
      category: 'cat_life',
      status: 'idle',
      icon: 'users',
      careers: ['YouTuber', 'Podcaster', 'Creative Entrepreneur'],
      tags: ['lifestyle', 'content', 'production']
    }
  ]
};
