import { useRef, useState } from "react";
import { useLang } from "../LanguageContext";
import site from "../config/site";
import Reveal from "../hooks/useReveal";
import { PhoneIcon } from "./Icons";

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="relative isolate flex min-h-[75vh] items-center justify-center overflow-hidden sm:min-h-[85vh]">
      <VideoBackdrop />

      <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-24 text-center lg:pb-24 lg:pt-32">
        <Reveal from="fade">
          <p className="font-display text-2xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] sm:text-3xl">
            {t("hero.welcome")}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h1 className="mt-2 font-display text-3xl font-black leading-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] sm:text-4xl lg:text-[2.85rem]">
            {t("hero.brandLine")}
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] font-bold leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] lg:text-base">
            {t("hero.body")}
          </p>
        </Reveal>

        <Reveal from="zoom" delay={360}>
          <a
            href={`tel:${site.phone.dial}`}
            aria-label={t("hero.ctaAria")}
            className="group mt-8 inline-flex items-center gap-3 rounded-xl border-2 border-fh-gold bg-black/40 px-10 py-3.5 font-display text-lg font-semibold text-fh-gold backdrop-blur-md transition duration-300 hover:bg-fh-gold hover:text-fh-deep hover:shadow-gold focus-visible:bg-fh-gold focus-visible:text-fh-deep"
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
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -top-5 -z-10 overflow-hidden">
      {showVideo && (
        <video
          ref={videoRef}
          className="h-full w-full object-contain sm:object-cover sm:object-top"
          src={site.heroVideo}
          poster={site.heroPoster || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
        />
      )}

      {showPoster && (
        <img
          src={site.heroPoster}
          alt=""
          className="h-full w-full object-contain drift sm:object-cover sm:object-top"
          onError={() => setPosterFailed(true)}
        />
      )}

      {showHint && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-b from-neutral-200 via-neutral-100 to-fh-night px-6 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-fh-gold">
            Background video slot
          </span>
          <code className="text-[10px] leading-relaxed text-fh-muted">
            /assets/video/store-loop.mp4
            <br />
            /assets/photos/hero-poster.jpg
          </code>
        </div>
      )}

      {/* Light veil over footage so video is clearly visible while keeping text ultra-crisp */}
      <div
        className="absolute inset-0 bg-black/20 transition-opacity duration-300"
        style={{ opacity: site.heroOverlayOpacity }}
      />
      {/* Smooth fade at the bottom to blend seamlessly into the warm alabaster page */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-fh-night" />
    </div>
  );
}
