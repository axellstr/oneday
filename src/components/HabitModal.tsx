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
import { $isModalOpen, $editingHabit, $habits, closeModal, addHabit, updateHabit } from '../stores/habits';

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

const MAX_NAME_LENGTH = 50;
const MAX_HABITS = 20;

export default function HabitModal() {
  const isOpen = useStore($isModalOpen);
  const editingHabit = useStore($editingHabit);
  const habits = useStore($habits);
  
  const [name, setName] = useState('');
  const [icon, setIcon] = useState<HabitIcon>('target');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setIcon(editingHabit.icon);
    } else {
      setName('');
      setIcon('target');
    }
    setError(null);
  }, [editingHabit, isOpen]);

  const validateName = (value: string): string | null => {
    const trimmed = value.trim();
    
    if (!trimmed) {
      return 'Habit name is required';
    }
    
    if (trimmed.length > MAX_NAME_LENGTH) {
      return `Name must be ${MAX_NAME_LENGTH} characters or less`;
    }
    
    // Check for duplicate names (case-insensitive)
    const isDuplicate = habits.some(
      h => h.name.toLowerCase() === trimmed.toLowerCase() && h.id !== editingHabit?.id
    );
    
    if (isDuplicate) {
      return 'A habit with this name already exists';
    }
    
    return null;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Limit input length
    if (value.length <= MAX_NAME_LENGTH) {
      setName(value);
      // Clear error on typing
      if (error) setError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Check habit limit for new habits
    if (!editingHabit && habits.length >= MAX_HABITS) {
      setError(`You can only have up to ${MAX_HABITS} habits`);
      return;
    }

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

  const trimmedName = name.trim();
  const isValid = trimmedName.length > 0 && trimmedName.length <= MAX_NAME_LENGTH;
  const charsRemaining = MAX_NAME_LENGTH - name.length;

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
              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="form-error"
                >
                  {error}
                </motion.div>
              )}

              {/* Name input */}
              <div>
                <div className="form-label-row">
                  <label className="form-label">Name</label>
                  <span className={`form-char-count ${charsRemaining < 10 ? 'form-char-count-warning' : ''}`}>
                    {charsRemaining}
                  </span>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="No smoking, Gym, Reading..."
                  className={`form-input ${error ? 'form-input-error' : ''}`}
                  autoFocus
                  maxLength={MAX_NAME_LENGTH}
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
