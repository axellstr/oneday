import type { Habit, DayData } from '../types';
import { getLastNDays, calculateCurrentStreak } from './dates';

/**
 * Get the best streak ever for a habit
 */
export function getBestStreak(habit: Habit): number {
  // Current streak from completed dates
  const currentStreak = calculateCurrentStreak(habit.completedDates || []);
  
  // Best from history
  const history = habit.history || [];
  const bestFromHistory = history.reduce((max, record) => Math.max(max, record.days), 0);
  
  return Math.max(currentStreak, bestFromHistory);
}

/**
 * Get total days tracked (total completions)
 */
export function getTotalDays(habit: Habit): number {
  return (habit.completedDates || []).length;
}

/**
 * Check if a habit was completed on a specific date
 */
export function wasHabitActiveOnDate(habit: Habit, dateStr: string): boolean {
  if (!habit.completedDates) return false;
  return habit.completedDates.includes(dateStr);
}

/**
 * Generate contribution grid data for the last N days
 */
export function generateContributionData(habits: Habit[], days: number = 365): DayData[] {
  const dateList = getLastNDays(days);
  
  return dateList.map(date => {
    let activeCount = 0;
    
    habits.forEach(habit => {
      if (wasHabitActiveOnDate(habit, date)) {
        activeCount++;
      }
    });
    
    const totalHabits = habits.length;
    const ratio = totalHabits > 0 ? activeCount / totalHabits : 0;
    
    // Calculate level (0-4)
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (ratio > 0 && ratio <= 0.25) level = 1;
    else if (ratio > 0.25 && ratio <= 0.5) level = 2;
    else if (ratio > 0.5 && ratio <= 0.75) level = 3;
    else if (ratio > 0.75) level = 4;
    
    return {
      date,
      activeHabits: activeCount,
      totalHabits,
      level,
    };
  });
}

/**
 * Get statistics for all habits
 */
export function getGlobalStats(habits: Habit[]): {
  totalActiveDays: number;
  bestStreak: { days: number; habitName: string } | null;
  currentStreaks: number;
} {
  if (habits.length === 0) {
    return { totalActiveDays: 0, bestStreak: null, currentStreaks: 0 };
  }
  
  let bestStreak: { days: number; habitName: string } | null = null;
  let totalActiveDays = 0;
  
  habits.forEach(habit => {
    const best = getBestStreak(habit);
    const total = getTotalDays(habit);
    
    totalActiveDays += total;
    
    if (!bestStreak || best > bestStreak.days) {
      bestStreak = { days: best, habitName: habit.name };
    }
  });
  
  return {
    totalActiveDays,
    bestStreak,
    currentStreaks: habits.length,
  };
}

/**
 * Check if today is a milestone day for a habit
 */
export function getMilestone(days: number): number | null {
  const milestones = [7, 14, 30, 60, 90, 100, 180, 365, 500, 1000];
  return milestones.includes(days) ? days : null;
}

