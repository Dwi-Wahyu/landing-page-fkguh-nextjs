// components/ui/use-in-view.ts
import { useState, useEffect, useRef } from "react";

interface UseInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean; // Animasi hanya sekali
}

export const useInView = <T extends HTMLElement = HTMLDivElement>(
  options?: UseInViewOptions
) => {
  const {
    threshold = 0,
    root = null,
    rootMargin = "0px",
    triggerOnce = false,
  } = options || {};
  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setInView(false); // Reset inView jika tidak triggerOnce
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce]);

  return { ref, inView };
};
