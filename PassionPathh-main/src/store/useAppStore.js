import { create } from 'zustand';
import { getPaths, updateProgress, calculateProgress } from '../services/learningService';
import { sendMessage, generateMockResponse } from '../services/mentorService';
import { getRecommendations, getStats } from '../services/dashboardService';
import { getUser, updateUser } from '../services/userService';
import { mockChatHistory } from '../data/mockMentorData';
import { calculateUserMetrics, generateGrowthScore, generateChartData, canAccessMentors } from '../services/analyticsService';
import { generateInsights } from '../services/aiInsightService';

const useAppStore = create((set, get) => ({
  user: {
    name: '',
    goals: [],
    currentPath: null,
    skills: [],
    interests: [],
    currentFocus: null
  },
  learning: {
    progress: {}, // e.g. path_id: progress_percentage
  },
  activityLogs: [],
  isNewEntryModalOpen: false,
  mentor: {
    messages: mockChatHistory,
    mode: 'General Mode',
    isTyping: false
  },
  dashboard: {
    recommendations: [],
    stats: {
      clarityScore: 0,
      momentum: 0,
      goalsMet: 0,
      totalGoals: 0
    },
    activityTimeline: []
  },
  analytics: {
    metrics: null,
    insights: [],
    growthScore: 0,
    charts: null
  },
  mentorAccess: {
    isUnlocked: false
  },
  toast: {
    message: null,
    type: 'info', // 'info', 'success', 'error'
    visible: false
  },
  isLoading: true,
  isInitializing: true,

  // Global Actions
  showToast: (message, type = 'info') => {
    set({ toast: { message, type, visible: true } });
    setTimeout(() => {
      set({ toast: { ...get().toast, visible: false } });
    }, 4000);
  },

  toggleNewEntryModal: (isOpen) => set({ isNewEntryModalOpen: isOpen }),

  addNewGoal: () => {
    get().toggleNewEntryModal(true);
  },

  addActivityLog: (log) => {
    const { activityLogs, dashboard } = get();
    const newLog = {
      ...log,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };

    const newActivity = {
      title: `${log.type}: ${log.title}`,
      icon: log.type.toLowerCase(),
      time: "Just now"
    };

    set((state) => ({
      activityLogs: [newLog, ...state.activityLogs],
      dashboard: {
        ...state.dashboard,
        activityTimeline: [newActivity, ...state.dashboard.activityTimeline]
      }
    }));

    get().refreshAnalytics();
    get().showToast(`Archived activity: ${log.title}`, "success");
    get().toggleNewEntryModal(false);
  },

  archiveSession: () => {
    get().showToast("Archiving current session to persistent storage...", "info");
  },
  initializeApp: async () => {
    set({ isInitializing: true });
    try {
      const [user, paths, recs, stats] = await Promise.all([
        getUser(),
        getPaths(),
        getRecommendations(),
        getStats()
      ]);

      set({
        user: { 
          name: user.name, 
          goals: user.goals,
          currentPath: 'path_music', // Initial mock logic
          skills: user.skills
        },
        learning: { 
          paths, 
          progress: {}
        },
        dashboard: { 
          recommendations: recs, 
          stats,
          activityTimeline: [] 
        },
        isInitializing: false,
        isLoading: false
      });
      
      // Calculate initial analytics
      get().refreshAnalytics();
      
      // Check mentor access
      get().checkMentorAccess();

    } catch (e) {
      console.error(e);
      set({ isInitializing: false, isLoading: false });
    }
  },

  setInterests: async (interests) => {
    set({ isLoading: true });
    const currentFocus = interests.length > 0 ? interests[0] : null;

    set((state) => ({
      user: { 
        ...state.user, 
        interests, 
        currentFocus 
      }
    }));

    // Dynamic reset of derived data
    await get().resetPersonalizedData();
    set({ isLoading: false });
  },

  resetPersonalizedData: async () => {
    const { user } = get();
    // Re-fetch recommendations with new interest context
    const recs = await getRecommendations(user.interests);
    
    set((state) => ({
      dashboard: { 
        ...state.dashboard, 
        recommendations: recs 
      },
      // Clear mentor typing state but keep history? 
      // User says "Old data must NOT persist" usually means context reset.
      // We might want to clear messages too if we want a hard domain shift.
      mentor: {
        ...state.mentor,
        messages: [] // Hard reset of chat context to avoid stale domain advice
      }
    }));

    // Trigger analytics recalculation
    get().refreshAnalytics();
  },

  // --- USER ACTIONS ---
  setCurrentPath: async (pathId) => {
    set({ isLoading: true });
    await updateUser({ currentPath: pathId });
    set((state) => ({
      user: { ...state.user, currentPath: pathId },
      isLoading: false
    }));
  },

  // --- LEARNING ACTIONS ---
  startPath: async (pathId) => {
    set({ isLoading: true });
    const { paths } = get().learning;
    const pathIdx = paths.findIndex(p => p.id === pathId);
    if (pathIdx === -1) { set({ isLoading: false }); return; }

    // local update
    const updatedPaths = [...paths];
    if (updatedPaths[pathIdx].modules.length > 0) {
      updatedPaths[pathIdx].modules[0].status = 'active';
    }

    set((state) => ({
      learning: { ...state.learning, paths: updatedPaths },
      user: { ...state.user, currentPath: pathId },
      isLoading: false
    }));
  },

  startModule: async (pathId, moduleId) => {
    set({ isLoading: true });
    await updateProgress(pathId, moduleId, 'active');
    
    const { paths } = get().learning;
    const updatedPaths = paths.map(p => {
      if (p.id === pathId) {
        return {
          ...p,
          modules: p.modules.map(m => m.id === moduleId ? { ...m, status: 'active' } : m)
        };
      }
      return p;
    });

    set((state) => ({ learning: { ...state.learning, paths: updatedPaths }, isLoading: false }));
  },

  completeModule: async (pathId, moduleId, moduleTitle) => {
    set({ isLoading: true });
    await updateProgress(pathId, moduleId, 'completed');

    const { paths } = get().learning;
    const { activityTimeline } = get().dashboard;
    
    let nextUnlocked = false;
    const updatedPaths = paths.map(p => {
      if (p.id === pathId) {
        let foundCurrent = false;
        const newMods = p.modules.map(m => {
          if (m.id === moduleId) {
            foundCurrent = true;
            return { ...m, status: 'completed' };
          }
           // Unlock next logic immediately following current
          if (foundCurrent && m.status === 'locked' && !nextUnlocked) {
            nextUnlocked = true;
            return { ...m, status: 'active' };
          }
          return m;
        });

        // re-calculate progress
        const completedCount = newMods.filter(m => m.status === 'completed').length;
        const progress = Math.round((completedCount / newMods.length) * 100);

        set((state) => ({
          learning: { 
            ...state.learning, 
            progress: { ...state.learning.progress, [pathId]: progress }
          }
        }));

        // Check if this action unlocks mentors
        get().checkMentorAccess();

        return { ...p, modules: newMods };
      }
      return p;
    });

    // Save to activity timeline
    const newActivity = {
      title: `Completed Module: ${moduleTitle}`,
      icon: 'check',
      time: 'Just now'
    };

    set((state) => ({
      learning: { ...state.learning, paths: updatedPaths },
      dashboard: { ...state.dashboard, activityTimeline: [newActivity, ...state.dashboard.activityTimeline] },
      isLoading: false
    }));
  },

  // --- MENTOR ACTIONS ---
  changeMentorMode: (mode) => {
    set((state) => ({
      mentor: { ...state.mentor, mode }
    }));
  },

  sendMentorMessage: async (text) => {
    const userMsg = { id: Date.now(), sender: 'user', text };
    set((state) => ({
      mentor: { 
        ...state.mentor, 
        messages: [...state.mentor.messages, userMsg],
        isTyping: true 
      }
    }));

    await sendMessage(text);
    const { activityLogs } = get();
    const mockRep = await generateMockResponse(text, get().mentor.mode, get().user.interests, get().user.currentFocus, activityLogs);

    const aiMsg = { id: Date.now() + 1, sender: 'mentor', text: mockRep };
    set((state) => ({
      mentor: { 
        ...state.mentor, 
        messages: [...state.mentor.messages, aiMsg],
        isTyping: false 
      }
    }));
  },

  // --- DASHBOARD ACTIONS ---
  refreshStats: async () => {
    set({ isLoading: true });
    // fake randomize update
    const stats = await getStats();
    stats.clarityScore = Math.floor(Math.random() * 20) + 80;
    
    set((state) => ({
      dashboard: { ...state.dashboard, stats },
      isLoading: false
    }));
  },

  refreshAnalytics: () => {
    set({ isLoading: true });
    const { user, learning, mentor, activityLogs, user: { interests } } = get();
    
    const metrics = calculateUserMetrics(user, learning, mentor, interests, activityLogs);
    const growthScore = generateGrowthScore(metrics);
    const charts = generateChartData(metrics);
    const insights = generateInsights(metrics, user, activityLogs);
    
    set((state) => ({
      analytics: {
        metrics,
        growthScore,
        charts,
        insights
      },
      isLoading: false
    }));
    
    // Recalculate access based on fresh analytics
    get().checkMentorAccess();
  },

  checkMentorAccess: () => {
    const { analytics, mentorAccess, showToast } = get();
    if (mentorAccess.isUnlocked) return; // Already unlocked

    const unlocked = canAccessMentors(analytics);
    if (unlocked) {
      set({ mentorAccess: { isUnlocked: true } });
      showToast("🎉 You’ve unlocked access to real mentors!", "success");
    }
  }
}));

export default useAppStore;
