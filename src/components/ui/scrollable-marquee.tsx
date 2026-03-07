"use client";

import React, { useRef, useEffect, useCallback, useState, type ReactNode } from "react";

interface ScrollableMarqueeProps {
  children: ReactNode;
  /** Pixels per second for auto-scroll (higher = faster). Default 120. */
  speed?: number;
  /** Gap between duplicated items (e.g. gap-8). Applied to the inner flex. */
  className?: string;
  innerClassName?: string;
}

/**
 * Horizontal marquee that auto-scrolls faster and allows user to scroll/drag left or right.
 */
export function ScrollableMarquee({
  children,
  speed = 120,
  className = "",
  innerClassName = "flex gap-8",
}: ScrollableMarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isUserScrollingRef = useRef(false);
  const userScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const animate = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const now = performance.now();
    const delta = (now - lastTimeRef.current) / 1000;
    lastTimeRef.current = now;
    if (!isUserScrollingRef.current && delta > 0 && delta < 0.2) {
      const half = el.scrollWidth / 2;
      el.scrollLeft += speed * delta;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      if (el.scrollLeft <= 0) el.scrollLeft = Math.max(0, half + el.scrollLeft);
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [speed]);

  useEffect(() => {
    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);
    };
  }, [animate]);

  const markUserScroll = useCallback(() => {
    isUserScrollingRef.current = true;
    if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);
    userScrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
      userScrollTimeoutRef.current = null;
    }, 400);
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (Math.abs(e.deltaX) > 0) {
        markUserScroll();
        return;
      }
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        const el = scrollRef.current;
        if (el) el.scrollLeft += e.deltaY;
        markUserScroll();
      }
    },
    [markUserScroll]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest("a, button, input, [role='button']")) return;
      setIsDragging(true);
      markUserScroll();
      dragStartRef.current = { x: e.clientX, scrollLeft: scrollRef.current?.scrollLeft ?? 0 };
    },
    [markUserScroll]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const el = scrollRef.current;
      if (!el) return;
      const dx = dragStartRef.current.x - e.clientX;
      const next = dragStartRef.current.scrollLeft + dx;
      el.scrollLeft = next;
      dragStartRef.current = { x: e.clientX, scrollLeft: next };
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={scrollRef}
      className={`overflow-x-auto overflow-y-hidden scroll-smooth select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      style={{
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
    >
      <div className={`${innerClassName} w-max min-w-full`} style={{ willChange: "scroll-position" }}>
        {children}
        {children}
      </div>
    </div>
  );
}
