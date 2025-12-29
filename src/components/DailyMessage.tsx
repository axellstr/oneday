import { motion } from 'motion/react';
import type { DailyMessage as DailyMessageType } from '../types';

interface DailyMessageProps {
  message: DailyMessageType;
}

export default function DailyMessage({ message }: DailyMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="daily-message"
    >
      <div className="daily-message-content">
        <h2 className="daily-message-title">
          {message.title}
        </h2>
        <p className="daily-message-subtitle">
          {message.subtitle}
        </p>
      </div>
      {message.stat && (
        <div className="daily-message-stat">
          {message.stat}
        </div>
      )}
    </motion.div>
  );
}

