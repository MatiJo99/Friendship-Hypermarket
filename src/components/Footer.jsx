import { useLang } from "../LanguageContext";
import site from "../config/site";
import SocialLinks from "./SocialLinks";
import Reveal from "../hooks/useReveal";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer id="contact" className="border-t border-fh-cream/10 bg-fh-deep">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* ---- Contact ---- */}
          <Reveal from="left">
            <h2 className="font-display text-3xl font-bold text-white lg:text-[2.1rem]">
              {t("footer.heading")}
            </h2>

            <dl className="mt-6 space-y-3 font-display text-[15px] font-semibold">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <dt className="text-white">{t("footer.phone")}:</dt>
                <dd className="flex flex-col gap-1">
                  {site.contactNumbers.map((number) => (
                    <a
                      key={number}
                      href={`tel:${number.replace(/\s/g, "")}`}
                      className="text-fh-cream/90 transition hover:text-fh-gold hover:underline"
                    >
                      {number}
                    </a>
                  ))}
                </dd>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-2">
                <dt className="text-white">{t("footer.email")}:</dt>
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all text-fh-cream/90 transition hover:text-fh-gold hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* ---- Social ---- */}
          <Reveal from="right" delay={140}>
            <h2 className="font-display text-3xl font-bold text-white lg:text-[2.1rem]">
              {t("footer.socialHeading")}
            </h2>
            <div className="mt-6">
              <SocialLinks size="lg" />
            </div>
          </Reveal>
        </div>

        <p className="mt-14 border-t border-fh-cream/10 pt-6 text-xs text-fh-cream/35">
          © {new Date().getFullYear()} {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
