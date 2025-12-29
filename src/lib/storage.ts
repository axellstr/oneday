import type { Habit } from '../types';
import { STORAGE_KEY } from './constants';

/**
 * Get all habits from localStorage
 */
export function getHabits(): Habit[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Habit[];
  } catch (error) {
    console.error('Failed to parse habits from localStorage:', error);
    return [];
  }
}

/**
 * Save all habits to localStorage
 */
export function saveHabits(habits: Habit[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Failed to save habits to localStorage:', error);
  }
}

/**
 * Add a new habit
 */
export function addHabit(habit: Habit): Habit[] {
  const habits = getHabits();
  const updated = [...habits, habit];
  saveHabits(updated);
  return updated;
}

/**
 * Update an existing habit
 */
export function updateHabit(id: string, updates: Partial<Habit>): Habit[] {
  const habits = getHabits();
  const updated = habits.map(h => (h.id === id ? { ...h, ...updates } : h));
  saveHabits(updated);
  return updated;
}

/**
 * Delete a habit
 */
export function deleteHabit(id: string): Habit[] {
  const habits = getHabits();
  const updated = habits.filter(h => h.id !== id);
  saveHabits(updated);
  return updated;
}

/**
 * Reset a habit's streak (records current streak to history)
 */
export function resetHabitStreak(id: string): Habit[] {
  const habits = getHabits();
  const now = new Date().toISOString().split('T')[0];
  
  const updated = habits.map(h => {
    if (h.id !== id) return h;
    
    // Calculate days in current streak
    const startDate = new Date(h.startDate);
    const endDate = new Date(now);
    const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Only add to history if streak was more than 0 days
    const newHistory = days > 0
      ? [...h.history, { startDate: h.startDate, endDate: now, days }]
      : h.history;
    
    return {
      ...h,
      startDate: now,
      history: newHistory,
    };
  });
  
  saveHabits(updated);
  return updated;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

