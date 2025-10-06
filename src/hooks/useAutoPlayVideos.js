import { useEffect } from "react";

export default function useAutoPlayVideos(selector = "video[data-autoplay-on-view]") {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const videos = Array.from(document.querySelectorAll(selector));
    if (!videos.length) return;

    const ensureMuted = (video) => {
      if (!video.muted) video.muted = true;
      if (!video.hasAttribute("playsinline")) video.setAttribute("playsinline", "true");
    };

    videos.forEach((video) => {
      ensureMuted(video);
      video.setAttribute("muted", "muted");
      video.setAttribute("preload", video.getAttribute("preload") || "metadata");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { target } = entry;
          if (!(target instanceof HTMLVideoElement)) return;

          if (entry.isIntersecting) {
            target.play().catch(() => {
              /* ignore autoplay rejection */
            });
          } else {
            target.pause();
          }
        });
      },
      { threshold: 0.45 },
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
    };
  }, [selector]);
}
