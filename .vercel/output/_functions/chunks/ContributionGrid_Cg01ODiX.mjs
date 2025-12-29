import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { useStore } from '@nanostores/react';
import { startOfWeek, subWeeks, format, getMonth, addDays, parseISO } from 'date-fns';
import { $ as $habits, j as generateContributionData } from './streaks_am8h9NaR.mjs';

const LEVEL_CLASSES = [
  "bg-level-0",
  // Level 0 - no activity
  "bg-level-1",
  // Level 1
  "bg-level-2",
  // Level 2
  "bg-level-3",
  // Level 3
  "bg-level-4"
  // Level 4
];
const DAYS_OF_WEEK = ["M", "", "W", "", "F", "", ""];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function ContributionGrid({ filterHabitId = null }) {
  const habits = useStore($habits);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { weeks, monthLabels } = useMemo(() => {
    const today = /* @__PURE__ */ new Date();
    const weeksToShow = 52;
    const startDate = startOfWeek(subWeeks(today, weeksToShow - 1), { weekStartsOn: 1 });
    const filteredHabits = filterHabitId ? habits.filter((h) => h.id === filterHabitId) : habits;
    const allDaysData = generateContributionData(filteredHabits, 365);
    const dayDataMap = new Map(allDaysData.map((d) => [d.date, d]));
    const weeks2 = [];
    const monthLabels2 = [];
    let currentDate = startDate;
    let lastMonth = -1;
    for (let week = 0; week < weeksToShow; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const dateStr = format(currentDate, "yyyy-MM-dd");
        const dayData = dayDataMap.get(dateStr);
        if (currentDate > today) {
          weekDays.push(null);
        } else if (dayData) {
          weekDays.push(dayData);
        } else {
          weekDays.push({
            date: dateStr,
            activeHabits: 0,
            totalHabits: 0,
            level: 0
          });
        }
        const month = getMonth(currentDate);
        if (month !== lastMonth && day === 0) {
          monthLabels2.push({ month, weekIndex: week });
          lastMonth = month;
        }
        currentDate = addDays(currentDate, 1);
      }
      weeks2.push(weekDays);
    }
    return { weeks: weeks2, monthLabels: monthLabels2 };
  }, [habits, filterHabitId]);
  const handleMouseEnter = (day, event) => {
    setHoveredDay(day);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };
  const handleMouseLeave = () => {
    setHoveredDay(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "contribution-wrapper", children: [
    /* @__PURE__ */ jsx("div", { className: "contribution-months", children: weeks.map((_, weekIndex) => {
      const monthLabel = monthLabels.find((m) => m.weekIndex === weekIndex);
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: "contribution-month-label",
          children: monthLabel ? MONTHS[monthLabel.month] : ""
        },
        weekIndex
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "contribution-grid", children: [
      /* @__PURE__ */ jsx("div", { className: "contribution-day-labels", children: DAYS_OF_WEEK.map((day, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "contribution-day-label",
          children: day
        },
        index
      )) }),
      /* @__PURE__ */ jsx("div", { className: "contribution-weeks", children: weeks.map((week, weekIndex) => /* @__PURE__ */ jsx("div", { className: "contribution-week", children: week.map((day, dayIndex) => /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: (weekIndex * 7 + dayIndex) * 5e-4 },
          className: `contribution-cell ${day === null ? "bg-transparent" : `${LEVEL_CLASSES[day.level]} contribution-cell-hover`}`,
          onMouseEnter: day ? (e) => handleMouseEnter(day, e) : void 0,
          onMouseLeave: handleMouseLeave
        },
        `${weekIndex}-${dayIndex}`
      )) }, weekIndex)) })
    ] }),
    hoveredDay && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "contribution-tooltip",
        style: {
          left: tooltipPosition.x,
          top: tooltipPosition.y,
          transform: "translate(-50%, -100%)"
        },
        children: [
          /* @__PURE__ */ jsxs("p", { className: "text-white", children: [
            hoveredDay.activeHabits,
            "/",
            hoveredDay.totalHabits,
            " active"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted mt-0\\.5", children: format(parseISO(hoveredDay.date), "MMM d, yyyy") })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "contribution-legend", children: [
      /* @__PURE__ */ jsx("span", { children: "Less" }),
      /* @__PURE__ */ jsx("div", { className: "contribution-legend-squares", children: LEVEL_CLASSES.map((levelClass, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: `contribution-legend-square ${levelClass}`
        },
        index
      )) }),
      /* @__PURE__ */ jsx("span", { children: "More" })
    ] })
  ] });
}

export { ContributionGrid as C };
