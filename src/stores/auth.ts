import { atom, computed } from 'nanostores';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { UserProfile } from '../types/auth';

// Auth state atoms
export const $user = atom<User | null>(null);
export const $session = atom<Session | null>(null);
export const $profile = atom<UserProfile | null>(null);
export const $authLoading = atom<boolean>(true);
export const $authError = atom<string | null>(null);
export const $authInitialized = atom<boolean>(false);

// Track if auth listener is set up
let authListenerInitialized = false;

// Computed: is authenticated
export const $isAuthenticated = computed($user, (user) => user !== null);

// Initialize auth listener - call this once on app load
export async function initializeAuth(): Promise<void> {
  // Prevent multiple initializations
  if ($authInitialized.get()) {
    return;
  }
  
  $authLoading.set(true);
  $authError.set(null);

  try {
    // Get initial session
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      $authError.set(error.message);
      $authLoading.set(false);
      $authInitialized.set(true);
      return;
    }

    if (session) {
      $session.set(session);
      $user.set(session.user);
      await fetchProfile(session.user);
    }

    // Only set up the listener once
    if (!authListenerInitialized) {
      authListenerInitialized = true;
      
      supabase.auth.onAuthStateChange(async (event, session) => {
        // Ignore TOKEN_REFRESHED events - they don't change the user
        if (event === 'TOKEN_REFRESHED') {
          $session.set(session);
          return;
        }

        // Ignore INITIAL_SESSION if we're already initialized with a user
        // This prevents race conditions when tab visibility changes trigger auth checks
        if (event === 'INITIAL_SESSION') {
          // Only process if we don't have a user yet, or if session provides a valid user
          const currentUser = $user.get();
          if (currentUser && !session?.user) {
            // Already have a user, don't clear it for an INITIAL_SESSION with no user
            return;
          }
          if (session?.user) {
            $session.set(session);
            $user.set(session.user);
          }
          return;
        }

        // For SIGNED_OUT, always clear the user
        if (event === 'SIGNED_OUT') {
          $session.set(null);
          $user.set(null);
          $profile.set(null);
          // Reset habits store on sign out
          const { resetHabitsStore } = await import('./habits');
          resetHabitsStore();
          return;
        }

        // For SIGNED_IN, USER_UPDATED events, update state only if we have a valid session
        if (session?.user) {
          $session.set(session);
          $user.set(session.user);
          
          if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
            await fetchProfile(session.user);
          }
        }
      });
    }
    
    $authInitialized.set(true);
  } catch {
    $authError.set('Failed to initialize authentication');
  } finally {
    $authLoading.set(false);
  }
}

// Fetch or create user profile
async function fetchProfile(user: User): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      // Profile might not exist yet (new user via Google)
      if (error.code === 'PGRST116') {
        // Create profile for new user
        const newProfile = {
          id: user.id,
          email: user.email || '',
          display_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const { error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile);

        if (insertError) {
          return;
        }

        $profile.set({
          id: newProfile.id,
          email: newProfile.email,
          displayName: newProfile.display_name,
          avatarUrl: newProfile.avatar_url,
          createdAt: newProfile.created_at,
        });
        return;
      }
      return;
    }

    if (data) {
      $profile.set({
        id: data.id,
        email: data.email,
        displayName: data.display_name,
        avatarUrl: data.avatar_url,
        createdAt: data.created_at,
      });
    }
  } catch {
    // Profile fetch failed silently
  }
}

// Sign out
export async function signOut(): Promise<void> {
  $authLoading.set(true);
  
  try {
    await supabase.auth.signOut();
    $user.set(null);
    $session.set(null);
    $profile.set(null);
  } catch {
    // Sign out failed silently - user state already cleared
  } finally {
    $authLoading.set(false);
  }
}

// Update profile
export async function updateProfile(
  updates: { displayName?: string; avatarUrl?: string }
): Promise<{ success: boolean; error?: string }> {
  const user = $user.get();
  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: updates.displayName,
        avatar_url: updates.avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    // Update local state
    const currentProfile = $profile.get();
    if (currentProfile) {
      $profile.set({
        ...currentProfile,
        displayName: updates.displayName ?? currentProfile.displayName,
        avatarUrl: updates.avatarUrl ?? currentProfile.avatarUrl,
      });
    }

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update profile';
    return { success: false, error: message };
  }
}
