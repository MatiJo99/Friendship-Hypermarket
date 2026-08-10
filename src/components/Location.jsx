import { useLang } from "../LanguageContext";
import site from "../config/site";
import Reveal from "../hooks/useReveal";
import { PinIcon, ClockIcon, ExternalIcon } from "./Icons";

export default function Location() {
  const { t, tr, content } = useLang();
  const branchCopy = content.location.branches;

  return (
    <section id="location" className="bg-fh-night">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-16">
        {/* ---- Heading (sky accent for this section) ---- */}
        <Reveal from="left">
          <h2 className="font-display text-3xl font-bold text-fh-sky lg:text-[2.3rem]">
            {t("location.heading")}
          </h2>
          <p className="mt-2 text-sm text-fh-muted">{t("location.subheading")}</p>
        </Reveal>

        <ul className="mt-9 grid gap-7 lg:grid-cols-2">
          {site.branches.map((branch, i) => {
            const copy = branchCopy[branch.id];
            const name = tr(copy?.name);
            const address = tr(copy?.address);

            return (
              <Reveal
                as="li"
                key={branch.id}
                delay={i * 140}
                from={i === 0 ? "left" : "right"}
              >
                {/* hv-glow: lifts and picks up a gold halo on hover */}
                <div className="hv-glow overflow-hidden rounded-2xl border border-fh-gold/25 bg-fh-plum/40 backdrop-blur-sm">
                  {branch.embedUrl ? (
                    <iframe
                      src={branch.embedUrl}
                      title={`${t("location.mapTitle")} ${name}`}
                      className="block h-[280px] w-full lg:h-[320px]"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label="Map placeholder"
                      className="flex h-[280px] flex-col items-center justify-center gap-2 border-b border-dashed border-fh-gold/30 bg-black/25 px-6 text-center lg:h-[320px]"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-fh-gold">
                        Map embed
                      </span>
                      <code className="text-[10px] leading-relaxed text-fh-cream/50">
                        Paste your Google Maps embed URL into
                        <br />
                        src/config/site.js → branches → embedUrl
                      </code>
                    </div>
                  )}

                  <div className="flex flex-wrap items-end justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold text-fh-gold">
                        {name}
                      </h3>
                      <p className="mt-1.5 flex items-start gap-2 whitespace-pre-line text-sm leading-relaxed text-fh-cream/85">
                        <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-fh-sky" />
                        <span>{address}</span>
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-xs text-fh-muted">
                        <ClockIcon className="h-4 w-4 shrink-0 text-fh-teal" />
                        {t("location.hours")}
                      </p>
                    </div>

                    <a
                      href={branch.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-2 rounded-md border border-fh-gold px-4 py-2 font-display text-xs font-semibold text-fh-gold transition hover:bg-fh-gold hover:text-fh-deep"
                    >
                      {t("location.directions")}
                      <ExternalIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
