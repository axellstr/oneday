import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@nanostores/react';
import { 
  format, 
  parseISO, 
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
  addMonths,
  subMonths,
  isToday,
  isFuture
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DayData } from '../types';
import { $habits } from '../stores/habits';
import { generateContributionData } from '../lib/streaks';

// Duochrome intensity levels - white shades
const LEVEL_CLASSES = [
  'bg-level-0',   // Level 0 - no activity
  'bg-level-1',   // Level 1
  'bg-level-2',   // Level 2
  'bg-level-3',   // Level 3
  'bg-level-4',   // Level 4
];

const DAYS_OF_WEEK_SHORT = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAYS_OF_WEEK_FULL = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface ContributionGridProps {
  filterHabitId?: string | null;
}

export default function ContributionGrid({ 
  filterHabitId = null
}: ContributionGridProps) {
  const habits = useStore($habits);
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate contribution data map
  const dayDataMap = useMemo(() => {
    const filteredHabits = filterHabitId
      ? habits.filter(h => h.id === filterHabitId)
      : habits;
    
    const allDaysData = generateContributionData(filteredHabits, 400);
    return new Map(allDaysData.map(d => [d.date, d]));
  }, [habits, filterHabitId]);

  const handleMouseEnter = (day: DayData, event: React.MouseEvent) => {
    setHoveredDay(day);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div className="contribution-container">
      {/* Header with navigation */}
      <div className="contribution-header">
        <div className="contribution-nav">
          <button 
            onClick={() => setCurrentMonth(prev => subMonths(prev, 1))}
            className="contribution-nav-btn"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="contribution-month-title">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button 
            onClick={() => setCurrentMonth(prev => addMonths(prev, 1))}
            className="contribution-nav-btn"
            disabled={isSameMonth(currentMonth, new Date())}
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Month Grid */}
      <AnimatePresence mode="wait">
        <MonthView
          key={`month-${format(currentMonth, 'yyyy-MM')}`}
          currentMonth={currentMonth}
          dayDataMap={dayDataMap}
          onHover={handleMouseEnter}
          onLeave={handleMouseLeave}
        />
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="contribution-tooltip"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <p className="contribution-tooltip-count">
              {hoveredDay.activeHabits}/{hoveredDay.totalHabits} completed
            </p>
            <p className="contribution-tooltip-date">
              {format(parseISO(hoveredDay.date), 'EEEE, MMM d, yyyy')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="contribution-legend">
        <span>Less</span>
        <div className="contribution-legend-squares">
          {LEVEL_CLASSES.map((levelClass, index) => (
            <div
              key={index}
              className={`contribution-legend-square ${levelClass}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  );
}

// Month Calendar View
function MonthView({
  currentMonth,
  dayDataMap,
  onHover,
  onLeave,
}: {
  currentMonth: Date;
  dayDataMap: Map<string, DayData>;
  onHover: (day: DayData, event: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    const startDayOfWeek = getDay(monthStart);
    // Convert to Monday-based index (0 = Monday)
    const startOffset = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    // Create array with empty slots for days before month starts
    const calendarDays: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) {
      calendarDays.push(null);
    }
    calendarDays.push(...daysInMonth);
    
    // Fill remaining slots to complete the grid
    const remainingSlots = 7 - (calendarDays.length % 7);
    if (remainingSlots < 7) {
      for (let i = 0; i < remainingSlots; i++) {
        calendarDays.push(null);
      }
    }
    
    return calendarDays;
  }, [currentMonth]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className="month-view"
    >
      {/* Day headers */}
      <div className="month-header">
        {DAYS_OF_WEEK_SHORT.map((day, index) => (
          <div key={index} className="month-header-cell">
            <span className="month-header-short">{day}</span>
            <span className="month-header-full">{DAYS_OF_WEEK_FULL[index]}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="month-grid">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="month-cell month-cell-empty" />;
          }

          const dateStr = format(date, 'yyyy-MM-dd');
          const dayData = dayDataMap.get(dateStr);
          const isTodayDate = isToday(date);
          const isFutureDate = isFuture(date);
          const dayNumber = date.getDate();
          
          const level = dayData?.level ?? 0;
          const hasActivity = dayData && dayData.activeHabits > 0;

          return (
            <motion.div
              key={dateStr}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.008 }}
              className={`month-cell ${isTodayDate ? 'month-cell-today' : ''} ${isFutureDate ? 'month-cell-future' : ''} ${hasActivity ? 'month-cell-active' : ''}`}
              onMouseEnter={dayData && !isFutureDate ? (e) => onHover(dayData, e) : undefined}
              onMouseLeave={onLeave}
            >
              <span className="month-cell-day">{dayNumber}</span>
              {!isFutureDate && (
                <div className={`month-cell-indicator ${LEVEL_CLASSES[level]}`} />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

