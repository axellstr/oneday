import type { HabitColor, HabitIcon } from '../types';

export const HABIT_COLORS: Record<HabitColor, { bg: string; text: string; glow: string }> = {
  green: {
    bg: 'bg-[#39d353]',
    text: 'text-[#39d353]',
    glow: 'shadow-[0_0_30px_-5px_#39d353]',
  },
  blue: {
    bg: 'bg-[#58a6ff]',
    text: 'text-[#58a6ff]',
    glow: 'shadow-[0_0_30px_-5px_#58a6ff]',
  },
  purple: {
    bg: 'bg-[#a371f7]',
    text: 'text-[#a371f7]',
    glow: 'shadow-[0_0_30px_-5px_#a371f7]',
  },
  orange: {
    bg: 'bg-[#f0883e]',
    text: 'text-[#f0883e]',
    glow: 'shadow-[0_0_30px_-5px_#f0883e]',
  },
  pink: {
    bg: 'bg-[#db61a2]',
    text: 'text-[#db61a2]',
    glow: 'shadow-[0_0_30px_-5px_#db61a2]',
  },
  red: {
    bg: 'bg-[#f85149]',
    text: 'text-[#f85149]',
    glow: 'shadow-[0_0_30px_-5px_#f85149]',
  },
  yellow: {
    bg: 'bg-[#d29922]',
    text: 'text-[#d29922]',
    glow: 'shadow-[0_0_30px_-5px_#d29922]',
  },
  cyan: {
    bg: 'bg-[#3fb950]',
    text: 'text-[#3fb950]',
    glow: 'shadow-[0_0_30px_-5px_#3fb950]',
  },
};

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

export const COLOR_OPTIONS: HabitColor[] = [
  'green',
  'blue',
  'purple',
  'orange',
  'pink',
  'red',
  'yellow',
  'cyan',
];

export const STORAGE_KEY = '1day-habits';

export const MILESTONES = [7, 14, 30, 60, 90, 100, 180, 365];

