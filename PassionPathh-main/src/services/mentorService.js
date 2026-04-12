const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const sendMessage = async (message) => {
  await delay(500); // network latency to send
  return true;
};

export const generateMockResponse = async (input, mode, interests = [], currentFocus = null, activityLogs = []) => {
  await delay(Math.random() * 500 + 500); // 500-1000ms delay

  const lowerInput = input.toLowerCase();
  const mainInterest = currentFocus || (interests.length > 0 ? interests[0] : null);

  // Activity Log Aware Insights (Performance check)
  const recentLogs = activityLogs.slice(0, 3);
  const totalPracticeHours = activityLogs
    .filter(log => log.type === 'Practice')
    .reduce((acc, log) => acc + parseFloat(log.duration || 0), 0);

  if (lowerInput.includes('progress') || lowerInput.includes('how am i doing')) {
    if (totalPracticeHours > 5) {
      return `You've logged over ${totalPracticeHours} hours of dedicated practice recently. This level of consistency is exactly what leads to mastery in ${mainInterest || 'your field'}. Keep pushing!`;
    }
    if (recentLogs.length > 0) {
      const last = recentLogs[0];
      return `I see you recently logged a ${last.type} session: "${last.title}" for ${last.duration} hours. How did that feel? Consistent logging helps me refine your trajectory.`;
    }
  }

  // Interest-driven guidance (Strict)
  if (mainInterest) {
    const interest = mainInterest.toLowerCase();
    
    // Check for specific domain queries within the interest scope
    if (interest === 'music') {
      if (lowerInput.includes('next') || lowerInput.includes('do')) {
        return "Focus on improving your composition and sound design. Mastery of your DAW is the next critical milestone for your music career.";
      }
      return "As you develop your musical ear, remember that consistency in practice is what separates hobbyists from professionals. How long have you practiced today?";
    }
    
    if (interest === 'sports' || interest === 'cricket') {
      if (lowerInput.includes('next') || lowerInput.includes('do')) {
        return "Your next step should be technical physical drills. Refine your form and analyze professional layouts of the game.";
      }
      return "Athletic excellence is built through repetition and peak physical conditioning. Let's look at your training session frequency.";
    }

    if (interest === 'chess') {
        if (lowerInput.includes('next') || lowerInput.includes('do')) {
          return "You should focus on mid-game tactics and pawn structures. Try solving 5 puzzles before your next match.";
        }
        return "Chess is a game of pattern recognition. I recommend analyzing your losses to identify tactical oversights.";
    }

    if (interest === 'art') {
        if (lowerInput.includes('next') || lowerInput.includes('do')) {
          return "Start sketching anatomy foundations. Getting the basics right will make your digital illustrations much more realistic.";
        }
        return "Creativity needs fuel. Have you explored any new visual styles or artists this week?";
    }
  }

  // Fallback to more general contextual hints if no specific focus or generic query
  if (lowerInput.includes('career')) {
    return "Based on your trajectory, I highly recommend building public artifacts and seeking peer reviews.";
  }
  if (lowerInput.includes('skill')) {
    return "To cover your current skill gap, I suggest focusing on the fundamentals within your primary interest domain.";
  }
  if (lowerInput.includes('next')) {
    return "Your immediate next step should be completing the currently active module in your trajectory.";
  }

  return "That's an interesting point. Let's delve deeper into how this aligns with your overarching goals in " + (mainInterest || "your chosen field") + ".";
};
