import { BRANDING } from "@/config/branding";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark" | "compact";
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({
  variant = "light",
  className = "",
  width = 180,
  height = 40
}: LogoProps) {
  const logoSrc = variant === "compact"
    ? BRANDING.logo.compact
    : BRANDING.logo[variant];

  return (
    <Image
      src={logoSrc}
      alt={BRANDING.name}
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
