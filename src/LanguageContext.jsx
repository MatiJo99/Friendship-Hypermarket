import { createContext, useContext, useEffect, useMemo, useState } from "react";
import content from "./content/content.json";

const LanguageContext = createContext(null);

const STORAGE_KEY = "friendship-lang";
export const LANGS = ["am", "en"];

export const DEFAULT_LANG = "am";

/** Walk a dotted path: get(obj, "hero.cta") */
function get(obj, path) {
  return path.split(".").reduce((node, key) => (node ? node[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANG;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return LANGS.includes(saved) ? saved : DEFAULT_LANG;
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo(() => {
    const t = (path) => {
      const node = get(content, path);
      if (!node) {
        if (import.meta.env.DEV) console.warn(`[i18n] missing key: ${path}`);
        return "";
      }
      if (typeof node === "string") return node;
      return node[lang] ?? node.en ?? "";
    };

    const tr = (node) => {
      if (!node) return "";
      if (typeof node === "string") return node;
      return node[lang] ?? node.en ?? "";
    };

    const toggle = () => setLang((prev) => (prev === "am" ? "en" : "am"));

    return { lang, setLang, toggle, t, tr, content };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
