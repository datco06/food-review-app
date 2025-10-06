import { useEffect } from "react";

const defaults = {
  threshold: 0.2,
  rootMargin: "0px 0px -80px 0px",
  once: true,
};

export default function useScrollReveal(
  selector = "[data-reveal]",
  options = {}
) {
  useEffect(() => {
    const settings = { ...defaults, ...options };
    const elements = Array.from(document.querySelectorAll(selector));
    if (!elements.length) {
      return undefined;
    }

    const onIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (settings.once) {
            observer.unobserve(entry.target);
          }
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, settings);
    elements.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [selector, options.threshold, options.rootMargin, options.once]);
}
