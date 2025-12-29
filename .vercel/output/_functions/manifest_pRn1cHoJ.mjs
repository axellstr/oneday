import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_9vvDxKFD.mjs';
import 'clsx';
import './chunks/astro-designed-error-pages_DTAjIt-M.mjs';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_IrdD1Vyq.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/soteriou/Desktop/romika/","cacheDir":"file:///Users/soteriou/Desktop/romika/node_modules/.astro/","outDir":"file:///Users/soteriou/Desktop/romika/dist/","srcDir":"file:///Users/soteriou/Desktop/romika/src/","publicDir":"file:///Users/soteriou/Desktop/romika/public/","buildClientDir":"file:///Users/soteriou/Desktop/romika/dist/client/","buildServerDir":"file:///Users/soteriou/Desktop/romika/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.Dnl6ufZW.css"}],"routeData":{"route":"/app/dashboard","isIndex":false,"type":"page","pattern":"^\\/app\\/dashboard\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/app/dashboard.astro","pathname":"/app/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.Dnl6ufZW.css"}],"routeData":{"route":"/app/habit/[id]","isIndex":false,"type":"page","pattern":"^\\/app\\/habit\\/([^/]+?)\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"habit","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/app/habit/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.Dnl6ufZW.css"}],"routeData":{"route":"/app/settings","isIndex":false,"type":"page","pattern":"^\\/app\\/settings\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/app/settings.astro","pathname":"/app/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.Dnl6ufZW.css"}],"routeData":{"route":"/app","isIndex":true,"type":"page","pattern":"^\\/app\\/?$","segments":[[{"content":"app","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/app/index.astro","pathname":"/app","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.Dnl6ufZW.css"},{"type":"inline","content":".callback-page[data-astro-cid-qbporkgn]{min-height:100vh;display:flex;align-items:center;justify-content:center}.callback-content[data-astro-cid-qbporkgn]{text-align:center}.callback-spinner[data-astro-cid-qbporkgn]{width:32px;height:32px;border:2px solid var(--color-border);border-top-color:#fff;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 1.5rem}@keyframes spin{to{transform:rotate(360deg)}}.callback-title[data-astro-cid-qbporkgn]{font-size:1.25rem;font-weight:400;color:#fff;margin-bottom:.5rem}.callback-text[data-astro-cid-qbporkgn]{font-size:.875rem;color:var(--color-text-muted)}\n"}],"routeData":{"route":"/auth/callback","isIndex":false,"type":"page","pattern":"^\\/auth\\/callback\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"callback","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/callback.astro","pathname":"/auth/callback","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.Dnl6ufZW.css"}],"routeData":{"route":"/auth/profile","isIndex":false,"type":"page","pattern":"^\\/auth\\/profile\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/profile.astro","pathname":"/auth/profile","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.Dnl6ufZW.css"},{"type":"inline","content":".auth-page[data-astro-cid-sde2wqi2]{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}.auth-page-inner[data-astro-cid-sde2wqi2]{position:relative;z-index:10;width:100%;max-width:420px;padding:2rem}.auth-logo[data-astro-cid-sde2wqi2]{display:block;text-align:center;font-size:1.25rem;font-weight:300;color:#fff;letter-spacing:-.025em;text-decoration:none;margin-bottom:2rem;transition:opacity .15s ease}.auth-logo[data-astro-cid-sde2wqi2]:hover{opacity:.8}.auth-page-bg[data-astro-cid-sde2wqi2]{position:absolute;inset:0;overflow:hidden;pointer-events:none}.auth-bg-pattern[data-astro-cid-sde2wqi2]{position:absolute;inset:-50%;background:radial-gradient(circle at 20% 80%,rgba(255,255,255,.02) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(255,255,255,.02) 0%,transparent 50%),radial-gradient(circle at 50% 50%,rgba(255,255,255,.01) 0%,transparent 70%);animation:subtle-rotate 120s linear infinite}@keyframes subtle-rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"}],"routeData":{"route":"/auth/signin","isIndex":false,"type":"page","pattern":"^\\/auth\\/signin\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}],[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth/signin.astro","pathname":"/auth/signin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.Dnl6ufZW.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/soteriou/Desktop/romika/src/pages/app/dashboard.astro",{"propagation":"none","containsHead":true}],["/Users/soteriou/Desktop/romika/src/pages/app/habit/[id].astro",{"propagation":"none","containsHead":true}],["/Users/soteriou/Desktop/romika/src/pages/app/index.astro",{"propagation":"none","containsHead":true}],["/Users/soteriou/Desktop/romika/src/pages/app/settings.astro",{"propagation":"none","containsHead":true}],["/Users/soteriou/Desktop/romika/src/pages/auth/callback.astro",{"propagation":"none","containsHead":true}],["/Users/soteriou/Desktop/romika/src/pages/auth/profile.astro",{"propagation":"none","containsHead":true}],["/Users/soteriou/Desktop/romika/src/pages/auth/signin.astro",{"propagation":"none","containsHead":true}],["/Users/soteriou/Desktop/romika/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/app/dashboard@_@astro":"pages/app/dashboard.astro.mjs","\u0000@astro-page:src/pages/app/habit/[id]@_@astro":"pages/app/habit/_id_.astro.mjs","\u0000@astro-page:src/pages/app/settings@_@astro":"pages/app/settings.astro.mjs","\u0000@astro-page:src/pages/app/index@_@astro":"pages/app.astro.mjs","\u0000@astro-page:src/pages/auth/callback@_@astro":"pages/auth/callback.astro.mjs","\u0000@astro-page:src/pages/auth/profile@_@astro":"pages/auth/profile.astro.mjs","\u0000@astro-page:src/pages/auth/signin@_@astro":"pages/auth/signin.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_pRn1cHoJ.mjs","/Users/soteriou/Desktop/romika/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CHnU40mU.mjs","/Users/soteriou/Desktop/romika/src/components/HabitDetail":"_astro/HabitDetail.CEpgFLV-.js","/Users/soteriou/Desktop/romika/src/components/HistoryView":"_astro/HistoryView.b1g27PZG.js","/Users/soteriou/Desktop/romika/src/components/ProfilePage":"_astro/ProfilePage.BswKUEtB.js","/Users/soteriou/Desktop/romika/src/components/AuthForm":"_astro/AuthForm.DTiM0EiS.js","/Users/soteriou/Desktop/romika/src/components/Dashboard":"_astro/Dashboard.DofwN4rX.js","/Users/soteriou/Desktop/romika/src/components/UserMenu":"_astro/UserMenu.6T7mM3Jz.js","@astrojs/react/client.js":"_astro/client.9unXo8s5.js","/Users/soteriou/Desktop/romika/src/pages/app/settings.astro?astro&type=script&index=0&lang.ts":"_astro/settings.astro_astro_type_script_index_0_lang.CgrOxZZr.js","/Users/soteriou/Desktop/romika/src/pages/auth/callback.astro?astro&type=script&index=0&lang.ts":"_astro/callback.astro_astro_type_script_index_0_lang.BkEI5IB3.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/dashboard.Dnl6ufZW.css","/favicon.svg","/manifest.json","/_astro/AuthForm.DTiM0EiS.js","/_astro/ContributionGrid.X3sfB_FH.js","/_astro/Dashboard.DofwN4rX.js","/_astro/HabitDetail.CEpgFLV-.js","/_astro/HistoryView.b1g27PZG.js","/_astro/ProfilePage.BswKUEtB.js","/_astro/UserMenu.6T7mM3Jz.js","/_astro/auth.CsosPdj2.js","/_astro/calendar.m48YCCf6.js","/_astro/callback.astro_astro_type_script_index_0_lang.BkEI5IB3.js","/_astro/check.BDY2JgSL.js","/_astro/chevron-down.D1TiT3I5.js","/_astro/client.9unXo8s5.js","/_astro/createLucideIcon.DUv9cxdk.js","/_astro/engagement.3y8JWS0i.js","/_astro/index.CbvldAwO.js","/_astro/index.WFquGv8Z.js","/_astro/loader-circle.g8yYwPMp.js","/_astro/settings.astro_astro_type_script_index_0_lang.CgrOxZZr.js","/_astro/streaks.DevOThBF.js","/_astro/supabase.C1O--1y1.js","/_astro/user.Byza7VFI.js","/icons/icon-192.svg","/icons/icon-512.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"2stJqNKqhhLwS6VPY0Jd7DA2WSZmhAnCGae9DpikmVo="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
