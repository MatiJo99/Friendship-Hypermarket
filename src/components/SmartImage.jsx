import { useState } from "react";

export default function SmartImage({
  src,
  alt = "",
  label,
  hint,
  className = "",
  imgClassName = "h-full w-full object-cover",
  rounded = "rounded-md",
}) {
  const [missing, setMissing] = useState(!src);

  if (missing) {
    return (
      <div
        className={`${className} ${rounded} flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-fh-gold/40 bg-black/20 px-4 py-6 text-center`}
        role="img"
        aria-label={label || alt || "Image placeholder"}
      >
        <span className="text-[11px] font-semibold uppercase tracking-wide text-fh-gold">
          {label || "Add image"}
        </span>
        {src && (
          <code className="max-w-full break-all text-[10px] leading-tight text-fh-cream/50">
            {src}
          </code>
        )}
        {hint && <span className="text-[10px] text-fh-cream/40">{hint}</span>}
      </div>
    );
  }

  return (
    <div className={`${className} ${rounded} overflow-hidden bg-black/25`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setMissing(true)}
        className={imgClassName}
      />
    </div>
  );
}
