export const generateInsights = (metrics, user, activityLogs = []) => {
  let insights = [];

  // Log-based Insights
  const recentLogs = activityLogs.slice(0, 5);
  const totalPractice = activityLogs.filter(l => l.type === 'Practice').length;
  const totalComp = activityLogs.filter(l => l.type === 'Competition').length;

  if (totalComp > totalPractice && totalPractice < 2) {
    insights.push({ text: "High volume of competitions logged. Consider adding more 'Practice' sessions to refine your fundamentals.", type: "suggestion" });
  }

  if (activityLogs.length > 3) {
    const averageDuration = activityLogs.reduce((a, b) => a + parseFloat(b.duration || 0), 0) / activityLogs.length;
    if (averageDuration > 2) {
      insights.push({ text: "You're clocking deep focus sessions (>2h). Ensure you're taking cognitive breaks to prevent burnout.", type: "warning" });
    }
  }

  // Logic to generate insights
  if (metrics.completionRate > 70 && metrics.activeStreak > 3) {
      insights.push({ text: "Strong discipline in executing your learning paths. Keep up the momentum!", type: "positive" });
  } else if (metrics.completionRate < 30 && metrics.totalModulesCompleted > 0) {
      insights.push({ text: "You are starting modules but not finishing them. Try to focus on completing one module at a time.", type: "warning" });
  } else if (metrics.totalModules === 0) {
      insights.push({ text: "You haven't started any modules yet. Pick a learning path and dive in!", type: "info" });
  }

  if (metrics.mentorInteractions > 10) {
      insights.push({ text: "Excellent job utilizing the mentor feature for clarity.", type: "positive" });
  } else if (metrics.mentorInteractions < 3) {
      insights.push({ text: "Don't hesitate to use the mentor AI when you are stuck. High mentor usage correlates with faster learning.", type: "suggestion" });
  }

  // fallback/random insights based on skills
  if (user && user.skills && user.skills.length > 0) {
      insights.push({ text: `Your primary skill focus is on ${user.skills[0]}. Consider exploring adjacent domains to broaden your expertise.`, type: "info" });
  } else {
      insights.push({ text: "Start adding skills to your profile to receive tailored growth recommendations.", type: "info" });
  }

  // Action suggestions
  let actionText = "Action: Dedicate 30 mins tomorrow to learning.";
  if (metrics.completionRate < 50 && metrics.totalModulesCompleted > 0) {
      actionText = "Action: Focus on completing your current active module before starting new ones.";
  }
  insights.push({ text: actionText, type: "action" });

  return insights.slice(0, 5); // Return max 5 insights
};
