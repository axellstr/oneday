import type { HabitIcon } from '../types';

export const HABIT_ICONS: HabitIcon[] = [
  'cigarette-off',
  'dumbbell',
  'brain',
  'droplet',
  'book',
  'moon',
  'heart',
  'coffee',
  'leaf',
  'target',
  'zap',
  'smile',
];

export const STORAGE_KEY = 'oneday_habits';

export const MILESTONES = [7, 14, 30, 60, 90, 100, 180, 365];

// App launch date - no data should be shown before this date
// TODO: Change to '2026-01-01' before going live!
export const APP_LAUNCH_DATE = '2025-12-31';