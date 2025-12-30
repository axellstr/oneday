export interface Habit {
  id: string;
  name: string;
  icon: HabitIcon;
  createdAt: string;
  completedDates: string[];
  history: StreakRecord[];
}

export interface StreakRecord {
  startDate: string;
  endDate: string;
  days: number;
}

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
  icon: HabitIcon;
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
