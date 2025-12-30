import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CigaretteOff,
  Dumbbell,
  Brain,
  Droplet,
  Book,
  Moon,
  Heart,
  Coffee,
  Leaf,
  Target,
  Zap,
  Smile,
  Check,
  TrendingUp,
  Calendar,
  Award,
  Loader2,
} from 'lucide-react';
import type { Habit, HabitIcon } from '../types';
import { $habits, $habitsLoading, initializeStore, toggleComplete } from '../stores/habits';
import { $user, $authLoading, initializeAuth } from '../stores/auth';
import { calculateCurrentStreak, getTodayISO, formatDate } from '../lib/dates';
import { getBestStreak, getTotalDays } from '../lib/streaks';
import {
  getCompletionRate,
  getMilestoneProgress,
  getBestDayOfWeek,
} from '../lib/engagement';
import ContributionGrid from './ContributionGrid';

const ICON_MAP: Record<HabitIcon, React.ComponentType<{ className?: string }>> = {
  'cigarette-off': CigaretteOff,
  dumbbell: Dumbbell,
  brain: Brain,
  droplet: Droplet,
  book: Book,
  moon: Moon,
  heart: Heart,
  coffee: Coffee,
  leaf: Leaf,
  target: Target,
  zap: Zap,
  smile: Smile,
};

interface HabitDetailProps {
  habitId: string;
}

export default function HabitDetail({ habitId }: HabitDetailProps) {
  const habits = useStore($habits);
  const habitsLoading = useStore($habitsLoading);
  const user = useStore($user);
  const authLoading = useStore($authLoading);

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

  const habit = habits.find(h => h.id === habitId);
  const isLoading = authLoading || habitsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={24} className="auth-spinner text-muted" />
          <span className="text-sm text-muted">Loading...</span>
        </div>
      </div>
    );
  }

  if (!habit) {
    return (
      <div className="min-h-screen pb-24">
        <div className="content-container">
          <div className="empty-state">
            <p className="text-secondary">Habit not found</p>
            <a href="/app" className="btn btn-primary mt-6">
              Back to Streaks
            </a>
          </div>
        </div>
      </div>
    );
  }

  const Icon = ICON_MAP[habit.icon] || Target;
  const currentStreak = calculateCurrentStreak(habit.completedDates || []);
  const bestStreak = getBestStreak(habit);
  const totalDays = getTotalDays(habit);
  const completionRate = getCompletionRate(habit);
  const milestoneProgress = getMilestoneProgress(currentStreak);
  const bestDay = getBestDayOfWeek(habit);
  const today = getTodayISO();
  const isCompletedToday = (habit.completedDates || []).includes(today);

  const handleToggleComplete = () => {
    toggleComplete(habit.id);
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Back button */}
          <a
            href="/app"
            className="inline-flex items-center gap-2 text-muted text-sm transition-colors hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </a>

          {/* Header */}
          <div className="text-center py-8">
            <div className="habit-card-icon mx-auto mb-4">
              <Icon className="w-6 h-6 text-muted" />
            </div>
            <h1 className="text-2xl font-light text-white tracking-tight mb-1">
              {habit.name}
            </h1>
            <p className="text-xs text-muted uppercase tracking-widest">
              Since {formatDate(habit.createdAt)}
            </p>
          </div>

          {/* Big streak number */}
          <div className="text-center py-6">
            <motion.p
              key={currentStreak}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-7xl font-light text-white tabular-nums tracking-tighter"
            >
              {currentStreak}
            </motion.p>
            <p className="text-10 text-muted uppercase tracking-ultra-wide mt-2">
              Current Streak
            </p>
          </div>

          {/* Check-in button */}
          <div className="flex justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleComplete}
              className={`habit-card-checkin-btn px-8 ${
                isCompletedToday ? 'habit-card-checkin-done' : 'habit-card-checkin-pending'
              }`}
            >
              {isCompletedToday ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Done for today</span>
                </>
              ) : (
                <span>Check in</span>
              )}
            </motion.button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              icon={<Award className="w-4 h-4" />}
              label="Best"
              value={`${bestStreak}`}
              sublabel="days"
            />
            <StatCard
              icon={<Calendar className="w-4 h-4" />}
              label="Total"
              value={`${totalDays}`}
              sublabel="days"
            />
            <StatCard
              icon={<TrendingUp className="w-4 h-4" />}
              label="Rate"
              value={`${completionRate}%`}
              sublabel="30 days"
            />
          </div>

          {/* Milestone progress */}
          <div className="card card-padded">
            <div className="flex items-center justify-between mb-3">
              <p className="text-10 text-muted uppercase tracking-wider">
                Next milestone
              </p>
              <p className="text-sm text-white tabular-nums">
                {currentStreak} / {milestoneProgress.next} days
              </p>
            </div>
            <div className="milestone-bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${milestoneProgress.progress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="milestone-bar-fill"
              />
            </div>
            <div className="flex justify-between mt-2">
              {[7, 30, 100].map(milestone => (
                <span
                  key={milestone}
                  className={`text-10 ${
                    currentStreak >= milestone ? 'text-white' : 'text-muted'
                  }`}
                >
                  {milestone}d
                </span>
              ))}
            </div>
          </div>

          {/* Contribution grid */}
          <div className="card card-padded overflow-x-auto">
            <p className="text-10 text-muted uppercase tracking-wider mb-4">
              Activity
            </p>
            <ContributionGrid filterHabitId={habit.id} />
          </div>

          {/* Insights */}
          {bestDay && (
            <div className="card card-padded">
              <p className="text-10 text-muted uppercase tracking-wider mb-3">
                Insights
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary">Best day</span>
                <span className="text-sm text-white">
                  {bestDay.day} ({bestDay.rate}% completion)
                </span>
              </div>
            </div>
          )}

          {/* Journey history */}
          {habit.history && habit.history.length > 0 && (
            <div className="card">
              <div className="p-4 border-b border-default">
                <p className="text-10 text-muted uppercase tracking-wider">
                  Past journeys
                </p>
              </div>
              <div className="divide-y">
                {[...habit.history]
                  .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
                  .map((record, i) => (
                    <div key={i} className="p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-secondary">
                          Journey {habit.history.length - i}
                        </p>
                        <p className="text-xs text-muted mt-0.5">
                          {formatDate(record.startDate)} — {formatDate(record.endDate)}
                        </p>
                      </div>
                      <span className="text-lg text-white tabular-nums">
                        {record.days}d
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sublabel,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <div className="stat-card">
      <div className="flex items-center gap-2 mb-2 text-muted">
        {icon}
        <p className="text-10 uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-2xl font-light text-white tracking-tight">{value}</p>
      <p className="text-10 text-muted mt-1">{sublabel}</p>
    </div>
  );
}
