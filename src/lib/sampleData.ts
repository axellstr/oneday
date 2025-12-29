import type { Habit, StreakRecord } from '../types';
import { subDays, format, eachDayOfInterval, parseISO } from 'date-fns';

/**
 * Generate an array of consecutive dates from startDaysAgo to endDaysAgo (inclusive)
 */
function generateDateRange(startDaysAgo: number, endDaysAgo: number): string[] {
  const today = new Date();
  const start = subDays(today, startDaysAgo);
  const end = subDays(today, endDaysAgo);
  return eachDayOfInterval({ start, end }).map(d => format(d, 'yyyy-MM-dd'));
}

/**
 * Generate sample habits with realistic 12-month history
 */
export function generateSampleHabits(): Habit[] {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');

  // Helper to create date string
  const dateStr = (daysAgo: number) => format(subDays(today, daysAgo), 'yyyy-MM-dd');

  // No Smoking - Current streak of 14 days, plus past streaks
  const noSmokingHistory: StreakRecord[] = [
    { startDate: dateStr(100), endDate: dateStr(70), days: 30 },
    { startDate: dateStr(65), endDate: dateStr(20), days: 45 },
  ];
  // Current streak: last 14 days including today
  const noSmokingCompleted = generateDateRange(13, 0);

  // Gym - Current streak of 5 days (checked in today), some gaps on weekends
  const gymHistory: StreakRecord[] = [
    { startDate: dateStr(60), endDate: dateStr(45), days: 15 },
    { startDate: dateStr(40), endDate: dateStr(20), days: 20 },
  ];
  // Current streak: last 5 days
  const gymCompleted = [
    ...generateDateRange(60, 45),
    ...generateDateRange(40, 20),
    ...generateDateRange(4, 0), // current streak
  ];

  // Meditation - Very consistent, current streak of 30 days
  const meditationHistory: StreakRecord[] = [
    { startDate: dateStr(90), endDate: dateStr(45), days: 45 },
  ];
  const meditationCompleted = [
    ...generateDateRange(90, 45),
    ...generateDateRange(29, 0), // current streak
  ];

  // Reading - Current streak of 7 days
  const readingHistory: StreakRecord[] = [
    { startDate: dateStr(80), endDate: dateStr(60), days: 20 },
    { startDate: dateStr(55), endDate: dateStr(30), days: 25 },
  ];
  const readingCompleted = [
    ...generateDateRange(80, 60),
    ...generateDateRange(55, 30),
    ...generateDateRange(6, 0), // current streak
  ];

  // No Alcohol - Current streak of 21 days
  const noAlcoholHistory: StreakRecord[] = [
    { startDate: dateStr(60), endDate: dateStr(30), days: 30 },
  ];
  const noAlcoholCompleted = [
    ...generateDateRange(60, 30),
    ...generateDateRange(20, 0), // current streak
  ];

  const habits: Habit[] = [
    {
      id: 'sample-no-smoking',
      name: 'No Smoking',
      color: 'red',
      icon: 'cigarette-off',
      createdAt: dateStr(100),
      completedDates: noSmokingCompleted,
      history: noSmokingHistory,
    },
    {
      id: 'sample-gym',
      name: 'Gym',
      color: 'blue',
      icon: 'dumbbell',
      createdAt: dateStr(60),
      completedDates: gymCompleted,
      history: gymHistory,
    },
    {
      id: 'sample-meditation',
      name: 'Meditation',
      color: 'purple',
      icon: 'brain',
      createdAt: dateStr(90),
      completedDates: meditationCompleted,
      history: meditationHistory,
    },
    {
      id: 'sample-reading',
      name: 'Reading',
      color: 'orange',
      icon: 'book',
      createdAt: dateStr(80),
      completedDates: readingCompleted,
      history: readingHistory,
    },
    {
      id: 'sample-no-alcohol',
      name: 'No Alcohol',
      color: 'green',
      icon: 'droplet',
      createdAt: dateStr(60),
      completedDates: noAlcoholCompleted,
      history: noAlcoholHistory,
    },
  ];

  return habits;
}

/**
 * Migrate old habit format (with startDate) to new format (with completedDates)
 */
function migrateHabits(habits: any[]): Habit[] {
  return habits.map(habit => {
    // If already has completedDates, return as-is
    if (habit.completedDates) {
      return habit as Habit;
    }
    
    // Convert old startDate format to completedDates
    const completedDates: string[] = [];
    
    // Add dates from current streak (startDate to today)
    if (habit.startDate) {
      const start = new Date(habit.startDate);
      const today = new Date();
      let current = new Date(start);
      
      while (current <= today) {
        completedDates.push(format(current, 'yyyy-MM-dd'));
        current.setDate(current.getDate() + 1);
      }
    }
    
    // Add dates from history
    if (habit.history && Array.isArray(habit.history)) {
      habit.history.forEach((record: any) => {
        if (record.startDate && record.endDate) {
          const start = new Date(record.startDate);
          const end = new Date(record.endDate);
          let current = new Date(start);
          
          while (current <= end) {
            const dateStr = format(current, 'yyyy-MM-dd');
            if (!completedDates.includes(dateStr)) {
              completedDates.push(dateStr);
            }
            current.setDate(current.getDate() + 1);
          }
        }
      });
    }
    
    // Sort and dedupe
    const uniqueDates = [...new Set(completedDates)].sort();
    
    return {
      id: habit.id,
      name: habit.name,
      color: habit.color,
      icon: habit.icon,
      createdAt: habit.createdAt,
      completedDates: uniqueDates,
      history: habit.history || [],
    } as Habit;
  });
}

/**
 * Initialize sample data if no habits exist, or migrate old format
 */
export function initializeSampleData(): void {
  const STORAGE_KEY = '1day-habits';
  
  if (typeof window === 'undefined') return;
  
  const existing = localStorage.getItem(STORAGE_KEY);
  
  // No data - add sample data
  if (!existing || existing === '[]') {
    const sampleHabits = generateSampleHabits();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleHabits));
    return;
  }
  
  // Check if we need to migrate
  try {
    const habits = JSON.parse(existing);
    if (Array.isArray(habits) && habits.length > 0) {
      // Check if first habit has old format (startDate but no completedDates)
      const needsMigration = habits.some((h: any) => h.startDate && !h.completedDates);
      
      if (needsMigration) {
        const migratedHabits = migrateHabits(habits);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedHabits));
      }
    }
  } catch (e) {
    // If parsing fails, reset to sample data
    const sampleHabits = generateSampleHabits();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleHabits));
  }
}

