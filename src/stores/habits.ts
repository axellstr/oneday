import { atom, computed } from 'nanostores';
import type { Habit, HabitFormData } from '../types';
import { getHabits, saveHabits, generateId } from '../lib/storage';
import { getTodayISO, calculateCurrentStreak } from '../lib/dates';

// Main habits store
export const $habits = atom<Habit[]>([]);

// Modal state
export const $isModalOpen = atom<boolean>(false);
export const $editingHabit = atom<Habit | null>(null);

// Computed: sorted habits by streak length (longest first)
export const $sortedHabits = computed($habits, habits => {
  return [...habits].sort((a, b) => {
    const aStreak = calculateCurrentStreak(a.completedDates || []);
    const bStreak = calculateCurrentStreak(b.completedDates || []);
    return bStreak - aStreak;
  });
});

// Initialize store from localStorage
export function initializeStore(): void {
  const habits = getHabits();
  $habits.set(habits);
}

// Actions
export function addHabit(data: HabitFormData): void {
  const habits = $habits.get();
  const today = getTodayISO();
  
  const newHabit: Habit = {
    id: generateId(),
    name: data.name,
    color: data.color,
    icon: data.icon,
    createdAt: today,
    completedDates: [today], // Start with today completed
    history: [],
  };
  
  const updated = [...habits, newHabit];
  $habits.set(updated);
  saveHabits(updated);
  closeModal();
}

export function updateHabit(id: string, data: HabitFormData): void {
  const habits = $habits.get();
  const updated = habits.map(h =>
    h.id === id
      ? { ...h, name: data.name, color: data.color, icon: data.icon }
      : h
  );
  
  $habits.set(updated);
  saveHabits(updated);
  closeModal();
}

export function deleteHabit(id: string): void {
  const habits = $habits.get();
  const updated = habits.filter(h => h.id !== id);
  
  $habits.set(updated);
  saveHabits(updated);
  closeModal();
}

export function toggleComplete(id: string, date?: string): void {
  const habits = $habits.get();
  const targetDate = date || getTodayISO();
  
  const updated = habits.map(h => {
    if (h.id !== id) return h;
    
    const completedDates = h.completedDates || [];
    const isCompleted = completedDates.includes(targetDate);
    
    if (isCompleted) {
      // Remove the date
      return {
        ...h,
        completedDates: completedDates.filter(d => d !== targetDate),
      };
    } else {
      // Add the date (keep sorted)
      const newDates = [...completedDates, targetDate].sort();
      return {
        ...h,
        completedDates: newDates,
      };
    }
  });
  
  $habits.set(updated);
  saveHabits(updated);
}

export function isCompletedToday(habit: Habit): boolean {
  const today = getTodayISO();
  return (habit.completedDates || []).includes(today);
}

export function resetStreak(id: string): void {
  const habits = $habits.get();
  const today = getTodayISO();
  
  const updated = habits.map(h => {
    if (h.id !== id) return h;
    
    // Calculate current streak info
    const streakInfo = getStreakInfo(h.completedDates);
    
    // Only add to history if streak was more than 0 days
    const newHistory = streakInfo.currentStreak > 0
      ? [...h.history, { 
          startDate: streakInfo.streakStartDate || today, 
          endDate: today, 
          days: streakInfo.currentStreak 
        }]
      : h.history;
    
    // Keep all completed dates but the streak is now "broken" 
    // The next completion will start a fresh streak
    return {
      ...h,
      history: newHistory,
    };
  });
  
  $habits.set(updated);
  saveHabits(updated);
}

// Helper to get streak info from completed dates
function getStreakInfo(completedDates: string[] | undefined): { 
  currentStreak: number; 
  streakStartDate: string | null;
} {
  if (!completedDates || completedDates.length === 0) {
    return { currentStreak: 0, streakStartDate: null };
  }
  
  const today = getTodayISO();
  const yesterday = getYesterdayISO();
  const sortedDates = [...completedDates].sort().reverse();
  
  // Check if streak is active (completed today or yesterday)
  const mostRecent = sortedDates[0];
  if (mostRecent !== today && mostRecent !== yesterday) {
    return { currentStreak: 0, streakStartDate: null };
  }
  
  // Count consecutive days backwards
  let streak = 0;
  let currentDate = mostRecent;
  let streakStartDate = mostRecent;
  
  for (const date of sortedDates) {
    if (date === currentDate) {
      streak++;
      streakStartDate = date;
      // Move to previous day
      currentDate = getPreviousDayISO(currentDate);
    } else if (date < currentDate) {
      // Gap in dates, streak ends
      break;
    }
  }
  
  return { currentStreak: streak, streakStartDate };
}

function getYesterdayISO(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

function getPreviousDayISO(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 1);
  return date.toISOString().split('T')[0];
}

// Modal actions
export function openModal(habit?: Habit): void {
  $editingHabit.set(habit ?? null);
  $isModalOpen.set(true);
}

export function closeModal(): void {
  $isModalOpen.set(false);
  $editingHabit.set(null);
}

