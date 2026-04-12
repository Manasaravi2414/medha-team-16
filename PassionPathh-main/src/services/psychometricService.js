export const questions = [
  {
    id: 1,
    text: "What excites you the most in a new project?",
    options: [
      { text: "Building robust systems & logic", value: "Programming" },
      { text: "Expressing ideas through art or music", value: "Art" },
      { text: "Optimizing strategy & performance", value: "Strategy" },
      { text: "Collaborating & leading a group", value: "Lifestyle" }
    ]
  },
  {
    id: 2,
    text: "How do you prefer to spend your peak focus hours?",
    options: [
      { text: "Solving complex technical puzzles", value: "Programming" },
      { text: "Designing or creating digital content", value: "Art" },
      { text: "Analyzing matches or strategic games", value: "Chess" },
      { text: "Coaching or helping others grow", value: "Lifestyle" }
    ]
  },
  {
    id: 3,
    text: "What motivates you to keep going?",
    options: [
      { text: "Technological innovation", value: "Programming" },
      { text: "Self-expression and creativity", value: "Music" },
      { text: "The thrill of competition", value: "Sports" },
      { text: "Social impact and connection", value: "Lifestyle" }
    ]
  },
  {
    id: 4,
    text: "Which of these best describes your 'Flow' state?",
    options: [
      { text: "Deep in lines of code or data", value: "Programming" },
      { text: "Lost in a performance or sketch", value: "Art" },
      { text: "Thinking three steps ahead in a game", value: "Chess" },
      { text: "Empowering someone to reach their goal", value: "Lifestyle" }
    ]
  },
  {
    id: 5,
    text: "What kind of content do you naturally consume?",
    options: [
      { text: "Development tutorials and updates", value: "Programming" },
      { text: "Music, dance, or art showcases", value: "Music" },
      { text: "Sports or strategy breakdown videos", value: "Sports" },
      { text: "Human interest stories and self-help", value: "Lifestyle" }
    ]
  },
  {
    id: 6,
    text: "If you had a weekend to master a new skill, it would be:",
    options: [
      { text: "A new programming framework", value: "Programming" },
      { text: "A musical instrument or dance routine", value: "Music" },
      { text: "Game theory or a competitive sport", value: "Chess" },
      { text: "Public speaking or emotional intelligence", value: "Lifestyle" }
    ]
  },
  {
    id: 7,
    text: "What do you value most in a mentor?",
    options: [
      { text: "Technical expertise and depth", value: "Programming" },
      { text: "Artistic vision and originality", value: "Art" },
      { text: "Winning tactics and discipline", value: "Strategy" },
      { text: "Empathy and communication style", value: "Lifestyle" }
    ]
  },
  {
    id: 8,
    text: "Your ideal workspace would be:",
    options: [
      { text: "A high-tech lab with multiple monitors", value: "Programming" },
      { text: "A bright, messy studio full of tools", value: "Art" },
      { text: "A sleek office for match prep", value: "Strategy" },
      { text: "A warm, open space for conversation", value: "Lifestyle" }
    ]
  },
  {
    id: 9,
    text: "In a team, you are usually the one who:",
    options: [
      { text: "Architects the technical solution", value: "Programming" },
      { text: "Brings the aesthetic polish", value: "Art" },
      { text: "Drives the strategy to win", value: "Strategy" },
      { text: "Ensures everyone is motivated", value: "Lifestyle" }
    ]
  },
  {
    id: 10,
    text: "When you look at the future, you see:",
    options: [
      { text: "A world transformed by software", value: "Programming" },
      { text: "A new era of digital expression", value: "Music" },
      { text: "A competitive landscape to conquer", value: "Sports" },
      { text: "A more connected and empathetic society", value: "Lifestyle" }
    ]
  }
];

export const analyzeResponses = (answers) => {
  const scores = {};
  
  answers.forEach(answer => {
    scores[answer] = (scores[answer] || 0) + 1;
  });

  // Sort categories by score
  const sortedCategories = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  // Return top 2 interests
  return sortedCategories.slice(0, 2);
};
