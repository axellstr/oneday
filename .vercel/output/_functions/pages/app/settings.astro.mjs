import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_9vvDxKFD.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_2B62Wkg_.mjs';
import { $ as $$Header } from '../../chunks/Header_DW_gX_fR.mjs';
import { $ as $$Navigation } from '../../chunks/Navigation_DE36LWRd.mjs';
export { renderers } from '../../renderers.mjs';

const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Settings - 1Day" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "title": "Settings", "showBack": true })} ${maybeRenderHead()}<main class="settings-container"> <div class="space-y-6"> <!-- App info --> <section class="settings-section settings-section-padded"> <div class="settings-info"> <div class="settings-icon"> <span class="settings-icon-text">1</span> </div> <div> <h2 class="settings-app-name"><span class="opacity-50 mr-0\.5">律</span><span class="font-bold">1</span>DAY</h2> <p class="settings-app-subtitle">Streak Tracker</p> </div> </div> </section> <!-- Account section --> <section class="settings-section overflow-hidden"> <h3 class="settings-section-header">
Account
</h3> <div class="divide-y"> <a href="/auth/profile" class="settings-btn"> <span>Profile</span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"> <path d="m9 18 6-6-6-6"></path> </svg> </a> <button id="signOutBtn" class="settings-btn"> <span>Sign out</span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path> <polyline points="16 17 21 12 16 7"></polyline> <line x1="21" x2="9" y1="12" y2="12"></line> </svg> </button> </div> </section> <!-- Data management --> <section class="settings-section overflow-hidden"> <h3 class="settings-section-header">
Data
</h3> <div class="divide-y"> <button id="exportBtn" class="settings-btn"> <span>Export data</span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path> <polyline points="7 10 12 15 17 10"></polyline> <line x1="12" x2="12" y1="15" y2="3"></line> </svg> </button> </div> </section> <!-- Footer --> <section class="settings-footer"> <p class="settings-footer-text">Data synced to cloud</p> </section> </div> </main> ${renderComponent($$result2, "Navigation", $$Navigation, { "currentPath": "/app/settings" })} ` })} ${renderScript($$result, "/Users/soteriou/Desktop/romika/src/pages/app/settings.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/soteriou/Desktop/romika/src/pages/app/settings.astro", void 0);

const $$file = "/Users/soteriou/Desktop/romika/src/pages/app/settings.astro";
const $$url = "/app/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
