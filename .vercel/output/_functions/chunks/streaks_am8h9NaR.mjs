import { atom, computed } from 'nanostores';
import { s as supabase } from './supabase_BbHOPZcp.mjs';
import { $ as $user } from './auth__ZTN3it3.mjs';
import { format, subDays, parseISO, startOfDay, eachDayOfInterval } from 'date-fns';

function calculateCurrentStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0;
  const today = getTodayISO();
  const yesterday = format(subDays(/* @__PURE__ */ new Date(), 1), "yyyy-MM-dd");
  const sortedDates = [...completedDates].sort().reverse();
  const mostRecent = sortedDates[0];
  if (mostRecent !== today && mostRecent !== yesterday) {
    return 0;
  }
  let streak = 0;
  let expectedDate = mostRecent;
  for (const date of sortedDates) {
    if (date === expectedDate) {
      streak++;
      expectedDate = format(subDays(parseISO(expectedDate), 1), "yyyy-MM-dd");
    } else if (date < expectedDate) {
      break;
    }
  }
  return streak;
}
function getStreakStartDate(completedDates) {
  if (!completedDates || completedDates.length === 0) return null;
  const today = getTodayISO();
  const yesterday = format(subDays(/* @__PURE__ */ new Date(), 1), "yyyy-MM-dd");
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
      expectedDate = format(subDays(parseISO(expectedDate), 1), "yyyy-MM-dd");
    } else if (date < expectedDate) {
      break;
    }
  }
  return streakStart;
}
function getTodayISO() {
  return format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
}
function formatDate(dateString) {
  return format(parseISO(dateString), "MMM d, yyyy");
}
function getLastNDays(n) {
  const end = startOfDay(/* @__PURE__ */ new Date());
  const start = subDays(end, n - 1);
  return eachDayOfInterval({ start, end }).map((date) => format(date, "yyyy-MM-dd"));
}

const $habits = atom([]);
const $habitsLoading = atom(true);
const $habitsError = atom(null);
const $isModalOpen = atom(false);
const $editingHabit = atom(null);
computed($habits, (habits) => {
  return [...habits].sort((a, b) => {
    const aStreak = calculateCurrentStreak(a.completedDates || []);
    const bStreak = calculateCurrentStreak(b.completedDates || []);
    return bStreak - aStreak;
  });
});
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
async function initializeStore() {
  const user = $user.get();
  if (!user) {
    $habits.set([]);
    $habitsLoading.set(false);
    return;
  }
  $habitsLoading.set(true);
  $habitsError.set(null);
  try {
    const { data, error } = await supabase.from("user_habits").select("habit_data").eq("user_id", user.id).single();
    if (error) {
      if (error.code === "PGRST116") {
        $habits.set([]);
        $habitsLoading.set(false);
        return;
      }
      throw error;
    }
    const habits = data?.habit_data || [];
    $habits.set(habits);
  } catch (error) {
    console.error("Error loading habits:", error);
    $habitsError.set("Failed to load habits");
    $habits.set([]);
  } finally {
    $habitsLoading.set(false);
  }
}
async function saveHabits(habits) {
  const user = $user.get();
  if (!user) {
    console.warn("Cannot save habits: not authenticated");
    return;
  }
  try {
    const { error } = await supabase.from("user_habits").upsert({
      user_id: user.id,
      habit_data: habits,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }, {
      onConflict: "user_id"
    });
    if (error) {
      console.error("Error saving habits:", error);
      $habitsError.set("Failed to save habits");
    }
  } catch (error) {
    console.error("Error saving habits:", error);
    $habitsError.set("Failed to save habits");
  }
}
function addHabit(data) {
  const habits = $habits.get();
  const today = getTodayISO();
  const newHabit = {
    id: generateId(),
    name: data.name,
    color: data.color,
    icon: data.icon,
    createdAt: today,
    completedDates: [today],
    // Start with today completed
    history: [],
    frequency: data.frequency || "daily",
    targetStreak: data.targetStreak,
    freezesUsed: []
  };
  const updated = [...habits, newHabit];
  $habits.set(updated);
  saveHabits(updated);
  closeModal();
}
function updateHabit(id, data) {
  const habits = $habits.get();
  const updated = habits.map(
    (h) => h.id === id ? { ...h, name: data.name, color: data.color, icon: data.icon } : h
  );
  $habits.set(updated);
  saveHabits(updated);
  closeModal();
}
function deleteHabit(id) {
  const habits = $habits.get();
  const updated = habits.filter((h) => h.id !== id);
  $habits.set(updated);
  saveHabits(updated);
  closeModal();
}
function toggleComplete(id, date) {
  const habits = $habits.get();
  const targetDate = getTodayISO();
  const updated = habits.map((h) => {
    if (h.id !== id) return h;
    const completedDates = h.completedDates || [];
    const isCompleted = completedDates.includes(targetDate);
    if (isCompleted) {
      return {
        ...h,
        completedDates: completedDates.filter((d) => d !== targetDate)
      };
    } else {
      const newDates = [...completedDates, targetDate].sort();
      return {
        ...h,
        completedDates: newDates
      };
    }
  });
  $habits.set(updated);
  saveHabits(updated);
}
function openModal(habit) {
  $editingHabit.set(habit ?? null);
  $isModalOpen.set(true);
}
function closeModal() {
  $isModalOpen.set(false);
  $editingHabit.set(null);
}

function getBestStreak(habit) {
  const currentStreak = calculateCurrentStreak(habit.completedDates || []);
  const history = habit.history || [];
  const bestFromHistory = history.reduce((max, record) => Math.max(max, record.days), 0);
  return Math.max(currentStreak, bestFromHistory);
}
function getTotalDays(habit) {
  return (habit.completedDates || []).length;
}
function wasHabitActiveOnDate(habit, dateStr) {
  if (!habit.completedDates) return false;
  return habit.completedDates.includes(dateStr);
}
function generateContributionData(habits, days = 365) {
  const dateList = getLastNDays(days);
  return dateList.map((date) => {
    let activeCount = 0;
    habits.forEach((habit) => {
      if (wasHabitActiveOnDate(habit, date)) {
        activeCount++;
      }
    });
    const totalHabits = habits.length;
    const ratio = totalHabits > 0 ? activeCount / totalHabits : 0;
    let level = 0;
    if (ratio > 0 && ratio <= 0.25) level = 1;
    else if (ratio > 0.25 && ratio <= 0.5) level = 2;
    else if (ratio > 0.5 && ratio <= 0.75) level = 3;
    else if (ratio > 0.75) level = 4;
    return {
      date,
      activeHabits: activeCount,
      totalHabits,
      level
    };
  });
}
function getGlobalStats(habits) {
  if (habits.length === 0) {
    return { totalActiveDays: 0, bestStreak: null, currentStreaks: 0 };
  }
  let bestStreak = null;
  let totalActiveDays = 0;
  habits.forEach((habit) => {
    const best = getBestStreak(habit);
    const total = getTotalDays(habit);
    totalActiveDays += total;
    if (!bestStreak || best > bestStreak.days) {
      bestStreak = { days: best, habitName: habit.name };
    }
  });
  return {
    totalActiveDays,
    bestStreak,
    currentStreaks: habits.length
  };
}

export { $habits as $, $habitsLoading as a, getBestStreak as b, calculateCurrentStreak as c, getTotalDays as d, getStreakStartDate as e, getTodayISO as f, getGlobalStats as g, formatDate as h, initializeStore as i, generateContributionData as j, deleteHabit as k, $isModalOpen as l, $editingHabit as m, closeModal as n, openModal as o, addHabit as p, toggleComplete as t, updateHabit as u };
