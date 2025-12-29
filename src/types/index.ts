export interface Habit {
  id: string;
  name: string;
  color: HabitColor;
  icon: HabitIcon;
  createdAt: string; // When habit was first created
  completedDates: string[]; // Array of ISO dates when habit was completed
  history: StreakRecord[]; // Past streaks for the grid
}

export interface StreakRecord {
  startDate: string;
  endDate: string; // When streak was broken/reset
  days: number; // Total days achieved
}

export type HabitColor =
  | 'green'
  | 'blue'
  | 'purple'
  | 'orange'
  | 'pink'
  | 'red'
  | 'yellow'
  | 'cyan';

export type HabitIcon =
  | 'cigarette-off'
  | 'dumbbell'
  | 'brain'
  | 'droplet'
  | 'book'
  | 'moon'
  | 'heart'
  | 'coffee'
  | 'leaf'
  | 'target'
  | 'zap'
  | 'smile';

export interface HabitFormData {
  name: string;
  color: HabitColor;
  icon: HabitIcon;
}

export interface DayData {
  date: string;
  activeHabits: number;
  totalHabits: number;
  level: 0 | 1 | 2 | 3 | 4;
}

