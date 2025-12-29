import { f as getTodayISO, c as calculateCurrentStreak } from './streaks_am8h9NaR.mjs';
import { subDays, parseISO, format, isSameMonth, startOfMonth, differenceInHours } from 'date-fns';

function calculateMomentum(habits) {
  if (habits.length === 0) {
    return {
      score: 0,
      trend: "stable",
      weeklyCompletion: 0,
      message: "Add a habit to start building momentum"
    };
  }
  const today = /* @__PURE__ */ new Date();
  const last7Days = [];
  const last30Days = [];
  for (let i = 0; i < 7; i++) {
    last7Days.push(format(subDays(today, i), "yyyy-MM-dd"));
  }
  for (let i = 0; i < 30; i++) {
    last30Days.push(format(subDays(today, i), "yyyy-MM-dd"));
  }
  let weeklyCompleted = 0;
  let weeklyTotal = 0;
  let monthlyCompleted = 0;
  let monthlyTotal = 0;
  habits.forEach((habit) => {
    const completedSet = new Set(habit.completedDates || []);
    last7Days.forEach((date) => {
      weeklyTotal++;
      if (completedSet.has(date)) weeklyCompleted++;
    });
    last30Days.forEach((date) => {
      monthlyTotal++;
      if (completedSet.has(date)) monthlyCompleted++;
    });
  });
  const weeklyRate = weeklyTotal > 0 ? weeklyCompleted / weeklyTotal : 0;
  const monthlyRate = monthlyTotal > 0 ? monthlyCompleted / monthlyTotal : 0;
  const score = Math.round((weeklyRate * 0.7 + monthlyRate * 0.3) * 100);
  const lastWeekDays = [];
  for (let i = 7; i < 14; i++) {
    lastWeekDays.push(format(subDays(today, i), "yyyy-MM-dd"));
  }
  let lastWeekCompleted = 0;
  let lastWeekTotal = 0;
  habits.forEach((habit) => {
    const completedSet = new Set(habit.completedDates || []);
    lastWeekDays.forEach((date) => {
      lastWeekTotal++;
      if (completedSet.has(date)) lastWeekCompleted++;
    });
  });
  const lastWeekRate = lastWeekTotal > 0 ? lastWeekCompleted / lastWeekTotal : 0;
  let trend = "stable";
  if (weeklyRate > lastWeekRate + 0.1) trend = "up";
  else if (weeklyRate < lastWeekRate - 0.1) trend = "down";
  const message = getMomentumMessage(score, trend);
  return {
    score,
    trend,
    weeklyCompletion: Math.round(weeklyRate * 100),
    message
  };
}
function getMomentumMessage(score, trend, weeklyRate) {
  if (score >= 90) return "Unstoppable. You're in the zone.";
  if (score >= 75) return "Strong momentum. Keep pushing.";
  if (score >= 50) {
    if (trend === "up") return "Building steam. You're improving.";
    return "Steady progress. Stay consistent.";
  }
  if (score >= 25) {
    if (trend === "down") return "Momentum slipping. One day at a time.";
    return "Room to grow. Every check-in counts.";
  }
  return "Fresh start available. Begin today.";
}
function getAllStreakStatuses(habits) {
  const today = getTodayISO();
  const now = /* @__PURE__ */ new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);
  const hoursLeft = Math.max(0, differenceInHours(endOfDay, now));
  const statuses = /* @__PURE__ */ new Map();
  habits.forEach((habit) => {
    const currentStreak = calculateCurrentStreak(habit.completedDates || []);
    const completedToday = (habit.completedDates || []).includes(today);
    if (currentStreak === 0 || completedToday) {
      statuses.set(habit.id, {
        isAtRisk: false,
        hoursRemaining: hoursLeft,
        riskLevel: "safe"
      });
    } else {
      let riskLevel = "safe";
      if (hoursLeft <= 2) riskLevel = "danger";
      else if (hoursLeft <= 6) riskLevel = "warning";
      statuses.set(habit.id, {
        isAtRisk: true,
        hoursRemaining: hoursLeft,
        riskLevel
      });
    }
  });
  return statuses;
}
const MORNING_MESSAGES = [
  { title: "New day, same mission", subtitle: "Your future self is counting on you" },
  { title: "Discipline is freedom", subtitle: "Every small win compounds" },
  { title: "You showed up", subtitle: "That's already more than most" },
  { title: "Progress over perfection", subtitle: "Just keep moving forward" },
  { title: "The best time is now", subtitle: "Don't break the chain" },
  { title: "One day at a time", subtitle: "That's all it takes" },
  { title: "You're building something", subtitle: "Trust the process" },
  { title: "Consistency beats intensity", subtitle: "Show up again today" }
];
function getDailyMessage(habits) {
  getTodayISO();
  const dayOfYear = Math.floor(
    ((/* @__PURE__ */ new Date()).getTime() - new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 0).getTime()) / (1e3 * 60 * 60 * 24)
  );
  if (habits.length === 0) {
    return {
      title: "Begin your journey",
      subtitle: "Add your first habit to start tracking"
    };
  }
  let longestStreak = 0;
  let longestHabit = "";
  habits.forEach((habit) => {
    const streak = calculateCurrentStreak(habit.completedDates || []);
    if (streak > longestStreak) {
      longestStreak = streak;
      longestHabit = habit.name;
    }
  });
  if (longestStreak === 7) {
    return {
      title: "One week strong",
      subtitle: `${longestHabit} is becoming a habit`,
      stat: "7 days"
    };
  }
  if (longestStreak === 30) {
    return {
      title: "One month achieved",
      subtitle: `${longestHabit} is now part of you`,
      stat: "30 days"
    };
  }
  if (longestStreak === 100) {
    return {
      title: "Century reached",
      subtitle: "You've proven what's possible",
      stat: "100 days"
    };
  }
  if (longestStreak >= 14) {
    return {
      title: `Day ${longestStreak}`,
      subtitle: `You've outlasted most who start`,
      stat: `${longestHabit}`
    };
  }
  const message = MORNING_MESSAGES[dayOfYear % MORNING_MESSAGES.length];
  if (longestStreak > 0) {
    return {
      ...message,
      stat: `${longestStreak}d streak`
    };
  }
  return message;
}
const FREEZES_PER_MONTH = 1;
const SETTINGS_KEY = "romika_app_settings";
function getAppSettings() {
  if (typeof window === "undefined") {
    return getDefaultSettings();
  }
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) {
    const defaults = getDefaultSettings();
    saveAppSettings(defaults);
    return defaults;
  }
  const settings = JSON.parse(stored);
  const resetDate = parseISO(settings.freezesResetDate);
  const now = /* @__PURE__ */ new Date();
  if (!isSameMonth(resetDate, now)) {
    settings.freezesRemaining = FREEZES_PER_MONTH;
    settings.freezesResetDate = format(startOfMonth(now), "yyyy-MM-dd");
    saveAppSettings(settings);
  }
  return settings;
}
function getDefaultSettings() {
  return {
    freezesRemaining: FREEZES_PER_MONTH,
    freezesResetDate: format(startOfMonth(/* @__PURE__ */ new Date()), "yyyy-MM-dd"),
    lastVisitDate: getTodayISO(),
    totalXp: 0
  };
}
function saveAppSettings(settings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
function canUseFreeze() {
  const settings = getAppSettings();
  return settings.freezesRemaining > 0;
}
function getFreezesRemaining() {
  return getAppSettings().freezesRemaining;
}
function getCompletionRate(habit, days = 30) {
  const today = /* @__PURE__ */ new Date();
  const startDate = subDays(today, days - 1);
  const habitCreated = parseISO(habit.createdAt);
  const effectiveStart = habitCreated > startDate ? habitCreated : startDate;
  let totalDays = 0;
  let completedDays = 0;
  const completedSet = new Set(habit.completedDates || []);
  for (let i = 0; i < days; i++) {
    const date = subDays(today, i);
    if (date < effectiveStart) break;
    const dateStr = format(date, "yyyy-MM-dd");
    totalDays++;
    if (completedSet.has(dateStr)) completedDays++;
  }
  return totalDays > 0 ? Math.round(completedDays / totalDays * 100) : 0;
}
function getBestDayOfWeek(habit) {
  const completedDates = habit.completedDates || [];
  if (completedDates.length < 7) return null;
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];
  const dayTotals = [0, 0, 0, 0, 0, 0, 0];
  const today = /* @__PURE__ */ new Date();
  for (let i = 0; i < 90; i++) {
    const date = subDays(today, i);
    const dayOfWeek = date.getDay();
    const dateStr = format(date, "yyyy-MM-dd");
    dayTotals[dayOfWeek]++;
    if (completedDates.includes(dateStr)) {
      dayCounts[dayOfWeek]++;
    }
  }
  let bestDay = 0;
  let bestRate = 0;
  for (let i = 0; i < 7; i++) {
    const rate = dayTotals[i] > 0 ? dayCounts[i] / dayTotals[i] : 0;
    if (rate > bestRate) {
      bestRate = rate;
      bestDay = i;
    }
  }
  return {
    day: dayNames[bestDay],
    rate: Math.round(bestRate * 100)
  };
}
function getMilestoneProgress(currentStreak) {
  const milestones = [7, 14, 30, 60, 90, 100, 180, 365];
  let nextMilestone = milestones[milestones.length - 1];
  for (const milestone of milestones) {
    if (currentStreak < milestone) {
      nextMilestone = milestone;
      break;
    }
  }
  const prevMilestone = milestones.filter((m) => m <= currentStreak).pop() || 0;
  const progress = (currentStreak - prevMilestone) / (nextMilestone - prevMilestone) * 100;
  return {
    current: currentStreak,
    next: nextMilestone,
    progress: Math.min(100, Math.round(progress))
  };
}

export { getMilestoneProgress as a, getBestDayOfWeek as b, canUseFreeze as c, getFreezesRemaining as d, calculateMomentum as e, getDailyMessage as f, getCompletionRate as g, getAllStreakStatuses as h };
