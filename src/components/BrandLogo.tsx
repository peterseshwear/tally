import { useState } from "react";

const TOKEN = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY as string;

/**
 * Renders an official brand logo via Logo.dev (img.logo.dev/{domain}).
 * Falls back to an initial-tile if the image fails to load.
 */
export function BrandLogo({
  domain,
  name,
  size = 40,
  rounded = 12,
  bg,
  className = "",
  greyscale = false,
  theme,
}: {
  domain: string;
  name: string;
  size?: number;
  rounded?: number;
  bg?: string;
  className?: string;
  greyscale?: boolean;
  theme?: "light" | "dark";
}) {
  const [failed, setFailed] = useState(false);
  const px = size * 2; // retina
  const params = new URLSearchParams({ token: TOKEN, size: String(px), format: "png" });
  if (greyscale) params.set("greyscale", "true");
  if (theme) params.set("theme", theme);
  const src = `https://img.logo.dev/${domain}?${params.toString()}`;

  if (failed || !TOKEN) {
    const initials = name
      .split(/\s+/)
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <div
        className={`grid place-items-center font-semibold text-white ${className}`}
        style={{
          width: size,
          height: size,
          borderRadius: rounded,
          background: bg ?? "#111111",
          fontSize: size * 0.36,
        }}
        aria-label={`${name} logo`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={`grid place-items-center overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: rounded,
        background: bg ?? "#FFFFFF",
        border: bg ? undefined : "1px solid #EAEAEA",
      }}
    >
      <img
        src={src}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        style={{ width: "78%", height: "78%", objectFit: "contain" }}
      />
    </div>
  );
}

/** Wordmark-style row (transparent, no tile) — good for social-proof strips. */
export function BrandWordmark({
  domain,
  name,
  height = 28,
  greyscale = true,
  className = "",
}: {
  domain: string;
  name: string;
  height?: number;
  greyscale?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const params = new URLSearchParams({
    token: TOKEN,
    size: String(height * 3),
    format: "png",
  });
  if (greyscale) params.set("greyscale", "true");
  const src = `https://img.logo.dev/${domain}?${params.toString()}`;

  if (failed || !TOKEN) {
    return (
      <span className={`font-sora text-[15px] font-semibold tracking-tight ${className}`}>
        {name}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={`${name} logo`}
      onError={() => setFailed(true)}
      className={className}
      style={{ height, width: "auto", objectFit: "contain" }}
      loading="lazy"
    />
  );
}
