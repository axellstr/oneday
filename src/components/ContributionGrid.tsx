import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '@nanostores/react';
import { format, parseISO, startOfWeek, addDays, subWeeks, getMonth } from 'date-fns';
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

const DAYS_OF_WEEK = ['M', '', 'W', '', 'F', '', ''];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface ContributionGridProps {
  filterHabitId?: string | null;
}

export default function ContributionGrid({ filterHabitId = null }: ContributionGridProps) {
  const habits = useStore($habits);
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const { weeks, monthLabels } = useMemo(() => {
    const today = new Date();
    const weeksToShow = 52;
    
    const startDate = startOfWeek(subWeeks(today, weeksToShow - 1), { weekStartsOn: 1 });
    
    const filteredHabits = filterHabitId
      ? habits.filter(h => h.id === filterHabitId)
      : habits;
    
    const allDaysData = generateContributionData(filteredHabits, 365);
    const dayDataMap = new Map(allDaysData.map(d => [d.date, d]));
    
    const weeks: (DayData | null)[][] = [];
    const monthLabels: { month: number; weekIndex: number }[] = [];
    
    let currentDate = startDate;
    let lastMonth = -1;
    
    for (let week = 0; week < weeksToShow; week++) {
      const weekDays: (DayData | null)[] = [];
      
      for (let day = 0; day < 7; day++) {
        const dateStr = format(currentDate, 'yyyy-MM-dd');
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
            level: 0,
          });
        }
        
        const month = getMonth(currentDate);
        if (month !== lastMonth && day === 0) {
          monthLabels.push({ month, weekIndex: week });
          lastMonth = month;
        }
        
        currentDate = addDays(currentDate, 1);
      }
      
      weeks.push(weekDays);
    }
    
    return { weeks, monthLabels };
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
    <div className="contribution-wrapper">
      {/* Month labels */}
      <div className="contribution-months">
        {weeks.map((_, weekIndex) => {
          const monthLabel = monthLabels.find(m => m.weekIndex === weekIndex);
          return (
            <div
              key={weekIndex}
              className="contribution-month-label"
            >
              {monthLabel ? MONTHS[monthLabel.month] : ''}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div className="contribution-grid">
        {/* Day labels */}
        <div className="contribution-day-labels">
          {DAYS_OF_WEEK.map((day, index) => (
            <div
              key={index}
              className="contribution-day-label"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Contribution squares */}
        <div className="contribution-weeks">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="contribution-week">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.0005 }}
                  className={`contribution-cell ${
                    day === null
                      ? 'bg-transparent'
                      : `${LEVEL_CLASSES[day.level]} contribution-cell-hover`
                  }`}
                  onMouseEnter={day ? (e) => handleMouseEnter(day, e) : undefined}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredDay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="contribution-tooltip"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <p className="text-white">
            {hoveredDay.activeHabits}/{hoveredDay.totalHabits} active
          </p>
          <p className="text-muted mt-0\.5">
            {format(parseISO(hoveredDay.date), 'MMM d, yyyy')}
          </p>
        </motion.div>
      )}

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
