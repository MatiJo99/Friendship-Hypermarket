import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLang } from "../LanguageContext";
import productsData from "../content/products.json";
import SmartImage from "./SmartImage";
import Reveal from "../hooks/useReveal";
import { ChevronLeft, ChevronRight/*, PauseIcon, PlayIcon*/ } from "./Icons";

const AUTOPLAY_MS = 4500;

export default function ProductShowcase() {
  const { t, tr } = useLang();
  const items = productsData.items;
  const n = items.length;

  const slides = [...items, ...items];
  const total = slides.length;

  const [index, setIndex] = useState(0);
  const [noAnim, setNoAnim] = useState(false);
  const [paused, setPaused] = useState(false);
  const pending = useRef(null);

  useLayoutEffect(() => {
    if (!noAnim) return;
    const raf = requestAnimationFrame(() => {
      setNoAnim(false);
      if (pending.current !== null) {
        setIndex(pending.current);
        pending.current = null;
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [noAnim]);

  useEffect(() => {
    if (paused) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = setInterval(() => setIndex((i) => i + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused]);

  const next = () => setIndex((i) => i + 1);

  const prev = () => {
    if (index === 0) {
      pending.current = n - 1;
      setNoAnim(true);
      setIndex(n);
    } else {
      setIndex((i) => i - 1);
    }
  };

  const onTransitionEnd = () => {
    if (index >= n) {
      setNoAnim(true);
      setIndex(0);
    }
  };

  const activeDot = index % n;

  return (
    <section className="bg-fh-night">
      <div
        className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* ---- Heading (teal accent for this section) ---- */}
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-fh-teal/80">
            {t("products.eyebrow")}
          </p>
          <h2 className="mt-2 text-center font-display text-3xl font-bold text-fh-teal lg:text-[2.1rem]">
            {t("products.heading")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-fh-muted">
            {t("products.subheading")}
          </p>
        </Reveal>

        {/* ---- Carousel ---- */}
        <Reveal from="zoom" delay={140} className="relative mt-9">
          <div className="overflow-hidden">
            <div
              className={`carousel-track ${noAnim ? "no-anim" : ""}`}
              style={{
                "--total": total,
                "--i": index,
                width: "calc(var(--total) * 100% / var(--slides))",
                transform: "translateX(calc(var(--i) * -100% / var(--total)))",
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {slides.map((product, i) => (
                <div
                  key={`${product.id}-${i}`}
                  className="carousel-slide px-2.5 sm:px-3"
                  aria-hidden={i >= n ? "true" : undefined}
                >
                  <ProductCard product={product} tr={tr} />
                </div>
              ))}
            </div>
          </div>

          {/* ---- Arrows ---- */}
          <button
            type="button"
            onClick={prev}
            aria-label={t("products.prev")}
            className="absolute left-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-fh-deep/80 text-fh-gold ring-1 ring-fh-gold/30 backdrop-blur transition hover:bg-fh-gold hover:text-fh-deep lg:-left-4"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={t("products.next")}
            className="absolute right-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-fh-deep/80 text-fh-gold ring-1 ring-fh-gold/30 backdrop-blur transition hover:bg-fh-gold hover:text-fh-deep lg:-right-4"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </Reveal>

        {/* ---- Dots + pause ---- */}
        <div className="mt-7 flex items-center justify-center gap-4">
          <ol className="flex items-center gap-2.5">
            {items.map((product, i) => (
              <li key={product.id}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${t("products.goTo")} ${tr(product.name)}`}
                  aria-current={activeDot === i ? "true" : undefined}
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    activeDot === i
                      ? "w-7 bg-fh-teal"
                      : "w-2.5 bg-fh-cream/25 hover:bg-fh-cream/50"
                  }`}
                />
              </li>
            ))}
          </ol>

          {/* <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            aria-label={paused ? t("products.play") : t("products.pause")}
            className="grid h-8 w-8 place-items-center rounded-full text-fh-cream/45 transition hover:bg-fh-cream/10 hover:text-fh-teal"
          >
            {paused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
          </button> */}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, tr }) {
  return (
    <article className="hv-lift group h-full overflow-hidden rounded-lg bg-white shadow-card transition duration-500 hover:-translate-y-2 hover:shadow-gold">
      <div className="overflow-hidden bg-neutral-200">
        <SmartImage
          src={product.image}
          alt={tr(product.name)}
          label={tr(product.category)}
          hint="≈ 800×600"
          className="aspect-[4/3] w-full"
          rounded="rounded-none"
        />
      </div>

      <div className="px-5 py-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-neutral-500">
          {tr(product.category)}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-semibold text-neutral-900 transition group-hover:text-fh-gold-dim">
          {tr(product.name)}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
          {tr(product.detail)}
        </p>
      </div>
    </article>
  );
}
