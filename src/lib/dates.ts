import { parseISO, format, startOfDay, eachDayOfInterval, subDays, isWithinInterval, addDays } from 'date-fns';

/**
 * Calculate the current streak from an array of completed dates
 * A streak is consecutive days ending today or yesterday
 */
export function calculateCurrentStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;
  
  const today = getTodayISO();
  const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
  const sortedDates = [...completedDates].sort().reverse();
  
  // Check if streak is active (completed today or yesterday)
  const mostRecent = sortedDates[0];
  if (mostRecent !== today && mostRecent !== yesterday) {
    return 0;
  }
  
  // Count consecutive days backwards
  let streak = 0;
  let expectedDate = mostRecent;
  
  for (const date of sortedDates) {
    if (date === expectedDate) {
      streak++;
      // Move to previous day
      expectedDate = format(subDays(parseISO(expectedDate), 1), 'yyyy-MM-dd');
    } else if (date < expectedDate) {
      // Gap in dates, streak ends
      break;
    }
  }
  
  return streak;
}

/**
 * Get the start date of the current streak
 */
export function getStreakStartDate(completedDates: string[]): string | null {
  if (!completedDates || completedDates.length === 0) return null;
  
  const today = getTodayISO();
  const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');
  const sortedDates = [...completedDates].sort().reverse();
  
  const mostRecent = sortedDates[0];
  if (mostRecent !== today && mostRecent !== yesterday) {
    return null;
  }
  
  let expectedDate = mostRecent;
  let streakStart = mostRecent;
  
  for (const date of sortedDates) {
    if (date === expectedDate) {
      streakStart = date;
      expectedDate = format(subDays(parseISO(expectedDate), 1), 'yyyy-MM-dd');
    } else if (date < expectedDate) {
      break;
    }
  }
  
  return streakStart;
}

/**
 * Get today's date as ISO string (YYYY-MM-DD)
 */
export function getTodayISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Format a date for display
 */
export function formatDate(dateString: string): string {
  return format(parseISO(dateString), 'MMM d, yyyy');
}

/**
 * Format days count with proper pluralization
 */
export function formatDaysLabel(days: number): string {
  return days === 1 ? 'DAY' : 'DAYS';
}

/**
 * Get an array of dates for the last N days
 */
export function getLastNDays(n: number): string[] {
  const end = startOfDay(new Date());
  const start = subDays(end, n - 1);
  
  return eachDayOfInterval({ start, end }).map(date => format(date, 'yyyy-MM-dd'));
}

/**
 * Check if a date falls within a date range
 */
export function isDateInRange(dateStr: string, startStr: string, endStr: string | null): boolean {
  const date = parseISO(dateStr);
  const start = parseISO(startStr);
  const end = endStr ? parseISO(endStr) : new Date();
  
  return isWithinInterval(date, { start, end });
}

/**
 * Get the week day index (0 = Monday, 6 = Sunday)
 */
export function getWeekDayIndex(dateStr: string): number {
  const date = parseISO(dateStr);
  const day = date.getDay();
  // Convert Sunday (0) to 6, and shift others down by 1
  return day === 0 ? 6 : day - 1;
}

/**
 * Get month label for a date
 */
export function getMonthLabel(dateStr: string): string {
  return format(parseISO(dateStr), 'MMM');
}

