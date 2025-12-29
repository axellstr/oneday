import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { MomentumData } from '../types';

interface MomentumBadgeProps {
  momentum: MomentumData;
  variant?: 'compact' | 'full';
}

export default function MomentumBadge({ momentum, variant = 'compact' }: MomentumBadgeProps) {
  const TrendIcon = momentum.trend === 'up' 
    ? TrendingUp 
    : momentum.trend === 'down' 
      ? TrendingDown 
      : Minus;

  const trendColor = momentum.trend === 'up'
    ? 'text-white'
    : momentum.trend === 'down'
      ? 'text-muted'
      : 'text-secondary';

  if (variant === 'compact') {
    return (
      <div className="momentum-badge-compact">
        <span className="momentum-score">{momentum.score}</span>
        <TrendIcon className={`w-3 h-3 ${trendColor}`} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="momentum-card"
    >
      <div className="momentum-header">
        <p className="text-10 text-muted uppercase tracking-wider">Momentum</p>
        <div className="flex items-center gap-1">
          <TrendIcon className={`w-3.5 h-3.5 ${trendColor}`} />
        </div>
      </div>
      
      <div className="momentum-score-large">
        <motion.span
          key={momentum.score}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {momentum.score}
        </motion.span>
      </div>

      <div className="momentum-bar-container">
        <div className="momentum-bar-bg">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${momentum.score}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="momentum-bar-fill"
          />
        </div>
      </div>

      <p className="momentum-message">
        {momentum.message}
      </p>

      <div className="momentum-stat">
        <span className="text-secondary">{momentum.weeklyCompletion}%</span>
        <span className="text-muted ml-1">this week</span>
      </div>
    </motion.div>
  );
}

