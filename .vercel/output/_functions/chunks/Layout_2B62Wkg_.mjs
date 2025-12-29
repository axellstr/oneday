import { e as createComponent, f as createAstro, o as renderHead, n as renderSlot, r as renderTemplate } from './astro/server_9vvDxKFD.mjs';
import 'piccolore';
import 'clsx';
/* empty css                             */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "1Day - Streak Tracker" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><meta name="description" content="Track your habits and build lasting streaks with 1Day"><meta name="theme-color" content="#0d1117"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title}</title><!-- PWA --><link rel="manifest" href="/manifest.json"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="1Day"><link rel="apple-touch-icon" href="/icons/icon-192.svg">${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/soteriou/Desktop/romika/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
