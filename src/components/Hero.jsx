import { useRef, useState } from "react";
import { useLang } from "../LanguageContext";
import site from "../config/site";
import Reveal from "../hooks/useReveal";
import { PhoneIcon } from "./Icons";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="relative isolate overflow-hidden">
      <VideoBackdrop />

      <div className="relative mx-auto max-w-4xl px-5 pb-14 pt-16 text-center lg:pb-20 lg:pt-24">
        <Reveal from="fade">
          <p className="font-display text-2xl font-semibold text-fh-gold sm:text-3xl">
            {t("hero.welcome")}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-1 font-display text-3xl font-bold leading-tight text-fh-gold sm:text-4xl lg:text-[2.7rem]">
            {t("hero.brandLine")}
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-6 max-w-2xl font-display text-[15px] font-semibold leading-relaxed text-fh-gold-soft/90 lg:text-base">
            {t("hero.body")}
          </p>
        </Reveal>

        <Reveal from="zoom" delay={360}>
          {/* Outlined button, as in the Figma. tel: opens the dialler
              with the number already filled in. */}
          <a
            href={`tel:${site.phone.dial}`}
            aria-label={t("hero.ctaAria")}
            className="group mt-8 inline-flex items-center gap-3 rounded-md border-2 border-fh-gold bg-fh-gold/10 px-10 py-3 font-display text-lg font-semibold text-fh-gold backdrop-blur-sm transition duration-300 hover:bg-fh-gold hover:text-fh-deep hover:shadow-gold focus-visible:bg-fh-gold focus-visible:text-fh-deep"
          >
            <PhoneIcon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            {t("hero.cta")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function VideoBackdrop() {
  const [videoFailed, setVideoFailed] = useState(!site.heroVideo);
  const [posterFailed, setPosterFailed] = useState(!site.heroPoster);
  const videoRef = useRef(null);

  const showVideo = !videoFailed;
  const showPoster = videoFailed && !posterFailed;
  const showHint = videoFailed && posterFailed;

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {showVideo && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={site.heroVideo}
          poster={site.heroPoster || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={(e) => { e.currentTarget.playbackRate = 0.5; }}
          onError={() => setVideoFailed(true)}
        />
      )}

      {showPoster && (
        <img
          src={site.heroPoster}
          alt=""
          className="h-full w-full object-cover drift"
          onError={() => setPosterFailed(true)}
        />
      )}

      {showHint && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-fh-plum via-fh-night to-fh-deep px-6 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-fh-gold/70">
            Background video slot
          </span>
          <code className="text-[10px] leading-relaxed text-fh-cream/40">
            /assets/video/store-loop.mp4
            <br />
            /assets/photos/hero-poster.jpg
          </code>
        </div>
      )}

      {/* Dark veil so the gold headline stays readable over any footage.
          Tune the strength in src/config/site.js -> heroOverlayOpacity */}
      <div
        className="absolute inset-0 bg-fh-night"
        style={{ opacity: site.heroOverlayOpacity }}
      />
      {/* Extra fade at the bottom so the hero melts into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-fh-night" />
    </div>
  );
}
