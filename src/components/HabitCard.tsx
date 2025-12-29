import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
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
  MoreHorizontal,
  Pencil,
  Trash2,
  Check,
  AlertCircle,
} from 'lucide-react';
import type { Habit, HabitIcon, StreakStatus } from '../types';
import StreakCounter from './StreakCounter';
import { calculateCurrentStreak, getTodayISO } from '../lib/dates';
import { toggleComplete, openModal, deleteHabit } from '../stores/habits';
import { getBestStreak } from '../lib/streaks';

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

interface HabitCardProps {
  habit: Habit;
  streakStatus?: StreakStatus;
}

export default function HabitCard({ habit, streakStatus }: HabitCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const Icon = ICON_MAP[habit.icon] || Target;
  const completedDates = habit.completedDates || [];
  const days = calculateCurrentStreak(completedDates);
  const bestStreak = getBestStreak(habit);
  const today = getTodayISO();
  const isCompletedToday = completedDates.includes(today);
  const isAtRisk = streakStatus?.isAtRisk && days > 0;

  const handleToggleComplete = () => {
    toggleComplete(habit.id);
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    setShowDeleteConfirm(false);
  };

  const handleEdit = () => {
    openModal(habit);
    setShowMenu(false);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="habit-card"
      >
        {/* Menu button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="habit-card-menu-btn"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>

        {/* Menu dropdown */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="habit-card-menu"
            >
              <button
                onClick={handleEdit}
                className="habit-card-menu-item"
              >
                <Pencil className="w-3\.5 h-3\.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setShowMenu(false);
                }}
                className="habit-card-menu-item"
              >
                <Trash2 className="w-3\.5 h-3\.5" />
                <span>Delete</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close menu when clicking outside */}
        {showMenu && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
        )}

        {/* Content */}
        <div className="habit-card-content">
          {/* Clickable area for navigation */}
          <a
            href={`/app/habit/${habit.id}`}
            className="habit-card-link"
          >
            {/* At risk indicator */}
            {isAtRisk && (
              <div className="habit-card-risk">
                <AlertCircle className="w-3 h-3" />
                <span>{streakStatus?.hoursRemaining}h left</span>
              </div>
            )}

            {/* Header: Icon + Name */}
            <div className="habit-card-header">
              <div className="habit-card-icon">
                <Icon className="w-4 h-4 text-muted" />
              </div>
              <h3 className="habit-card-name">
                {habit.name}
              </h3>
            </div>

            {/* Hero: Streak counter */}
            <div className="habit-card-hero">
              <StreakCounter days={days} />
            </div>

            {/* Footer: Stats row */}
            <div className="habit-card-footer">
              {bestStreak > 0 && (
                <div className="habit-card-stat">
                  <span className="habit-card-stat-label">Best</span>
                  <span className="habit-card-stat-value">{bestStreak}d</span>
                </div>
              )}
              {!bestStreak && <div className="habit-card-stat-spacer" />}
            </div>
          </a>

          {/* Check-in button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleComplete}
            className={`habit-card-checkin-btn ${isCompletedToday ? 'habit-card-checkin-done' : 'habit-card-checkin-pending'}`}
          >
            {isCompletedToday ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Done</span>
              </>
            ) : (
              <span>Check in</span>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={e => e.stopPropagation()}
              className="modal-content max-w-sm"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Delete habit?
                </h3>
                <p className="text-sm text-secondary mb-6">
                  <span className="text-white">{habit.name}</span> and all history will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn btn-primary flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
