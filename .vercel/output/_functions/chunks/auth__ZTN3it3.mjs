import { atom, computed } from 'nanostores';
import { s as supabase } from './supabase_BbHOPZcp.mjs';

const $user = atom(null);
const $session = atom(null);
const $profile = atom(null);
const $authLoading = atom(true);
const $authError = atom(null);
const $authInitialized = atom(false);
const $isAuthenticated = computed($user, (user) => user !== null);
async function initializeAuth() {
  if ($authInitialized.get()) return;
  $authLoading.set(true);
  $authError.set(null);
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session:", error);
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
    supabase.auth.onAuthStateChange(async (event, session2) => {
      console.log("Auth state changed:", event);
      $session.set(session2);
      $user.set(session2?.user ?? null);
      if (session2?.user) {
        await fetchProfile(session2.user);
      } else {
        $profile.set(null);
      }
      if (event === "SIGNED_OUT") {
        $profile.set(null);
      }
    });
    $authInitialized.set(true);
  } catch (error) {
    console.error("Auth initialization error:", error);
    $authError.set("Failed to initialize authentication");
  } finally {
    $authLoading.set(false);
  }
}
async function fetchProfile(user) {
  try {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (error) {
      if (error.code === "PGRST116") {
        const newProfile = {
          id: user.id,
          email: user.email || "",
          display_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          updated_at: (/* @__PURE__ */ new Date()).toISOString()
        };
        const { error: insertError } = await supabase.from("profiles").insert(newProfile);
        if (insertError) {
          console.error("Error creating profile:", insertError);
          return;
        }
        $profile.set({
          id: newProfile.id,
          email: newProfile.email,
          displayName: newProfile.display_name,
          avatarUrl: newProfile.avatar_url,
          createdAt: newProfile.created_at
        });
        return;
      }
      console.error("Error fetching profile:", error);
      return;
    }
    if (data) {
      $profile.set({
        id: data.id,
        email: data.email,
        displayName: data.display_name,
        avatarUrl: data.avatar_url,
        createdAt: data.created_at
      });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}
async function signOut() {
  $authLoading.set(true);
  try {
    await supabase.auth.signOut();
    $user.set(null);
    $session.set(null);
    $profile.set(null);
  } catch (error) {
    console.error("Sign out error:", error);
  } finally {
    $authLoading.set(false);
  }
}
async function updateProfile(updates) {
  const user = $user.get();
  if (!user) {
    return { success: false, error: "Not authenticated" };
  }
  try {
    const { error } = await supabase.from("profiles").update({
      display_name: updates.displayName,
      avatar_url: updates.avatarUrl,
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }).eq("id", user.id);
    if (error) {
      return { success: false, error: error.message };
    }
    const currentProfile = $profile.get();
    if (currentProfile) {
      $profile.set({
        ...currentProfile,
        displayName: updates.displayName ?? currentProfile.displayName,
        avatarUrl: updates.avatarUrl ?? currentProfile.avatarUrl
      });
    }
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    return { success: false, error: message };
  }
}

export { $user as $, $authLoading as a, $profile as b, $isAuthenticated as c, initializeAuth as i, signOut as s, updateProfile as u };
