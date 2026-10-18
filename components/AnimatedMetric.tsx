"use client";

import { useEffect, useRef, useState } from "react";

/** Counts a metric into view while keeping its final display text exact. */
export default function AnimatedMetric({ value, className = "" }: { value: string; className?: string }) {
  const [shown, setShown] = useState("0");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.textContent = value;
      return;
    }
    const numeric = Number(value.replace(/[^\d.]/g, ""));
    if (!Number.isFinite(numeric)) {
      element.textContent = value;
      return;
    }
    let frame = 0;
    let started = 0;
    const run = (time: number) => {
      if (!started) started = time;
      const progress = Math.min((time - started) / 1400, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = numeric * eased;
      const formatted = Number.isInteger(numeric) ? Math.floor(current).toLocaleString() : current.toFixed(1);
      const suffix = value.replace(/[\d,.]/g, "");
      setShown(progress === 1 ? value : `${formatted}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(run);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
        cancelAnimationFrame(frame);
        started = 0;
        setShown("0");
        frame = requestAnimationFrame(run);
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        started = 0;
        setShown("0");
      }
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return <dd ref={ref} className={`tabular-nums ${className}`}>{shown}</dd>;
}
