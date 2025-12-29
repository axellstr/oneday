import { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'motion/react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { $profile, $isAuthenticated, $authLoading, signOut, initializeAuth } from '../stores/auth';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const profile = useStore($profile);
  const isAuthenticated = useStore($isAuthenticated);
  const isLoading = useStore($authLoading);

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  if (isLoading) {
    return <div className="user-menu-skeleton" />;
  }

  if (!isAuthenticated) {
    return (
      <a href="/auth/signin" className="user-menu-signin">
        Sign in
      </a>
    );
  }

  const displayName = profile?.displayName || profile?.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="user-menu-avatar">
          {profile?.avatarUrl ? (
            <img src={profile.avatarUrl} alt={displayName} />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <ChevronDown size={14} className={`user-menu-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="user-menu-dropdown"
          >
            <div className="user-menu-header">
              <div className="user-menu-name">{displayName}</div>
              <div className="user-menu-email">{profile?.email}</div>
            </div>

            <div className="user-menu-divider" />

            <a href="/auth/profile" className="user-menu-item" onClick={() => setIsOpen(false)}>
              <User size={16} />
              Profile
            </a>

            <a href="/app/settings" className="user-menu-item" onClick={() => setIsOpen(false)}>
              <Settings size={16} />
              Settings
            </a>

            <div className="user-menu-divider" />

            <button className="user-menu-item user-menu-signout" onClick={handleSignOut}>
              <LogOut size={16} />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserMenu;

