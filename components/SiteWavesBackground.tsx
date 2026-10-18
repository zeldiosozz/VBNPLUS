"use client";

import { useEffect, useRef } from "react";

type VantaEffect = { destroy: () => void };
type VantaOptions = {
  WAVES: (options: Record<string, unknown>) => VantaEffect;
};

declare global {
  interface Window {
    VANTA?: VantaOptions;
    THREE?: unknown;
  }
}

const THREE_SCRIPT = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
const VANTA_SCRIPT = "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js";

let threePromise: Promise<void> | undefined;
let vantaPromise: Promise<void> | undefined;

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    const script = existing ?? document.createElement("script");
    const onLoad = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    const onError = () => reject(new Error(`Unable to load ${src}`));

    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
    if (!existing) {
      script.src = src;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

function loadVanta() {
  threePromise ??= loadScript(THREE_SCRIPT);
  vantaPromise ??= threePromise.then(() => loadScript(VANTA_SCRIPT));
  return vantaPromise;
}
interface SiteWavesBackgroundProps {
  color?: number;          // e.g. 0xffbf00
  backgroundColor?: number; // e.g. 0x2b1055
  waveSpeed?: number;      // e.g. 1.0
}
export default function SiteWavesBackground({
  color = 0x0,
  backgroundColor = 0x111111,
}: SiteWavesBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let effect: VantaEffect | undefined;
    let cancelled = false;
    let generation = 0;

    const start = async (currentGeneration: number) => {
      if (reducedMotion.matches) return;

      try {
        await loadVanta();
        if (cancelled || generation !== currentGeneration || !hostRef.current || !window.VANTA?.WAVES || !window.THREE) return;

        effect = window.VANTA.WAVES({
          el: hostRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          color: color,
          backgroundColor: backgroundColor,
        });
      } catch {
        // Keep the theme-colored CSS background visible if either CDN script fails.
      }
    };

    const restart = () => {
      generation += 1;
      effect?.destroy();
      effect = undefined;
      void start(generation);
    };

    const onMotionChange = () => restart();
    reducedMotion.addEventListener("change", onMotionChange);
    void start(generation);

    return () => {
      cancelled = true;
      generation += 1;
      reducedMotion.removeEventListener("change", onMotionChange);
      effect?.destroy();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="site-waves-background theme-component pointer-events-none fixed inset-0 z-0 overflow-hidden" />;
}
