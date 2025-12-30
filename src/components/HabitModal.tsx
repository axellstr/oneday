import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@nanostores/react';
import {
  X,
  CigaretteOff,
  Dumbbell,
  Brain,
  Droplet,
  Book,
  Moon,
  Heart,
  Coffee,
  Leaf,
  Target,
  Zap,
  Smile,
} from 'lucide-react';
import type { HabitIcon, HabitFormData } from '../types';
import { HABIT_ICONS } from '../lib/constants';
import { $isModalOpen, $editingHabit, closeModal, addHabit, updateHabit } from '../stores/habits';

const ICON_MAP: Record<HabitIcon, React.ComponentType<{ className?: string }>> = {
  'cigarette-off': CigaretteOff,
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
  smile: Smile,
};

export default function HabitModal() {
  const isOpen = useStore($isModalOpen);
  const editingHabit = useStore($editingHabit);
  
  const [name, setName] = useState('');
  const [icon, setIcon] = useState<HabitIcon>('target');

  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setIcon(editingHabit.icon);
    } else {
      setName('');
      setIcon('target');
    }
  }, [editingHabit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    const data: HabitFormData = {
      name: name.trim(),
      icon,
    };

    if (editingHabit) {
      updateHabit(editingHabit.id, data);
    } else {
      addHabit(data);
    }
  };

  const isValid = name.trim().length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={e => e.stopPropagation()}
            className="modal-content"
          >
            {/* Header */}
            <div className="modal-header">
              <h2 className="modal-title">
                {editingHabit ? 'Edit habit' : 'New habit'}
              </h2>
              <button
                onClick={closeModal}
                className="modal-close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="modal-body space-y-6">
              {/* Name input */}
              <div>
                <label className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="No smoking, Gym, Reading..."
                  className="form-input"
                  autoFocus
                />
              </div>

              {/* Icon selection */}
              <div>
                <label className="form-label mb-3">
                  Icon
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {HABIT_ICONS.map(i => {
                    const Icon = ICON_MAP[i];
                    const isSelected = icon === i;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIcon(i)}
                        className={`icon-btn ${isSelected ? 'icon-btn-selected' : 'icon-btn-unselected'}`}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={!isValid}
                className={`btn w-full py-3 ${isValid ? 'btn-primary' : 'btn-disabled'}`}
              >
                {editingHabit ? 'Save' : 'Create'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
