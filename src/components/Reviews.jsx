import { useMemo, useState } from "react";
import { useLang } from "../LanguageContext";
import site from "../config/site";
import reviewsData from "../content/reviews.json";
import Reveal from "../hooks/useReveal";
import { Star, QuoteIcon, ChevronLeft, ChevronRight } from "./Icons";

const PER_PAGE = 3;

/* Avatar tints, cycled by position so the wall of cards has rhythm. */
const AVATAR_TINTS = [
  "bg-fh-teal/20 text-fh-teal",
  "bg-fh-amber/20 text-fh-amber",
  "bg-fh-lilac/20 text-fh-lilac",
  "bg-fh-sky/20 text-fh-sky",
  "bg-fh-gold/20 text-fh-gold",
];

export default function Reviews() {
  const { t, tr } = useLang();
  const [page, setPage] = useState(0);

  const items = reviewsData.items;

const { average, count, distribution } = useMemo(() => {
  const average = reviewsData.summary?.ratingOverride ?? 0;

  const buckets = [5, 4, 3, 2, 1].map((star) => {
    const hits = items.filter((r) => Number(r.stars) === star).length;

    return {
      star,
      hits,
      percent: items.length ? (hits / items.length) * 100 : 0,
    };
  });

  return {
    average,
    count: reviewsData.summary?.totalReviewsOverride ?? items.length,
    distribution: buckets,
  };
}, [items]);

  const pageCount = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const visible = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);
  const go = (next) => setPage(Math.min(Math.max(next, 0), pageCount - 1));

  return (
    <section id="reviews" className="bg-fh-night">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        {/* ---- Heading (amber accent) ---- */}
        <Reveal>
          <h2 className="text-center font-display text-3xl font-bold text-white lg:text-[2.3rem]">
            {t("reviews.heading")}
          </h2>
          <p className="mt-2 text-center text-sm text-fh-muted">
            {t("reviews.subheading")}
          </p>
        </Reveal>

        {/* ---- Summary & Google Review Link ---- */}
        <div className="mt-9 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <Reveal from="zoom" delay={120}>
            <a
              href={site.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col items-center justify-center gap-5 rounded-2xl border border-fh-gold/25 bg-gradient-to-br from-fh-plum/80 to-fh-deep/80 p-8 text-center backdrop-blur-sm transition duration-300 hover:border-fh-gold hover:bg-fh-plum/90"
            >
              <span className="font-display text-3xl font-bold text-white lg:text-4xl">
                {t("reviews.googleReview") || "Google Review"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-fh-gold/40 bg-black/40 px-6 py-2.5 text-sm font-semibold text-fh-cream transition duration-300 group-hover:bg-fh-gold group-hover:text-fh-deep">
                {t("reviews.viewOnGoogle") || "View a review on Google"}
              </span>
            </a>
          </Reveal>

          {/* ---- Summary card ---- */}
          <Reveal from="zoom" delay={200} className="h-full">
            <div className="flex h-full flex-col justify-center gap-8 rounded-2xl border border-fh-gold/25 bg-gradient-to-br from-fh-plum/80 to-fh-deep/80 p-6 backdrop-blur-sm sm:grid-flow-col sm:grid-cols-[auto_1fr] sm:items-center sm:gap-12 sm:p-8">
              <div className="text-center sm:text-left">
                <p className="font-display text-6xl font-bold leading-none text-fh-amber">
                  {average.toFixed(2)}
                </p>
                <StarRow value={average} className="mt-3 justify-center text-fh-amber sm:justify-start" size="h-5 w-5" />
                <p className="mt-2 text-xs text-fh-muted">
                  {t("reviews.basedOn")} {count} {t("reviews.reviewsWord")}
                </p>
              </div>

              {/* Distribution bars */}
              <ul className="w-full space-y-2">
                {distribution.map(({ star, hits, percent }) => (
                  <li key={star} className="flex items-center gap-3">
                    <span className="w-10 shrink-0 text-right text-xs tabular-nums text-fh-muted">
                      {star} ★
                    </span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-fh-cream/10">
                      <span
                        className="block h-full rounded-full bg-fh-amber/80 transition-[width] duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </span>
                    <span className="w-6 shrink-0 text-xs tabular-nums text-fh-muted/70">
                      {hits}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ---- Review cards ---- */}
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((review, i) => (
            <Reveal as="li" key={review.id} delay={i * 80} className="h-full">
              <ReviewCard
                review={review}
                tint={AVATAR_TINTS[(page * PER_PAGE + i) % AVATAR_TINTS.length]}
                tr={tr}
                starsWord={t("reviews.starsWord")}
              />
            </Reveal>
          ))}
        </ul>

        {/* ---- Pager ---- */}
        {pageCount > 1 && (
          <nav
            className="mt-9 flex items-center justify-center gap-5"
            aria-label={t("reviews.heading")}
          >
            <PagerButton onClick={() => go(page - 1)} disabled={page === 0} label={t("reviews.prev")}>
              <ChevronLeft className="h-5 w-5" />
            </PagerButton>

            <ol className="flex items-center gap-2.5">
              {Array.from({ length: pageCount }, (_, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`${t("reviews.page")} ${i + 1}`}
                    aria-current={page === i ? "page" : undefined}
                    className={`block h-2.5 rounded-full transition-all duration-300 ${
                      page === i
                        ? "w-7 bg-fh-amber"
                        : "w-2.5 bg-fh-cream/25 hover:bg-fh-cream/50"
                    }`}
                  />
                </li>
              ))}
            </ol>

            <PagerButton
              onClick={() => go(page + 1)}
              disabled={page === pageCount - 1}
              label={t("reviews.next")}
            >
              <ChevronRight className="h-5 w-5" />
            </PagerButton>
          </nav>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review, tint, tr, starsWord }) {
  const body = tr(review.body);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-fh-cream/10 bg-fh-plum/40 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-fh-amber/40 hover:bg-fh-plum/60">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fh-amber/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <QuoteIcon
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 h-9 w-9 text-fh-cream/[0.06]"
      />

      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-display text-base font-semibold ${tint}`}
        >
          {review.name.trim().charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-[15px] font-semibold text-fh-cream">
            {review.name}
          </p>
          <p className="text-xs text-fh-muted/70">{review.date}</p>
        </div>
      </header>

      <StarRow
        value={review.stars}
        className="mt-3 text-fh-amber"
        size="h-4 w-4"
        label={`${review.stars} ${starsWord}`}
      />

      <div className="mt-3 h-[8.5rem]">
        <p className="text-sm leading-relaxed text-fh-muted line-clamp-6">
          {body}
        </p>
      </div>
    </article>
  );
}

function StarRow({ value, className = "", size = "h-4 w-4", label }) {
  return (
    <span
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label={label || `${Number(value).toFixed(1)} / 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = value >= i ? "full" : value >= i - 0.5 ? "half" : "empty";
        return <Star key={i} fill={fill} className={size} />;
      })}
    </span>
  );
}

function PagerButton({ children, onClick, disabled, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-fh-amber ring-1 ring-fh-amber/30 transition hover:bg-fh-amber hover:text-fh-deep disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-fh-amber"
    >
      {children}
    </button>
  );
}
