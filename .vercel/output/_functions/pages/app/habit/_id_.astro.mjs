import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_9vvDxKFD.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../../chunks/Layout_2B62Wkg_.mjs';
import { $ as $$Navigation } from '../../../chunks/Navigation_DE36LWRd.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'motion/react';
import { Loader2, Smile, Zap, Target, Leaf, Coffee, Heart, Moon, Book, Droplet, Brain, Dumbbell, CigaretteOff, ArrowLeft, Check, Award, Calendar, TrendingUp, Snowflake } from 'lucide-react';
import { $ as $habits, a as $habitsLoading, i as initializeStore, c as calculateCurrentStreak, b as getBestStreak, d as getTotalDays, f as getTodayISO, h as formatDate, t as toggleComplete } from '../../../chunks/streaks_am8h9NaR.mjs';
import { $ as $user, a as $authLoading, i as initializeAuth } from '../../../chunks/auth__ZTN3it3.mjs';
import { c as canUseFreeze, g as getCompletionRate, a as getMilestoneProgress, b as getBestDayOfWeek, d as getFreezesRemaining } from '../../../chunks/engagement_CXQnEzbp.mjs';
import { C as ContributionGrid } from '../../../chunks/ContributionGrid_Cg01ODiX.mjs';
export { renderers } from '../../../renderers.mjs';

const ICON_MAP = {
  "cigarette-off": CigaretteOff,
  dumbbell: Dumbbell,
  brain: Brain,
  droplet: Droplet,
  book: Book,
  moon: Moon,
  heart: Heart,
  coffee: Coffee,
  leaf: Leaf,
  target: Target,
  zap: Zap,
  smile: Smile
};
function HabitDetail({ habitId }) {
  const habits = useStore($habits);
  const habitsLoading = useStore($habitsLoading);
  const user = useStore($user);
  const authLoading = useStore($authLoading);
  const [freezeAvailable, setFreezeAvailable] = useState(false);
  useEffect(() => {
    initializeAuth();
  }, []);
  useEffect(() => {
    if (user) {
      initializeStore();
      setFreezeAvailable(canUseFreeze());
    }
  }, [user]);
  const habit = habits.find((h) => h.id === habitId);
  const isLoading = authLoading || habitsLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsx(Loader2, { size: 24, className: "auth-spinner text-muted" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-muted", children: "Loading..." })
    ] }) });
  }
  if (!habit) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen pb-24", children: /* @__PURE__ */ jsx("div", { className: "content-container", children: /* @__PURE__ */ jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ jsx("p", { className: "text-secondary", children: "Habit not found" }),
      /* @__PURE__ */ jsx("a", { href: "/app", className: "btn btn-primary mt-6", children: "Back to Streaks" })
    ] }) }) });
  }
  const Icon = ICON_MAP[habit.icon] || Target;
  const currentStreak = calculateCurrentStreak(habit.completedDates || []);
  const bestStreak = getBestStreak(habit);
  const totalDays = getTotalDays(habit);
  const completionRate = getCompletionRate(habit);
  const milestoneProgress = getMilestoneProgress(currentStreak);
  const bestDay = getBestDayOfWeek(habit);
  const today = getTodayISO();
  const isCompletedToday = (habit.completedDates || []).includes(today);
  const freezesRemaining = getFreezesRemaining();
  const handleToggleComplete = () => {
    toggleComplete(habit.id);
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen pb-24", children: /* @__PURE__ */ jsx("div", { className: "content-container", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "space-y-6",
      children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/app",
            className: "inline-flex items-center gap-2 text-muted text-sm transition-colors hover:text-white",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Back" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "text-center py-8", children: [
          /* @__PURE__ */ jsx("div", { className: "habit-card-icon mx-auto mb-4", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-muted" }) }),
          /* @__PURE__ */ jsx("h1", { className: "text-2xl font-light text-white tracking-tight mb-1", children: habit.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted uppercase tracking-widest", children: [
            "Since ",
            formatDate(habit.createdAt)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center py-6", children: [
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { scale: 0.9, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              className: "text-7xl font-light text-white tabular-nums tracking-tighter",
              children: currentStreak
            },
            currentStreak
          ),
          /* @__PURE__ */ jsx("p", { className: "text-10 text-muted uppercase tracking-ultra-wide mt-2", children: "Current Streak" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
          motion.button,
          {
            whileTap: { scale: 0.95 },
            onClick: handleToggleComplete,
            className: `habit-card-checkin-btn px-8 ${isCompletedToday ? "habit-card-checkin-done" : "habit-card-checkin-pending"}`,
            children: isCompletedToday ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Done for today" })
            ] }) : /* @__PURE__ */ jsx("span", { children: "Check in" })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsx(Award, { className: "w-4 h-4" }),
              label: "Best",
              value: `${bestStreak}`,
              sublabel: "days"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
              label: "Total",
              value: `${totalDays}`,
              sublabel: "days"
            }
          ),
          /* @__PURE__ */ jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsx(TrendingUp, { className: "w-4 h-4" }),
              label: "Rate",
              value: `${completionRate}%`,
              sublabel: "30 days"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "card card-padded", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-10 text-muted uppercase tracking-wider", children: "Next milestone" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-white tabular-nums", children: [
              currentStreak,
              " / ",
              milestoneProgress.next,
              " days"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "milestone-bar", children: /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { width: 0 },
              animate: { width: `${milestoneProgress.progress}%` },
              transition: { duration: 0.8, ease: "easeOut" },
              className: "milestone-bar-fill"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-between mt-2", children: [7, 30, 100].map((milestone) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: `text-10 ${currentStreak >= milestone ? "text-white" : "text-muted"}`,
              children: [
                milestone,
                "d"
              ]
            },
            milestone
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "card card-padded overflow-x-auto", children: [
          /* @__PURE__ */ jsx("p", { className: "text-10 text-muted uppercase tracking-wider mb-4", children: "Activity" }),
          /* @__PURE__ */ jsx(ContributionGrid, { filterHabitId: habit.id })
        ] }),
        bestDay && /* @__PURE__ */ jsxs("div", { className: "card card-padded", children: [
          /* @__PURE__ */ jsx("p", { className: "text-10 text-muted uppercase tracking-wider mb-3", children: "Insights" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-secondary", children: "Best day" }),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-white", children: [
              bestDay.day,
              " (",
              bestDay.rate,
              "% completion)"
            ] })
          ] })
        ] }),
        habit.history && habit.history.length > 0 && /* @__PURE__ */ jsxs("div", { className: "card", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-default", children: /* @__PURE__ */ jsx("p", { className: "text-10 text-muted uppercase tracking-wider", children: "Past journeys" }) }),
          /* @__PURE__ */ jsx("div", { className: "divide-y", children: [...habit.history].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map((record, i) => /* @__PURE__ */ jsxs("div", { className: "p-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-secondary", children: [
                "Journey ",
                habit.history.length - i
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted mt-0.5", children: [
                formatDate(record.startDate),
                " — ",
                formatDate(record.endDate)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg text-white tabular-nums", children: [
              record.days,
              "d"
            ] })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "card card-padded", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 flex items-center justify-center border border-default rounded", children: /* @__PURE__ */ jsx(Snowflake, { className: "w-5 h-5 text-muted" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-white", children: "Streak Freezes" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted mt-0.5", children: freezesRemaining > 0 ? `${freezesRemaining} available this month` : "Used this month" })
          ] })
        ] }) })
      ]
    }
  ) }) });
}
function StatCard({
  icon,
  label,
  value,
  sublabel
}) {
  return /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2 text-muted", children: [
      icon,
      /* @__PURE__ */ jsx("p", { className: "text-10 uppercase tracking-wider", children: label })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-light text-white tracking-tight", children: value }),
    /* @__PURE__ */ jsx("p", { className: "text-10 text-muted mt-1", children: sublabel })
  ] });
}

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Habit - Romika" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "HabitDetail", HabitDetail, { "client:load": true, "habitId": id || "", "client:component-hydration": "load", "client:component-path": "/Users/soteriou/Desktop/romika/src/components/HabitDetail", "client:component-export": "default" })} </main> ${renderComponent($$result2, "Navigation", $$Navigation, { "currentPath": "/app" })} ` })}`;
}, "/Users/soteriou/Desktop/romika/src/pages/app/habit/[id].astro", void 0);

const $$file = "/Users/soteriou/Desktop/romika/src/pages/app/habit/[id].astro";
const $$url = "/app/habit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
