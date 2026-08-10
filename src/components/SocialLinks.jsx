import { FacebookIcon, InstagramIcon, TikTokIcon } from "./Icons";
import site from "../config/site";
import { useLang } from "../LanguageContext";

/* Order matches the Figma: Facebook, Instagram, TikTok. */
const NETWORKS = [
  { key: "facebook", name: "Facebook", Icon: FacebookIcon, brand: "#1877F2" },
  { key: "instagram", name: "Instagram", Icon: InstagramIcon, brand: "#D62976" },
  { key: "tiktok", name: "TikTok", Icon: TikTokIcon, brand: "#111111" },
];

export default function SocialLinks({ size = "sm", className = "" }) {
  const { t } = useLang();

  const box = size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const glyph = size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {NETWORKS.map(({ key, name, Icon, brand }) => {
        const url = site.social[key];
        const shared = `${box} grid place-items-center rounded-full transition duration-300`;

        if (!url) {
          return (
            <li key={key}>
              <span
                className={`${shared} cursor-not-allowed bg-fh-cream/10 text-fh-cream/45 ring-1 ring-fh-cream/10`}
                title={`${name} — ${t("footer.linkPending")}`}
                aria-label={`${name} — ${t("footer.linkPending")}`}
              >
                <Icon className={glyph} />
              </span>
            </li>
          );
        }

        return (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              title={name}
              style={{ color: brand }}
              className={`${shared} bg-white shadow-sm hover:-translate-y-1 hover:scale-105 hover:shadow-lg`}
            >
              <Icon className={glyph} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
