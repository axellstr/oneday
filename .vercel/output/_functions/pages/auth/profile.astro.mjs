import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_9vvDxKFD.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_2B62Wkg_.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'motion/react';
import { Loader2, ArrowLeft, User, Mail, Check, Save, Calendar, LogOut } from 'lucide-react';
import { $ as $user, b as $profile, a as $authLoading, c as $isAuthenticated, i as initializeAuth, u as updateProfile, s as signOut } from '../../chunks/auth__ZTN3it3.mjs';
export { renderers } from '../../renderers.mjs';

function ProfilePage() {
  useStore($user);
  const profile = useStore($profile);
  const isLoading = useStore($authLoading);
  const isAuthenticated = useStore($isAuthenticated);
  const [displayName, setDisplayName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    initializeAuth();
  }, []);
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || "");
    }
  }, [profile]);
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = "/auth/signin";
    }
  }, [isLoading, isAuthenticated]);
  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);
    const result = await updateProfile({ displayName });
    if (result.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2e3);
    } else {
      setError(result.error || "Failed to update profile");
    }
    setIsSaving(false);
  };
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "profile-loading", children: [
      /* @__PURE__ */ jsx(Loader2, { size: 24, className: "auth-spinner" }),
      /* @__PURE__ */ jsx("span", { children: "Loading profile..." })
    ] });
  }
  if (!isAuthenticated || !profile) {
    return null;
  }
  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsx("div", { className: "profile-container", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "profile-content",
      children: [
        /* @__PURE__ */ jsxs("a", { href: "/app", className: "profile-back", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { size: 16 }),
          "Back to dashboard"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "profile-header", children: [
          /* @__PURE__ */ jsx("div", { className: "profile-avatar", children: profile.avatarUrl ? /* @__PURE__ */ jsx("img", { src: profile.avatarUrl, alt: "Avatar" }) : /* @__PURE__ */ jsx(User, { size: 32 }) }),
          /* @__PURE__ */ jsxs("div", { className: "profile-header-info", children: [
            /* @__PURE__ */ jsx("h1", { className: "profile-name", children: profile.displayName || profile.email?.split("@")[0] || "User" }),
            /* @__PURE__ */ jsx("p", { className: "profile-email", children: profile.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "profile-section", children: [
          /* @__PURE__ */ jsx("h2", { className: "profile-section-title", children: "Profile Information" }),
          error && /* @__PURE__ */ jsx("div", { className: "profile-error", children: error }),
          /* @__PURE__ */ jsxs("div", { className: "profile-field", children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "email", className: "profile-label", children: [
              /* @__PURE__ */ jsx(Mail, { size: 14 }),
              "Email"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "email",
                type: "email",
                value: profile.email,
                disabled: true,
                className: "profile-input profile-input-disabled"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "profile-hint", children: "Managed by Google" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "profile-field", children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "displayName", className: "profile-label", children: [
              /* @__PURE__ */ jsx(User, { size: 14 }),
              "Display name"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "displayName",
                type: "text",
                value: displayName,
                onChange: (e) => setDisplayName(e.target.value),
                placeholder: "Enter your display name",
                className: "profile-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleSave,
              disabled: isSaving,
              className: "profile-save-btn",
              children: isSaving ? /* @__PURE__ */ jsx(Loader2, { size: 16, className: "auth-spinner" }) : saveSuccess ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Check, { size: 16 }),
                "Saved"
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Save, { size: 16 }),
                "Save changes"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "profile-section", children: [
          /* @__PURE__ */ jsx("h2", { className: "profile-section-title", children: "Account" }),
          /* @__PURE__ */ jsxs("div", { className: "profile-info-row", children: [
            /* @__PURE__ */ jsx(Calendar, { size: 14 }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Member since ",
              memberSince
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: handleSignOut,
              className: "profile-signout-btn",
              children: [
                /* @__PURE__ */ jsx(LogOut, { size: 16 }),
                "Sign out"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}

const $$Profile = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Profile - 1Day" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProfilePage", ProfilePage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/soteriou/Desktop/romika/src/components/ProfilePage", "client:component-export": "default" })} ` })}`;
}, "/Users/soteriou/Desktop/romika/src/pages/auth/profile.astro", void 0);

const $$file = "/Users/soteriou/Desktop/romika/src/pages/auth/profile.astro";
const $$url = "/auth/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
