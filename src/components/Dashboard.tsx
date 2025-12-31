import { useEffect, useMemo, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Loader2 } from 'lucide-react';
import { $habits, $habitsLoading, $habitsInitialized, initializeStore, refreshHabits, openModal } from '../stores/habits';
import { $user, $authLoading, $authInitialized, initializeAuth } from '../stores/auth';
import { calculateMomentum, getDailyMessage, getAllStreakStatuses } from '../lib/engagement';
import HabitCard from './HabitCard';
import HabitModal from './HabitModal';
import MomentumBadge from './MomentumBadge';
import DailyMessage from './DailyMessage';
import ContributionGrid from './ContributionGrid';

export default function Dashboard() {
  const habits = useStore($habits);
  const habitsLoading = useStore($habitsLoading);
  const habitsInitialized = useStore($habitsInitialized);
  const user = useStore($user);
  const authLoading = useStore($authLoading);
  const authInitialized = useStore($authInitialized);
  
  // Initialize auth first
  useEffect(() => {
    initializeAuth();
  }, []);

  // Redirect to signin if not authenticated (only after auth is initialized)
  // Note: We don't use a ref to track redirect because user state should be stable now
  // If user becomes null after being authenticated, something is wrong with auth state
  useEffect(() => {
    if (authInitialized && !authLoading && !user) {
      window.location.href = '/auth/signin';
    }
  }, [authLoading, authInitialized, user]);

  // Load habits when user is available
  useEffect(() => {
    if (user) {
      initializeStore();
    }
  }, [user]);

  // Handle visibility change - refresh data when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && user && habitsInitialized) {
        // Silently refresh habits in the background
        refreshHabits();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, habitsInitialized]);

  const momentum = useMemo(() => calculateMomentum(habits), [habits]);
  const dailyMessage = useMemo(() => getDailyMessage(habits), [habits]);
  const streakStatuses = useMemo(() => getAllStreakStatuses(habits), [habits]);

  const hasHabits = habits.length > 0;
  
  // Show loading only on initial load, not on background refreshes
  const isInitialLoading = !authInitialized || (authLoading) || (user && !habitsInitialized && habitsLoading);

  if (isInitialLoading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-loading-inner">
          <Loader2 size={24} className="auth-spinner" />
          <span>Loading your habits...</span>
        </div>
      </div>
    );
  }

  // If auth is done but no user, we're redirecting
  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-loading-inner">
          <Loader2 size={24} className="auth-spinner" />
          <span>Redirecting...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard">
        {/* Floating add button - bottom right */}
        <div className="add-button-container">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={() => openModal()}
            className="btn-fab"
            aria-label="Add new habit"
          >
            <Plus className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {!hasHabits ? (
            <EmptyState onAdd={() => openModal()} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="dashboard-sections"
            >
              {/* Daily message - prominent at top */}
              <section className="dashboard-section">
                <DailyMessage message={dailyMessage} />
              </section>

              {/* Habits grid */}
              <section className="dashboard-section">
                <header className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Habits</h2>
                  <span className="dashboard-section-count">{habits.length}</span>
                </header>
                <motion.div layout className="habits-grid">
                  <AnimatePresence mode="popLayout">
                    {habits.map((habit, index) => (
                      <motion.div
                        key={habit.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: index * 0.03 }
                        }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <HabitCard
                          habit={habit}
                          streakStatus={streakStatuses.get(habit.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </section>

              {/* Activity overview */}
              <section className="dashboard-section">
                <header className="dashboard-section-header">
                  <h2 className="dashboard-section-title">Activity</h2>
                </header>
                <div className="dashboard-card">
                  <ContributionGrid />
                </div>
              </section>

              {/* Momentum */}
              <section className="dashboard-section">
                <MomentumBadge momentum={momentum} variant="full" />
              </section>
            </motion.div>
          )}
        </div>
      </div>

      <HabitModal />
    </>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="empty-state"
    >
      <p className="empty-state-label">
        No habits yet
      </p>
      <h2 className="empty-state-title">
        Start your journey
      </h2>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAdd}
        className="btn btn-primary"
      >
        <Plus className="w-4 h-4" />
        <span>Add habit</span>
      </motion.button>
    </motion.div>
  );
}
