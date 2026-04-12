import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import useAppStore from './store/useAppStore';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Discover from './pages/Discover';
import LearningPath from './pages/LearningPath';
import Mentor from './pages/Mentor';
import Growth from './pages/Growth';
import Profile from './pages/Profile';

function App() {
  const { initializeApp, isInitializing } = useAppStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="discover" element={<Discover />} />
          <Route path="path/:id" element={<LearningPath />} />
          <Route
            path="path"
            element={<Navigate to={`/path/path_creative`} replace />}
          />{' '}
          {/* Fallback based on mock string */}
          <Route path="mentor" element={<Mentor />} />
          <Route path="growth" element={<Growth />} />
          <Route path="profile" element={<Profile />} />
          {/* Fallback for missing routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
