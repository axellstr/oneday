import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Calendar, 
  LogOut, 
  Save, 
  Loader2,
  Check,
  ArrowLeft
} from 'lucide-react';
import { 
  $user, 
  $profile, 
  $authLoading,
  $isAuthenticated,
  signOut, 
  updateProfile,
  initializeAuth
} from '../stores/auth';

export function ProfilePage() {
  const user = useStore($user);
  const profile = useStore($profile);
  const isLoading = useStore($authLoading);
  const isAuthenticated = useStore($isAuthenticated);
  
  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
    }
  }, [profile]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = '/auth/signin';
    }
  }, [isLoading, isAuthenticated]);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);

    const result = await updateProfile({ displayName });

    if (result.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } else {
      setError(result.error || 'Failed to update profile');
    }

    setIsSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <Loader2 size={24} className="auth-spinner" />
        <span>Loading profile...</span>
      </div>
    );
  }

  if (!isAuthenticated || !profile) {
    return null;
  }

  const memberSince = new Date(profile.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="profile-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="profile-content"
      >
        {/* Back link */}
        <a href="/app" className="profile-back">
          <ArrowLeft size={16} />
          Back to dashboard
        </a>

        {/* Profile header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="Avatar" />
            ) : (
              <User size={32} />
            )}
          </div>
          <div className="profile-header-info">
            <h1 className="profile-name">
              {profile.displayName || profile.email?.split('@')[0] || 'User'}
            </h1>
            <p className="profile-email">{profile.email}</p>
          </div>
        </div>

        {/* Profile form */}
        <div className="profile-section">
          <h2 className="profile-section-title">Profile Information</h2>
          
          {error && (
            <div className="profile-error">{error}</div>
          )}

          <div className="profile-field">
            <label htmlFor="email" className="profile-label">
              <Mail size={14} />
              Email
            </label>
            <input
              id="email"
              type="email"
              value={profile.email}
              disabled
              className="profile-input profile-input-disabled"
            />
            <span className="profile-hint">Managed by Google</span>
          </div>

          <div className="profile-field">
            <label htmlFor="displayName" className="profile-label">
              <User size={14} />
              Display name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              className="profile-input"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="profile-save-btn"
          >
            {isSaving ? (
              <Loader2 size={16} className="auth-spinner" />
            ) : saveSuccess ? (
              <>
                <Check size={16} />
                Saved
              </>
            ) : (
              <>
                <Save size={16} />
                Save changes
              </>
            )}
          </button>
        </div>

        {/* Account info */}
        <div className="profile-section">
          <h2 className="profile-section-title">Account</h2>
          
          <div className="profile-info-row">
            <Calendar size={14} />
            <span>Member since {memberSince}</span>
          </div>

          <button
            onClick={handleSignOut}
            className="profile-signout-btn"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
