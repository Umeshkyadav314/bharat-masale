"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/** Packet-style card: masale name + optional image (that masale’s image) */
export function MasalaPacketCard({
  name,
  desc,
  image,
  className,
  aspectRatio = "4/3",
  showLabelStrip = true,
  size = "default",
}: {
  name: string;
  desc?: string;
  image?: string;
  className?: string;
  aspectRatio?: "4/3" | "3/4";
  showLabelStrip?: boolean;
  size?: "default" | "compact";
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border-2 border-amber-800/30 bg-gradient-to-b from-amber-50 to-amber-100/80 shadow-md transition hover:shadow-lg dark:from-amber-950/40 dark:to-amber-900/30 dark:border-amber-600/30",
        className
      )}
    >
      <div
        className={cn(
          "relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-6",
          aspectRatio === "4/3" ? "aspect-[4/3] min-h-[140px]" : "aspect-[3/4] min-h-[160px]",
          size === "compact" && "py-4 min-h-[120px]"
        )}
      >
        {image && (
          <>
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        )}
        {showLabelStrip && (
          <div className="absolute left-0 right-0 top-0 z-10 h-2 bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-amber-400" />
        )}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <p
            className={cn(
              "font-serif font-bold drop-shadow-md",
              image
                ? "text-amber-100"
                : "text-amber-900 dark:text-amber-100",
              size === "compact" ? "text-base md:text-lg" : "text-lg md:text-xl"
            )}
            style={image ? { textShadow: "0 1px 2px rgba(0,0,0,0.8)" } : undefined}
          >
            {name}
          </p>
          <p
            className={cn(
              "mt-1 text-center text-xs font-medium uppercase tracking-wider",
              image ? "text-amber-200/95" : "text-amber-700/80 dark:text-amber-200/70"
            )}
          >
            Bharat Masale
          </p>
        </div>
      </div>
      {desc && (
        <div className="border-t border-amber-200 bg-amber-50/50 px-4 py-2 dark:border-amber-800/50 dark:bg-amber-950/30">
          <p className="text-center text-xs text-muted-foreground">{desc}</p>
        </div>
      )}
    </div>
  );
}
