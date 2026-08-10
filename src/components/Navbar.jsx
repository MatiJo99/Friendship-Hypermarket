import { useEffect, useState } from "react";
import { useLang } from "../LanguageContext";
import site from "../config/site";
import SmartImage from "./SmartImage";
import SocialLinks from "./SocialLinks";
import { GlobeIcon } from "./Icons";

const LINKS = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "contact", href: "#contact" },
];

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Transparent over the hero video, solid once you scroll past it. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-fh-deep/95 shadow-lg shadow-black/40 backdrop-blur-md"
          : "bg-fh-night/40 backdrop-blur-sm"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-10"
        aria-label="Main"
      >
        {/* ---- Logo (hover: friendly tilt) ---- */}
        <a href="#home" className="hv-tilt flex shrink-0 items-center gap-3">
          <SmartImage
            src={site.logo}
            alt="Friendship Hypermarket"
            label="Logo"
            className="h-14 w-14 shrink-0"
            rounded="rounded-full"
            imgClassName="h-full w-full object-contain"
          />
          <span className="hidden font-display text-sm font-medium leading-tight text-fh-cream sm:block">
            {t("meta.brand")}
          </span>
        </a>

        {/* ---- Desktop links ---- */}
        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="relative font-display text-[15px] font-medium text-fh-gold transition after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-fh-gold after:transition-all after:duration-300 hover:text-fh-gold-soft hover:after:w-full"
              >
                {t(`nav.${link.id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 md:flex">
          <LanguageToggle lang={lang} setLang={setLang} label={t("meta.switchLabel")} />
          <SocialLinks size="sm" />
        </div>

        {/* ---- Mobile trigger ---- */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
          className="grid h-10 w-10 place-items-center rounded-lg ring-1 ring-fh-gold/40 md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-fh-gold transition-all ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-5 bg-fh-gold transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-fh-gold transition-all ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* ---- Mobile panel ---- */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-fh-gold/15 bg-fh-deep/98 transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-2.5 font-display font-medium text-fh-gold transition hover:bg-fh-cream/10"
              >
                {t(`nav.${link.id}`)}
              </a>
            </li>
          ))}
          <li className="mt-3 flex flex-wrap items-center justify-between gap-4 border-t border-fh-gold/15 pt-4">
            <LanguageToggle lang={lang} setLang={setLang} label={t("meta.switchLabel")} />
            <SocialLinks size="sm" />
          </li>
        </ul>
      </div>
    </header>
  );
}

/* Both labels visible at once, so a visitor can find their language
   without already being able to read the active one. */
function LanguageToggle({ lang, setLang, label }) {
  return (
    <div
      className="flex items-center gap-1 rounded-full bg-fh-cream/10 p-1 ring-1 ring-fh-gold/25"
      role="group"
      aria-label={label}
    >
      <GlobeIcon className="ml-1.5 h-4 w-4 text-fh-gold/70" />
      {[
        { code: "am", short: "አማ" },
        { code: "en", short: "EN" },
      ].map(({ code, short }) => (
        <button
          key={code}
          type="button"
          lang={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
            lang === code
              ? "bg-fh-gold text-fh-deep"
              : "text-fh-cream/70 hover:text-fh-cream"
          }`}
        >
          {short}
        </button>
      ))}
    </div>
  );
}
