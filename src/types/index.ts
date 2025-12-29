export interface Habit {
  id: string;
  name: string;
  color: HabitColor;
  icon: HabitIcon;
  createdAt: string;
  completedDates: string[];
  history: StreakRecord[];
  
  // Habit settings
  frequency: HabitFrequency;
  targetStreak?: number;
  reminderTime?: string; // HH:MM format
  
  // Engagement
  freezesUsed: string[]; // Dates when freezes were applied
}

export interface StreakRecord {
  startDate: string;
  endDate: string;
  days: number;
}

export type HabitFrequency = 'daily' | 'weekdays' | 'weekends' | 'custom';

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
  frequency?: HabitFrequency;
  targetStreak?: number;
}

export interface DayData {
  date: string;
  activeHabits: number;
  totalHabits: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// Engagement types
export interface MomentumData {
  score: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  weeklyCompletion: number; // percentage
  message: string;
}

export interface StreakStatus {
  isAtRisk: boolean;
  hoursRemaining: number;
  riskLevel: 'safe' | 'warning' | 'danger';
}

export interface DailyMessage {
  title: string;
  subtitle: string;
  stat?: string;
}

// App-wide settings stored locally
export interface AppSettings {
  freezesRemaining: number;
  freezesResetDate: string; // First of current month
  lastVisitDate: string;
  totalXp: number;
}
