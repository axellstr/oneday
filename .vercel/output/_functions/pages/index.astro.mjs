import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_9vvDxKFD.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_2B62Wkg_.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "1Day - Track Your Streaks" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen flex flex-col"> <!-- Header --> <header class="landing-header"> <div class="landing-header-inner"> <a href="/" class="header-logo"> <span class="opacity-50 mr-1">律</span><span>1</span>DAY
</a> <a href="/auth/signin" class="landing-link">
Sign in
</a> </div> </header> <!-- Hero --> <main class="landing-hero"> <div class="landing-hero-inner"> <p class="landing-subtitle">
Streak Tracker
</p> <h1 class="landing-title">
Every day<br>counts
</h1> <p class="landing-description">
Build. Break. Begin again.<br>
Your history is your teacher.
</p> <a href="/auth/signin" class="btn btn-primary">
Get started
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="m12 5 7 7-7 7"></path> </svg> </a> </div> </main> <!-- Features --> <section class="landing-features"> <div class="landing-features-inner"> <div class="landing-features-grid"> <div> <p class="landing-feature-number">01</p> <h3 class="landing-feature-title">Simple tracking</h3> <p class="landing-feature-desc">
No complexity. Just habits and day counts. Focus on what matters.
</p> </div> <div> <p class="landing-feature-number">02</p> <h3 class="landing-feature-title">Visual history</h3> <p class="landing-feature-desc">
See your progress at a glance with a year-long contribution grid.
</p> </div> <div> <p class="landing-feature-number">03</p> <h3 class="landing-feature-title">Local first, cloud sync</h3> <p class="landing-feature-desc">
Works offline. Sign in to sync across devices.
</p> </div> </div> </div> </section> <!-- Footer --> <footer class="landing-footer"> <div class="landing-footer-inner"> <span class="landing-footer-text"><span class="opacity-50 mr-0\.5">律</span><span class="font-bold">1</span>DAY</span> <span class="landing-footer-text">Start over.</span> </div> </footer> </div> ` })}`;
}, "/Users/soteriou/Desktop/romika/src/pages/index.astro", void 0);

const $$file = "/Users/soteriou/Desktop/romika/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
