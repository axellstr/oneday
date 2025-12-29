import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_9vvDxKFD.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_2B62Wkg_.mjs';
import { $ as $$Header } from '../../chunks/Header_DW_gX_fR.mjs';
import { $ as $$Navigation } from '../../chunks/Navigation_DE36LWRd.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, ChevronDown } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { $ as $habits, a as $habitsLoading, i as initializeStore, g as getGlobalStats, c as calculateCurrentStreak, b as getBestStreak, d as getTotalDays, e as getStreakStartDate } from '../../chunks/streaks_am8h9NaR.mjs';
import { $ as $user, a as $authLoading, i as initializeAuth } from '../../chunks/auth__ZTN3it3.mjs';
import { C as ContributionGrid } from '../../chunks/ContributionGrid_Cg01ODiX.mjs';
export { renderers } from '../../renderers.mjs';

function HistoryView() {
  const habits = useStore($habits);
  const habitsLoading = useStore($habitsLoading);
  const user = useStore($user);
  const authLoading = useStore($authLoading);
  const [selectedHabitId, setSelectedHabitId] = useState(null);
  const [expandedHabitId, setExpandedHabitId] = useState(null);
  useEffect(() => {
    initializeAuth();
  }, []);
  useEffect(() => {
    if (user) {
      initializeStore();
    }
  }, [user]);
  const stats = getGlobalStats(habits);
  const isLoading = authLoading || habitsLoading;
  const toggleExpanded = (habitId) => {
    setExpandedHabitId(expandedHabitId === habitId ? null : habitId);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsx(Loader2, { size: 24, className: "auth-spinner text-muted" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-muted", children: "Loading history..." })
    ] }) });
  }
  if (habits.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen pb-24", children: /* @__PURE__ */ jsx("div", { className: "content-container max-w-2xl", children: /* @__PURE__ */ jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsx("p", { className: "empty-state-label", children: "No data yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-secondary", children: "Start tracking habits to see your history." }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/app",
          className: "btn btn-primary mt-6",
          children: "Go to Streaks"
        }
      )
    ] }) }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pb-24", children: /* @__PURE__ */ jsx("div", { className: "content-container", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "space-y-8",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Best",
              value: stats.bestStreak ? `${stats.bestStreak.days}` : "0",
              sublabel: stats.bestStreak?.habitName || "—"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Active",
              value: `${stats.currentStreaks}`,
              sublabel: "habits"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              label: "Total",
              value: `${stats.totalActiveDays}`,
              sublabel: "days"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedHabitId(null),
                className: `filter-btn ${selectedHabitId === null ? "filter-btn-active" : "filter-btn-inactive"}`,
                children: "All"
              }
            ),
            habits.map((habit) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedHabitId(habit.id),
                className: `filter-btn ${selectedHabitId === habit.id ? "filter-btn-active" : "filter-btn-inactive"}`,
                children: habit.name
              },
              habit.id
            ))
          ] }),
          /* @__PURE__ */ jsx("div", { className: "card card-padded overflow-x-auto", children: /* @__PURE__ */ jsx(ContributionGrid, { filterHabitId: selectedHabitId }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-10 text-muted uppercase tracking-ultra-wide mb-3", children: "Journeys" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: habits.map((habit, index) => /* @__PURE__ */ jsx(
            HabitJourneyCard,
            {
              habit,
              index,
              isExpanded: expandedHabitId === habit.id,
              onToggle: () => toggleExpanded(habit.id)
            },
            habit.id
          )) })
        ] })
      ]
    }
  ) }) });
}
function StatCard({
  label,
  value,
  sublabel
}) {
  return /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
    /* @__PURE__ */ jsx("p", { className: "stat-label", children: label }),
    /* @__PURE__ */ jsx("p", { className: "stat-value", children: value }),
    /* @__PURE__ */ jsx("p", { className: "stat-sublabel", children: sublabel })
  ] });
}
function HabitJourneyCard({
  habit,
  index,
  isExpanded,
  onToggle
}) {
  const completedDates = habit.completedDates || [];
  const currentStreak = calculateCurrentStreak(completedDates);
  const bestStreak = getBestStreak(habit);
  const totalDays = getTotalDays(habit);
  const hasHistory = (habit.history || []).length > 0;
  const streakStartDate = getStreakStartDate(completedDates);
  const sortedHistory = [...habit.history].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 5 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.03 },
      className: "journey-card",
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: hasHistory ? onToggle : void 0,
            className: `journey-card-main ${hasHistory ? "journey-card-main-clickable" : "journey-card-main-static"}`,
            disabled: !hasHistory,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "journey-card-left", children: [
                /* @__PURE__ */ jsx("span", { className: "journey-card-days", children: currentStreak }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "journey-card-name", children: habit.name }),
                  /* @__PURE__ */ jsxs("p", { className: "journey-card-stats", children: [
                    "Best ",
                    bestStreak,
                    "d · Total ",
                    totalDays,
                    "d"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "journey-card-right", children: [
                /* @__PURE__ */ jsxs("span", { className: "journey-card-returns", children: [
                  habit.history.length,
                  " ",
                  habit.history.length === 1 ? "return" : "returns"
                ] }),
                hasHistory && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    animate: { rotate: isExpanded ? 180 : 0 },
                    transition: { duration: 0.2 },
                    children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4 text-muted" })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isExpanded && hasHistory && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxs("div", { className: "journey-card-expanded", children: [
              /* @__PURE__ */ jsx("p", { className: "journey-card-expanded-title", children: "Past journeys" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                currentStreak > 0 && streakStartDate && /* @__PURE__ */ jsxs("div", { className: "journey-entry journey-entry-current", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "journey-entry-title", children: "Current streak" }),
                    /* @__PURE__ */ jsxs("p", { className: "journey-entry-date", children: [
                      format(parseISO(streakStartDate), "MMM d, yyyy"),
                      " — present"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "journey-entry-days", children: [
                    currentStreak,
                    "d"
                  ] })
                ] }),
                sortedHistory.map((record, i) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "journey-entry journey-entry-past",
                    children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("p", { className: "journey-entry-title journey-entry-title-past", children: [
                          "Journey ",
                          sortedHistory.length - i
                        ] }),
                        /* @__PURE__ */ jsxs("p", { className: "journey-entry-date", children: [
                          format(parseISO(record.startDate), "MMM d"),
                          " — ",
                          format(parseISO(record.endDate), "MMM d, yyyy")
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("span", { className: "journey-entry-days journey-entry-days-past", children: [
                        record.days,
                        "d"
                      ] })
                    ]
                  },
                  `${record.startDate}-${i}`
                ))
              ] })
            ] })
          }
        ) })
      ]
    }
  );
}

const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard - 1Day" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "title": "Dashboard", "showBack": false })} ${maybeRenderHead()}<main> ${renderComponent($$result2, "HistoryView", HistoryView, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/soteriou/Desktop/romika/src/components/HistoryView", "client:component-export": "default" })} </main> ${renderComponent($$result2, "Navigation", $$Navigation, { "currentPath": "/app/dashboard" })} ` })}`;
}, "/Users/soteriou/Desktop/romika/src/pages/app/dashboard.astro", void 0);

const $$file = "/Users/soteriou/Desktop/romika/src/pages/app/dashboard.astro";
const $$url = "/app/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
