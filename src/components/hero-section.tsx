"use client";

import { cn } from '@/lib/utils';

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[758px] overflow-hidden bg-[radial-gradient(1200px_600px_at_50%_60%,#1b1f2a_0%,#0b0c10_70%)]"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/15 z-[2]" aria-hidden="true"></div>
      <div className="sticky top-[var(--header-h)] z-20">
        <nav
          className={cn(
            "go-nav",
            "mx-auto flex justify-center items-center w-[min(85%,1280px)] h-20 bg-primary shadow-[0_4px_20px_rgba(0,0,0,.4)]",
            "rounded-t-[var(--rMax)] rounded-b-none",
            "[--y:calc(100%_-_(var(--header-h)_-_1px))]",
            "sticky bottom-[var(--y)] top-auto",
            "md:top-[var(--header-h)] md:bottom-auto",
            "md:[&.go-nav]:rounded-t-none md:[&.go-nav]:rounded-b-[var(--rMax)]"
          )}
          aria-label="Glas Otoka - traka"
        ></nav>
      </div>
    </section>
  );
}
