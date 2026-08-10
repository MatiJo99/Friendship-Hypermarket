import { useEffect, useRef, useState } from "react";

export function useReveal({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, visible };
}

export default function Reveal({
  children,
  from = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  ...rest
}) {
  const { ref, visible } = useReveal();

  const direction =
    from === "left"
      ? "reveal-left"
      : from === "right"
        ? "reveal-right"
        : from === "zoom"
          ? "reveal-zoom"
          : "";

  return (
    <Tag
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`reveal ${direction} ${visible ? "is-visible" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
