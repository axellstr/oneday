import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StreakCounterProps {
  days: number;
}

export default function StreakCounter({ days }: StreakCounterProps) {
  const [displayDays, setDisplayDays] = useState(days);

  useEffect(() => {
    if (days !== displayDays) {
      const timer = setTimeout(() => {
        setDisplayDays(days);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [days, displayDays]);

  const label = days === 1 ? 'day' : 'days';

  return (
    <div className="streak-counter">
      <AnimatePresence mode="wait">
        <motion.span
          key={displayDays}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="streak-number"
        >
          {displayDays}
        </motion.span>
      </AnimatePresence>
      <span className="streak-label">
        {label}
      </span>
    </div>
  );
}
