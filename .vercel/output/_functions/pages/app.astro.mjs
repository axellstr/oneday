import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_9vvDxKFD.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_2B62Wkg_.mjs';
import { $ as $$Header } from '../chunks/Header_DW_gX_fR.mjs';
import { $ as $$Navigation } from '../chunks/Navigation_DE36LWRd.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import { AnimatePresence, motion } from 'motion/react';
import { Smile, Zap, Target, Leaf, Coffee, Heart, Moon, Book, Droplet, Brain, Dumbbell, CigaretteOff, MoreHorizontal, Pencil, Trash2, AlertCircle, Check, X, TrendingUp, TrendingDown, Minus, Loader2, Plus } from 'lucide-react';
import { c as calculateCurrentStreak, b as getBestStreak, f as getTodayISO, t as toggleComplete, k as deleteHabit, o as openModal, l as $isModalOpen, m as $editingHabit, n as closeModal, u as updateHabit, p as addHabit, $ as $habits, a as $habitsLoading, i as initializeStore } from '../chunks/streaks_am8h9NaR.mjs';
import { $ as $user, a as $authLoading, i as initializeAuth } from '../chunks/auth__ZTN3it3.mjs';
import { e as calculateMomentum, f as getDailyMessage, h as getAllStreakStatuses } from '../chunks/engagement_CXQnEzbp.mjs';
export { renderers } from '../renderers.mjs';

function StreakCounter({ days }) {
  const [displayDays, setDisplayDays] = useState(days);
  useEffect(() => {
    if (days !== displayDays) {
      const timer = setTimeout(() => {
        setDisplayDays(days);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [days, displayDays]);
  const label = days === 1 ? "day" : "days";
  return /* @__PURE__ */ jsxs("div", { className: "streak-counter", children: [
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
      motion.span,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.2 },
        className: "streak-number",
        children: displayDays
      },
      displayDays
    ) }),
    /* @__PURE__ */ jsx("span", { className: "streak-label", children: label })
  ] });
}

const ICON_MAP$1 = {
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
function HabitCard({ habit, streakStatus }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const Icon = ICON_MAP$1[habit.icon] || Target;
  const completedDates = habit.completedDates || [];
  const days = calculateCurrentStreak(completedDates);
  const bestStreak = getBestStreak(habit);
  const today = getTodayISO();
  const isCompletedToday = completedDates.includes(today);
  const isAtRisk = streakStatus?.isAtRisk && days > 0;
  const handleToggleComplete = () => {
    toggleComplete(habit.id);
  };
  const handleDelete = () => {
    deleteHabit(habit.id);
    setShowDeleteConfirm(false);
  };
  const handleEdit = () => {
    openModal(habit);
    setShowMenu(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        className: "habit-card",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setShowMenu(!showMenu),
              className: "habit-card-menu-btn",
              children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(AnimatePresence, { children: showMenu && /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -5 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -5 },
              className: "habit-card-menu",
              children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: handleEdit,
                    className: "habit-card-menu-item",
                    children: [
                      /* @__PURE__ */ jsx(Pencil, { className: "w-3\\.5 h-3\\.5" }),
                      /* @__PURE__ */ jsx("span", { children: "Edit" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      setShowDeleteConfirm(true);
                      setShowMenu(false);
                    },
                    className: "habit-card-menu-item",
                    children: [
                      /* @__PURE__ */ jsx(Trash2, { className: "w-3\\.5 h-3\\.5" }),
                      /* @__PURE__ */ jsx("span", { children: "Delete" })
                    ]
                  }
                )
              ]
            }
          ) }),
          showMenu && /* @__PURE__ */ jsx(
            "div",
            {
              className: "fixed inset-0 z-10",
              onClick: () => setShowMenu(false)
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "habit-card-content", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: `/app/habit/${habit.id}`,
                className: "habit-card-link",
                children: [
                  isAtRisk && /* @__PURE__ */ jsxs("div", { className: "habit-card-risk", children: [
                    /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsxs("span", { children: [
                      streakStatus?.hoursRemaining,
                      "h left"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "habit-card-header", children: [
                    /* @__PURE__ */ jsx("div", { className: "habit-card-icon", children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4 text-muted" }) }),
                    /* @__PURE__ */ jsx("h3", { className: "habit-card-name", children: habit.name })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "habit-card-hero", children: /* @__PURE__ */ jsx(StreakCounter, { days }) }),
                  /* @__PURE__ */ jsxs("div", { className: "habit-card-footer", children: [
                    bestStreak > 0 && /* @__PURE__ */ jsxs("div", { className: "habit-card-stat", children: [
                      /* @__PURE__ */ jsx("span", { className: "habit-card-stat-label", children: "Best" }),
                      /* @__PURE__ */ jsxs("span", { className: "habit-card-stat-value", children: [
                        bestStreak,
                        "d"
                      ] })
                    ] }),
                    !bestStreak && /* @__PURE__ */ jsx("div", { className: "habit-card-stat-spacer" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              motion.button,
              {
                whileTap: { scale: 0.95 },
                onClick: handleToggleComplete,
                className: `habit-card-checkin-btn ${isCompletedToday ? "habit-card-checkin-done" : "habit-card-checkin-pending"}`,
                children: isCompletedToday ? /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsx("span", { children: "Done" })
                ] }) : /* @__PURE__ */ jsx("span", { children: "Check in" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: showDeleteConfirm && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "modal-overlay",
        onClick: () => setShowDeleteConfirm(false),
        children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 10 },
            onClick: (e) => e.stopPropagation(),
            className: "modal-content max-w-sm",
            children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-white mb-2", children: "Delete habit?" }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-secondary mb-6", children: [
                /* @__PURE__ */ jsx("span", { className: "text-white", children: habit.name }),
                " and all history will be permanently deleted."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setShowDeleteConfirm(false),
                    className: "btn btn-secondary flex-1",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleDelete,
                    className: "btn btn-primary flex-1",
                    children: "Delete"
                  }
                )
              ] })
            ] })
          }
        )
      }
    ) })
  ] });
}

const HABIT_ICONS = [
  "cigarette-off",
  "dumbbell",
  "brain",
  "droplet",
  "book",
  "moon",
  "heart",
  "coffee",
  "leaf",
  "target",
  "zap",
  "smile"
];

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
function HabitModal() {
  const isOpen = useStore($isModalOpen);
  const editingHabit = useStore($editingHabit);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("target");
  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setIcon(editingHabit.icon);
    } else {
      setName("");
      setIcon("target");
    }
  }, [editingHabit, isOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const data = {
      name: name.trim(),
      color: "green",
      // Not used in duochrome design
      icon
    };
    if (editingHabit) {
      updateHabit(editingHabit.id, data);
    } else {
      addHabit(data);
    }
  };
  const isValid = name.trim().length > 0;
  return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "modal-overlay",
      onClick: closeModal,
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 10 },
          onClick: (e) => e.stopPropagation(),
          className: "modal-content",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
              /* @__PURE__ */ jsx("h2", { className: "modal-title", children: editingHabit ? "Edit habit" : "New habit" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: closeModal,
                  className: "modal-close",
                  children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "modal-body space-y-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "form-label", children: "Name" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    placeholder: "No smoking, Gym, Reading...",
                    className: "form-input",
                    autoFocus: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "form-label mb-3", children: "Icon" }),
                /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 gap-2", children: HABIT_ICONS.map((i) => {
                  const Icon = ICON_MAP[i];
                  const isSelected = icon === i;
                  return /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setIcon(i),
                      className: `icon-btn ${isSelected ? "icon-btn-selected" : "icon-btn-unselected"}`,
                      children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" })
                    },
                    i
                  );
                }) })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  disabled: !isValid,
                  className: `btn w-full py-3 ${isValid ? "btn-primary" : "btn-disabled"}`,
                  children: editingHabit ? "Save" : "Create"
                }
              )
            ] })
          ]
        }
      )
    }
  ) });
}

function MomentumBadge({ momentum, variant = "compact" }) {
  const TrendIcon = momentum.trend === "up" ? TrendingUp : momentum.trend === "down" ? TrendingDown : Minus;
  const trendColor = momentum.trend === "up" ? "text-white" : momentum.trend === "down" ? "text-muted" : "text-secondary";
  if (variant === "compact") {
    return /* @__PURE__ */ jsxs("div", { className: "momentum-badge-compact", children: [
      /* @__PURE__ */ jsx("span", { className: "momentum-score", children: momentum.score }),
      /* @__PURE__ */ jsx(TrendIcon, { className: `w-3 h-3 ${trendColor}` })
    ] });
  }
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: "momentum-card",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "momentum-header", children: [
          /* @__PURE__ */ jsx("p", { className: "text-10 text-muted uppercase tracking-wider", children: "Momentum" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsx(TrendIcon, { className: `w-3.5 h-3.5 ${trendColor}` }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "momentum-score-large", children: /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            children: momentum.score
          },
          momentum.score
        ) }),
        /* @__PURE__ */ jsx("div", { className: "momentum-bar-container", children: /* @__PURE__ */ jsx("div", { className: "momentum-bar-bg", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { width: 0 },
            animate: { width: `${momentum.score}%` },
            transition: { duration: 0.8, ease: "easeOut" },
            className: "momentum-bar-fill"
          }
        ) }) }),
        /* @__PURE__ */ jsx("p", { className: "momentum-message", children: momentum.message }),
        /* @__PURE__ */ jsxs("div", { className: "momentum-stat", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-secondary", children: [
            momentum.weeklyCompletion,
            "%"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-muted ml-1", children: "this week" })
        ] })
      ]
    }
  );
}

function DailyMessage({ message }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.1 },
      className: "daily-message",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "daily-message-content", children: [
          /* @__PURE__ */ jsx("h2", { className: "daily-message-title", children: message.title }),
          /* @__PURE__ */ jsx("p", { className: "daily-message-subtitle", children: message.subtitle })
        ] }),
        message.stat && /* @__PURE__ */ jsx("div", { className: "daily-message-stat", children: message.stat })
      ]
    }
  );
}

function Dashboard() {
  const habits = useStore($habits);
  const habitsLoading = useStore($habitsLoading);
  const user = useStore($user);
  const authLoading = useStore($authLoading);
  useEffect(() => {
    initializeAuth();
  }, []);
  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = "/auth/signin";
    }
  }, [authLoading, user]);
  useEffect(() => {
    if (user) {
      initializeStore();
    }
  }, [user]);
  const momentum = useMemo(() => calculateMomentum(habits), [habits]);
  const dailyMessage = useMemo(() => getDailyMessage(habits), [habits]);
  const streakStatuses = useMemo(() => getAllStreakStatuses(habits), [habits]);
  const hasHabits = habits.length > 0;
  const isLoading = authLoading || habitsLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsx(Loader2, { size: 24, className: "auth-spinner text-muted" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-muted", children: "Loading your habits..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen pb-24", children: [
      /* @__PURE__ */ jsx("div", { className: "add-button-container", children: /* @__PURE__ */ jsx(
        motion.button,
        {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          onClick: () => openModal(),
          className: "btn-icon",
          children: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4", strokeWidth: 2 })
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "content-container", children: !hasHabits ? /* @__PURE__ */ jsx(EmptyState, { onAdd: () => openModal() }) : /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-10 text-muted uppercase tracking-ultra-wide mb-3", children: "Habits" }),
              /* @__PURE__ */ jsx(motion.div, { layout: true, className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: habits.map((habit, index) => /* @__PURE__ */ jsx(
                motion.div,
                {
                  layout: true,
                  initial: { opacity: 0, y: 10 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.03 }
                  },
                  exit: { opacity: 0, y: -10 },
                  children: /* @__PURE__ */ jsx(
                    HabitCard,
                    {
                      habit,
                      streakStatus: streakStatuses.get(habit.id)
                    }
                  )
                },
                habit.id
              )) }) })
            ] }),
            /* @__PURE__ */ jsx(DailyMessage, { message: dailyMessage }),
            /* @__PURE__ */ jsx(MomentumBadge, { momentum, variant: "full" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(HabitModal, {})
  ] });
}
function EmptyState({ onAdd }) {
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "empty-state",
      children: [
        /* @__PURE__ */ jsx("p", { className: "empty-state-label", children: "No habits yet" }),
        /* @__PURE__ */ jsx("h2", { className: "empty-state-title", children: "Start your journey" }),
        /* @__PURE__ */ jsxs(
          motion.button,
          {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            onClick: onAdd,
            className: "btn btn-primary",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Add habit" })
            ]
          }
        )
      ]
    }
  );
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Streaks - 1Day" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "title": "1Day" })} ${maybeRenderHead()}<main> ${renderComponent($$result2, "Dashboard", Dashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/soteriou/Desktop/romika/src/components/Dashboard", "client:component-export": "default" })} </main> ${renderComponent($$result2, "Navigation", $$Navigation, { "currentPath": "/app" })} ` })}`;
}, "/Users/soteriou/Desktop/romika/src/pages/app/index.astro", void 0);

const $$file = "/Users/soteriou/Desktop/romika/src/pages/app/index.astro";
const $$url = "/app";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
