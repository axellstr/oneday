import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_9vvDxKFD.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_2B62Wkg_.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { s as supabase } from '../../chunks/supabase_BbHOPZcp.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: error2 } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent"
          }
        }
      });
      if (error2) {
        setError(error2.message);
        setIsLoading(false);
      }
    } catch (err) {
      setError("Failed to connect to Google. Please try again.");
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      className: "auth-form-container",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "auth-header", children: [
          /* @__PURE__ */ jsx("h1", { className: "auth-title", children: "Welcome to 1Day" }),
          /* @__PURE__ */ jsx("p", { className: "auth-subtitle", children: "Sign in to track your habits and build lasting streaks" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "auth-form", children: [
          error && /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              className: "auth-error",
              children: error
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleGoogleSignIn,
              disabled: isLoading,
              className: "auth-google-btn",
              children: isLoading ? /* @__PURE__ */ jsx(Loader2, { size: 20, className: "auth-spinner" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", width: "20", height: "20", className: "auth-google-icon", children: [
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "#4285F4",
                      d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "#34A853",
                      d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "#FBBC05",
                      d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "#EA4335",
                      d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    }
                  )
                ] }),
                "Continue with Google"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "auth-terms", children: /* @__PURE__ */ jsx("p", { children: "By signing in, you agree to our terms of service and privacy policy." }) })
      ]
    }
  );
}

const $$Signin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Sign In - 1Day", "data-astro-cid-sde2wqi2": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="auth-page" data-astro-cid-sde2wqi2> <div class="auth-page-inner" data-astro-cid-sde2wqi2> <a href="/" class="auth-logo" data-astro-cid-sde2wqi2>1Day</a> ${renderComponent($$result2, "AuthForm", AuthForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/soteriou/Desktop/romika/src/components/AuthForm", "client:component-export": "default", "data-astro-cid-sde2wqi2": true })} </div> <div class="auth-page-bg" data-astro-cid-sde2wqi2> <div class="auth-bg-pattern" data-astro-cid-sde2wqi2></div> </div> </div> ` })} `;
}, "/Users/soteriou/Desktop/romika/src/pages/auth/signin.astro", void 0);

const $$file = "/Users/soteriou/Desktop/romika/src/pages/auth/signin.astro";
const $$url = "/auth/signin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
