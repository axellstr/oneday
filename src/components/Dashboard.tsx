import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { $habits, initializeStore, openModal } from '../stores/habits';
import { initializeSampleData } from '../lib/sampleData';
import HabitCard from './HabitCard';
import HabitModal from './HabitModal';

export default function Dashboard() {
  const habits = useStore($habits);

  useEffect(() => {
    initializeSampleData();
    initializeStore();
  }, []);

  return (
    <>
      <div className="min-h-screen pb-24">
        {/* Add button */}
        <div className="add-button-container">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal()}
            className="btn-icon"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="content-container">
          {habits.length === 0 ? (
            <EmptyState onAdd={() => openModal()} />
          ) : (
            <motion.div layout className="grid grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {habits.map((habit, index) => (
                  <motion.div
                    key={habit.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: index * 0.03 }
                    }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <HabitCard habit={habit} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      <HabitModal />
    </>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="empty-state"
    >
      <p className="empty-state-label">
        No habits yet
      </p>
      <h2 className="empty-state-title">
        Start your journey
      </h2>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAdd}
        className="btn btn-primary"
      >
        <Plus className="w-4 h-4" />
        <span>Add habit</span>
      </motion.button>
    </motion.div>
  );
}
