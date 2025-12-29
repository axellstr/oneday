import { e as createComponent, f as createAstro, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_9vvDxKFD.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_2B62Wkg_.mjs';
/* empty css                                       */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Callback = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Callback;
  const url = new URL(Astro2.request.url);
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");
  if (error) {
    const errorMessage = errorDescription || error;
    return Astro2.redirect(`/auth/signin?error=${encodeURIComponent(errorMessage)}`);
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Signing in... - 1Day", "data-astro-cid-qbporkgn": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="callback-page" data-astro-cid-qbporkgn> <div class="callback-content" data-astro-cid-qbporkgn> <div class="callback-spinner" data-astro-cid-qbporkgn></div> <h1 class="callback-title" data-astro-cid-qbporkgn>Completing sign in...</h1> <p class="callback-text" data-astro-cid-qbporkgn>Please wait while we verify your credentials.</p> </div> </div> ` })} ${renderScript($$result, "/Users/soteriou/Desktop/romika/src/pages/auth/callback.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/soteriou/Desktop/romika/src/pages/auth/callback.astro", void 0);

const $$file = "/Users/soteriou/Desktop/romika/src/pages/auth/callback.astro";
const $$url = "/auth/callback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Callback,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
