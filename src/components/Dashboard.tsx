import { useEffect, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Loader2 } from 'lucide-react';
import { $habits, $habitsLoading, initializeStore, openModal } from '../stores/habits';
import { $user, $authLoading, initializeAuth } from '../stores/auth';
import { calculateMomentum, getDailyMessage, getAllStreakStatuses } from '../lib/engagement';
import HabitCard from './HabitCard';
import HabitModal from './HabitModal';
import MomentumBadge from './MomentumBadge';
import DailyMessage from './DailyMessage';

export default function Dashboard() {
  const habits = useStore($habits);
  const habitsLoading = useStore($habitsLoading);
  const user = useStore($user);
  const authLoading = useStore($authLoading);

  // Initialize auth first, then habits
  useEffect(() => {
    initializeAuth();
  }, []);

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/auth/signin';
    }
  }, [authLoading, user]);

  // Load habits when user is available
  useEffect(() => {
    if (user) {
      initializeStore();
    }
  }, [user]);

  const momentum = useMemo(() => calculateMomentum(habits), [habits]);
  const dailyMessage = useMemo(() => getDailyMessage(habits), [habits]);
  const streakStatuses = useMemo(() => getAllStreakStatuses(habits), [habits]);

  const hasHabits = habits.length > 0;
  const isLoading = authLoading || habitsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={24} className="auth-spinner text-muted" />
          <span className="text-sm text-muted">Loading your habits...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen pb-24">
        {/* Add button */}
        <div className="add-button-container">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal()}
            className="btn-icon"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="content-container">
          {!hasHabits ? (
            <EmptyState onAdd={() => openModal()} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Habits grid */}
              <div>
                <p className="text-10 text-muted uppercase tracking-ultra-wide mb-3">
                  Habits
                </p>
                <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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
              </div>

              {/* Daily message */}
              <DailyMessage message={dailyMessage} />

              {/* Momentum */}
              <MomentumBadge momentum={momentum} variant="full" />
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
