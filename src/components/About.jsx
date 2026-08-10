import { useState } from "react";
import { useLang } from "../LanguageContext";
import site from "../config/site";
import Reveal from "../hooks/useReveal";

export default function About() {
  const { t } = useLang();
  const [backdropFailed, setBackdropFailed] = useState(!site.aboutBackdrop);

  return (
    <section id="about" className="relative isolate overflow-hidden">
      {/* ---- Backdrop photo (hover: desaturated -> full colour) ---- */}
      <div aria-hidden="true" className="hv-saturate absolute inset-0 -z-10">
        {!backdropFailed ? (
          <img
            src={site.aboutBackdrop}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setBackdropFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-y-2 border-dashed border-fh-gold/25 bg-fh-plum/60 px-6 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-fh-gold/70">
              About backdrop photo
            </span>
            <code className="text-[10px] text-fh-cream/40">
              /assets/photos/aisle-trolley.jpg
            </code>
          </div>
        )}

        {/* Dark veil — tune in src/config/site.js -> aboutOverlayOpacity */}
        <div
          className="absolute inset-0 bg-fh-deep"
          style={{ opacity: site.aboutOverlayOpacity }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-5 py-16 lg:px-10 lg:py-24">
        {/* ---- About us (gold) ---- */}
        <Reveal from="left">
          <h2 className="font-display text-3xl font-bold text-fh-gold lg:text-[2.1rem]">
            {t("about.heading")}
          </h2>
        </Reveal>
        <Reveal from="left" delay={130}>
          <p className="mt-4 max-w-3xl font-display text-[15px] font-semibold leading-relaxed text-fh-gold-soft/90">
            {t("about.body")}
          </p>
        </Reveal>

        {/* ---- Why us (lilac, so the two blocks read as separate) ---- */}
        <Reveal from="left" delay={80} className="mt-12">
          <h2 className="font-display text-3xl font-bold text-fh-lilac lg:text-[2.1rem]">
            {t("about.whyHeading")}
          </h2>
        </Reveal>
        <Reveal from="left" delay={200}>
          <p className="mt-4 max-w-3xl font-display text-[15px] font-semibold leading-relaxed text-fh-cream/90">
            {t("about.whyBody")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
