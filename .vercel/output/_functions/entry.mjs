import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_LFlWw4d8.mjs';
import { manifest } from './manifest_pRn1cHoJ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/app/dashboard.astro.mjs');
const _page2 = () => import('./pages/app/habit/_id_.astro.mjs');
const _page3 = () => import('./pages/app/settings.astro.mjs');
const _page4 = () => import('./pages/app.astro.mjs');
const _page5 = () => import('./pages/auth/callback.astro.mjs');
const _page6 = () => import('./pages/auth/profile.astro.mjs');
const _page7 = () => import('./pages/auth/signin.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/app/dashboard.astro", _page1],
    ["src/pages/app/habit/[id].astro", _page2],
    ["src/pages/app/settings.astro", _page3],
    ["src/pages/app/index.astro", _page4],
    ["src/pages/auth/callback.astro", _page5],
    ["src/pages/auth/profile.astro", _page6],
    ["src/pages/auth/signin.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "dbabc406-5312-4e73-b0bc-b5010c9eeeb4",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
