import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Calendar, Cloud } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function LandingPage() {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        // Redirect authenticated users to app
        window.location.replace('/app');
      } else {
        setIsChecking(false);
      }
    } catch {
      setIsChecking(false);
    }
  }

  // Show loading while checking auth
  if (isChecking || isAuthenticated) {
    return (
      <div className="landing-loading">
        <div className="landing-loading-pulse" />
      </div>
    );
  }

  return (
    <div className="landing">
      {/* Ambient background */}
      <div className="landing-bg">
        <div className="landing-bg-gradient" />
        <div className="landing-bg-grid" />
      </div>

      {/* Header */}
      <motion.header 
        className="landing-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="landing-header-inner">
          <a href="/" className="landing-logo">
            <img src="/sun.svg" alt="" className="landing-logo-icon" />
            <span>1DAY</span>
          </a>
          <a href="/auth/signin" className="landing-signin">
            Sign in
          </a>
        </div>
      </motion.header>

      {/* Hero */}
      <main className="landing-hero">
        <div className="landing-hero-inner">
          <motion.div
            className="landing-hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="landing-badge">Habit Tracker</span>
            
            <h1 className="landing-title">
              Every day
              <br />
              <span className="landing-title-accent">counts</span>
            </h1>
            
            <p className="landing-description">
              Build lasting habits with a minimal, distraction-free tracker.
              Focus on what matters. One day at a time.
            </p>

            <div className="landing-cta-group">
              <motion.a 
                href="/auth/signin" 
                className="landing-cta-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start tracking
                <ArrowRight size={16} strokeWidth={2} />
              </motion.a>
            </div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            className="landing-hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="landing-preview">
              <div className="landing-preview-header">
                <span className="landing-preview-dot" />
                <span className="landing-preview-title">Your habits</span>
              </div>
              <div className="landing-preview-habits">
                <PreviewHabit name="Meditation" streak={42} checked />
                <PreviewHabit name="Exercise" streak={18} checked />
                <PreviewHabit name="Reading" streak={7} />
              </div>
              <div className="landing-preview-grid">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`landing-preview-cell ${
                      Math.random() > 0.3 ? 'landing-preview-cell--active' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features */}
      <motion.section 
        className="landing-features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="landing-features-inner">
          <h2 className="landing-features-title">Why 1DAY?</h2>
          
          <div className="landing-features-grid">
            <FeatureCard
              icon={<Check size={20} strokeWidth={2.5} />}
              title="Simple tracking"
              description="No complexity. Just habits and streaks. Tap to mark complete, watch your progress grow."
              delay={0.1}
            />
            <FeatureCard
              icon={<Calendar size={20} strokeWidth={2.5} />}
              title="Visual history"
              description="See your entire year at a glance with an intuitive contribution grid. Every day is visible."
              delay={0.2}
            />
            <FeatureCard
              icon={<Cloud size={20} strokeWidth={2.5} />}
              title="Cloud sync"
              description="Your data stays with you. Sign in once and access your habits from any device, anywhere."
              delay={0.3}
            />
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <span className="landing-footer-brand">1DAY</span>
          <span className="landing-footer-tagline">One day at a time.</span>
        </div>
      </footer>
    </div>
  );
}

function PreviewHabit({ name, streak, checked }: { name: string; streak: number; checked?: boolean }) {
  return (
    <div className={`landing-preview-habit ${checked ? 'landing-preview-habit--checked' : ''}`}>
      <div className="landing-preview-habit-check">
        {checked && <Check size={12} strokeWidth={3} />}
      </div>
      <span className="landing-preview-habit-name">{name}</span>
      <span className="landing-preview-habit-streak">{streak}d</span>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: number;
}) {
  return (
    <motion.div 
      className="landing-feature"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="landing-feature-icon">{icon}</div>
      <h3 className="landing-feature-title">{title}</h3>
      <p className="landing-feature-description">{description}</p>
    </motion.div>
  );
}

export default LandingPage;

