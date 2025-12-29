import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_9vvDxKFD.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { currentPath } = Astro2.props;
  const links = [
    { href: "/app", label: "Streaks" },
    { href: "/app/dashboard", label: "History" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="nav"> <div class="nav-inner"> <div class="nav-links"> ${links.map((link) => {
    const isActive = currentPath === link.href || link.href === "/app" && currentPath.startsWith("/app/habit/");
    return renderTemplate`<a${addAttribute(link.href, "href")}${addAttribute(`nav-link ${isActive ? "nav-link-active" : "nav-link-inactive"}`, "class")}> ${link.label} </a>`;
  })} </div> </div> </nav>`;
}, "/Users/soteriou/Desktop/romika/src/components/Navigation.astro", void 0);

export { $$Navigation as $ };
