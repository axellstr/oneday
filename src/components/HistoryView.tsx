import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { $habits, $habitsLoading, initializeStore } from '../stores/habits';
import { $user, $authLoading, initializeAuth } from '../stores/auth';
import { getGlobalStats, getBestStreak, getTotalDays } from '../lib/streaks';
import { calculateCurrentStreak, getStreakStartDate } from '../lib/dates';
import ContributionGrid from './ContributionGrid';
import type { Habit } from '../types';

export default function HistoryView() {
  const habits = useStore($habits);
  const habitsLoading = useStore($habitsLoading);
  const user = useStore($user);
  const authLoading = useStore($authLoading);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [expandedHabitId, setExpandedHabitId] = useState<string | null>(null);

  // Initialize auth first, then habits
  useEffect(() => {
    initializeAuth();
  }, []);

  // Load habits when user is available
  useEffect(() => {
    if (user) {
      initializeStore();
    }
  }, [user]);

  const stats = getGlobalStats(habits);
  const isLoading = authLoading || habitsLoading;

  const toggleExpanded = (habitId: string) => {
    setExpandedHabitId(expandedHabitId === habitId ? null : habitId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={24} className="auth-spinner text-muted" />
          <span className="text-sm text-muted">Loading history...</span>
        </div>
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="min-h-screen pb-24">
        <div className="content-container max-w-2xl">
          <div className="empty-state">
            <p className="empty-state-label">
              No data yet
            </p>
            <p className="text-sm text-secondary">
              Start tracking habits to see your history.
            </p>
            <a
              href="/app"
              className="btn btn-primary mt-6"
            >
              Go to Streaks
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              label="Best"
              value={stats.bestStreak ? `${stats.bestStreak.days}` : '0'}
              sublabel={stats.bestStreak?.habitName || '—'}
            />
            <StatCard
              label="Active"
              value={`${stats.currentStreaks}`}
              sublabel="habits"
            />
            <StatCard
              label="Total"
              value={`${stats.totalActiveDays}`}
              sublabel="days"
            />
          </div>

          {/* Contribution section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setSelectedHabitId(null)}
                className={`filter-btn ${selectedHabitId === null ? 'filter-btn-active' : 'filter-btn-inactive'}`}
              >
                All
              </button>
              {habits.map(habit => (
                <button
                  key={habit.id}
                  onClick={() => setSelectedHabitId(habit.id)}
                  className={`filter-btn ${selectedHabitId === habit.id ? 'filter-btn-active' : 'filter-btn-inactive'}`}
                >
                  {habit.name}
                </button>
              ))}
            </div>

            <div className="card card-padded overflow-x-auto">
              <ContributionGrid filterHabitId={selectedHabitId} />
            </div>
          </div>

          {/* Journeys - Habit list with expandable history */}
          <div>
            <p className="text-10 text-muted uppercase tracking-ultra-wide mb-3">
              Journeys
            </p>
            <div className="space-y-2">
              {habits.map((habit, index) => (
                <HabitJourneyCard
                  key={habit.id}
                  habit={habit}
                  index={index}
                  isExpanded={expandedHabitId === habit.id}
                  onToggle={() => toggleExpanded(habit.id)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <div className="stat-card">
      <p className="stat-label">
        {label}
      </p>
      <p className="stat-value">{value}</p>
      <p className="stat-sublabel">{sublabel}</p>
    </div>
  );
}

function HabitJourneyCard({
  habit,
  index,
  isExpanded,
  onToggle,
}: {
  habit: Habit;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const completedDates = habit.completedDates || [];
  const currentStreak = calculateCurrentStreak(completedDates);
  const bestStreak = getBestStreak(habit);
  const totalDays = getTotalDays(habit);
  const hasHistory = (habit.history || []).length > 0;
  const streakStartDate = getStreakStartDate(completedDates);

  // Sort history by start date (most recent first)
  const sortedHistory = [...habit.history].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="journey-card"
    >
      {/* Main row - clickable if has history */}
      <button
        onClick={hasHistory ? onToggle : undefined}
        className={`journey-card-main ${hasHistory ? 'journey-card-main-clickable' : 'journey-card-main-static'}`}
        disabled={!hasHistory}
      >
        <div className="journey-card-left">
          <span className="journey-card-days">
            {currentStreak}
          </span>
          <div>
            <p className="journey-card-name">{habit.name}</p>
            <p className="journey-card-stats">
              Best {bestStreak}d · Total {totalDays}d
            </p>
          </div>
        </div>
        <div className="journey-card-right">
          <span className="journey-card-returns">
            {habit.history.length} {habit.history.length === 1 ? 'return' : 'returns'}
          </span>
          {hasHistory && (
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-muted" />
            </motion.div>
          )}
        </div>
      </button>

      {/* Expanded journey history */}
      <AnimatePresence>
        {isExpanded && hasHistory && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="journey-card-expanded">
              <p className="journey-card-expanded-title">
                Past journeys
              </p>
              <div className="space-y-2">
                {/* Current journey */}
                {currentStreak > 0 && streakStartDate && (
                  <div className="journey-entry journey-entry-current">
                    <div>
                      <p className="journey-entry-title">Current streak</p>
                      <p className="journey-entry-date">
                        {format(parseISO(streakStartDate), 'MMM d, yyyy')} — present
                      </p>
                    </div>
                    <span className="journey-entry-days">{currentStreak}d</span>
                  </div>
                )}

                {/* Past journeys */}
                {sortedHistory.map((record, i) => (
                  <div
                    key={`${record.startDate}-${i}`}
                    className="journey-entry journey-entry-past"
                  >
                    <div>
                      <p className="journey-entry-title journey-entry-title-past">Journey {sortedHistory.length - i}</p>
                      <p className="journey-entry-date">
                        {format(parseISO(record.startDate), 'MMM d')} — {format(parseISO(record.endDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <span className="journey-entry-days journey-entry-days-past">{record.days}d</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
