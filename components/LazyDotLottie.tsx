"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((module) => module.DotLottieReact),
  { ssr: false },
);

interface LazyDotLottieProps {
  src: string;
  className?: string;
}

/** Loads an animation near the viewport and pauses it when it scrolls away. */
export default function LazyDotLottie({ src, className }: LazyDotLottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<DotLottie | null>(null);
  const shouldPlayRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const syncPlayback = useCallback(() => {
    const player = playerRef.current;
    if (!player?.isLoaded) return;

    if (shouldPlayRef.current) player.play();
    else player.pause();
  }, []);

  const handleLoad = useCallback(() => {
    syncPlayback();
  }, [syncPlayback]);

  const handlePlayer = useCallback((player: DotLottie | null) => {
    const previousPlayer = playerRef.current;
    if (previousPlayer) previousPlayer.removeEventListener("load", handleLoad);

    playerRef.current = player;
    if (!player) return;

    player.addEventListener("load", handleLoad);
    if (player.isLoaded) syncPlayback();
  }, [handleLoad, syncPlayback]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(([entry]) => {
      const shouldPlay = entry.isIntersecting;
      shouldPlayRef.current = shouldPlay;
      if (shouldPlay) setShouldLoad(true);
      syncPlayback();
    }, { rootMargin: "200px 0px" });

    observer.observe(container);
    return () => observer.disconnect();
  }, [syncPlayback]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={!className ? { width: "100%", height: "100%", lineHeight: 0 } : undefined}
    >
      {shouldLoad && (
        <DotLottieReact
          src={src}
          loop
          autoplay={false}
          dotLottieRefCallback={handlePlayer}
          className={className}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
