import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Reusable hook that observes an element and triggers a CSS class
 * when it enters the viewport. Used across all pages for scroll-reveal.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/**
 * Observe multiple children of a container and stagger their reveal.
 * Returns the container ref and the visible state.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.08
): [RefObject<T | null>, boolean] {
  return useScrollReveal<T>(threshold);
}
