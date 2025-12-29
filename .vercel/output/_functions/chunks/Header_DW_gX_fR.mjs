import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, n as renderSlot, r as renderTemplate, k as renderComponent } from './astro/server_9vvDxKFD.mjs';
import 'piccolore';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { b as $profile, c as $isAuthenticated, a as $authLoading, i as initializeAuth, s as signOut } from './auth__ZTN3it3.mjs';

function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const profile = useStore($profile);
  const isAuthenticated = useStore($isAuthenticated);
  const isLoading = useStore($authLoading);
  useEffect(() => {
    initializeAuth();
  }, []);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "user-menu-skeleton" });
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsx("a", { href: "/auth/signin", className: "user-menu-signin", children: "Sign in" });
  }
  const displayName = profile?.displayName || profile?.email?.split("@")[0] || "User";
  const initials = displayName.charAt(0).toUpperCase();
  return /* @__PURE__ */ jsxs("div", { className: "user-menu", ref: menuRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "user-menu-trigger",
        onClick: () => setIsOpen(!isOpen),
        "aria-expanded": isOpen,
        children: [
          /* @__PURE__ */ jsx("div", { className: "user-menu-avatar", children: profile?.avatarUrl ? /* @__PURE__ */ jsx("img", { src: profile.avatarUrl, alt: displayName }) : /* @__PURE__ */ jsx("span", { children: initials }) }),
          /* @__PURE__ */ jsx(ChevronDown, { size: 14, className: `user-menu-chevron ${isOpen ? "open" : ""}` })
        ]
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.95 },
        transition: { duration: 0.15 },
        className: "user-menu-dropdown",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "user-menu-header", children: [
            /* @__PURE__ */ jsx("div", { className: "user-menu-name", children: displayName }),
            /* @__PURE__ */ jsx("div", { className: "user-menu-email", children: profile?.email })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "user-menu-divider" }),
          /* @__PURE__ */ jsxs("a", { href: "/auth/profile", className: "user-menu-item", onClick: () => setIsOpen(false), children: [
            /* @__PURE__ */ jsx(User, { size: 16 }),
            "Profile"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "/app/settings", className: "user-menu-item", onClick: () => setIsOpen(false), children: [
            /* @__PURE__ */ jsx(Settings, { size: 16 }),
            "Settings"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "user-menu-divider" }),
          /* @__PURE__ */ jsxs("button", { className: "user-menu-item user-menu-signout", onClick: handleSignOut, children: [
            /* @__PURE__ */ jsx(LogOut, { size: 16 }),
            "Sign out"
          ] })
        ]
      }
    ) })
  ] });
}

const $$Astro = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const { title = "1Day", showBack = false, minimal = false, showAuth = true } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header${addAttribute(`header ${minimal ? "header-transparent" : "header-default"}`, "class")}> <div class="header-inner"> <div class="flex items-center gap-3"> ${showBack && renderTemplate`<a href="/app" class="header-back"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="m15 18-6-6 6-6"></path> </svg> </a>`} <a href="/" class="header-logo"> <span class="opacity-50 mr-1">律</span><span class="font-bold">1</span>DAY
</a> </div> <div class="flex items-center gap-3"> ${renderSlot($$result, $$slots["actions"])} ${showAuth && renderTemplate`${renderComponent($$result, "UserMenu", UserMenu, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/soteriou/Desktop/romika/src/components/UserMenu", "client:component-export": "default" })}`} </div> </div> </header>`;
}, "/Users/soteriou/Desktop/romika/src/components/Header.astro", void 0);

export { $$Header as $ };
