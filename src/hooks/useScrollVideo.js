import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion.js";

export function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

export function getRangeProgress(progress, start, end) {
  return clamp((progress - start) / (end - start));
}

export function useScrollVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const durationRef = useRef(0);
  const targetTimeRef = useRef(0);
  const smoothTimeRef = useRef(0);
  const videoFrameRef = useRef(null);
  const scrollFrameRef = useRef(null);
  const lastSeekRef = useRef(0);
  const dimensionsRef = useRef({ scrollableDistance: 1 });
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    dimensionsRef.current.scrollableDistance = Math.max(container.offsetHeight - window.innerHeight, 1);
  }, []);

  const animate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !durationRef.current) {
      videoFrameRef.current = null;
      return;
    }

    const now = performance.now();
    const smoothing = prefersReducedMotion ? 1 : window.innerWidth < 768 ? 0.24 : 0.18;
    const nextTime = smoothTimeRef.current + (targetTimeRef.current - smoothTimeRef.current) * smoothing;
    const remaining = Math.abs(targetTimeRef.current - nextTime);
    const seekDelta = Math.abs(video.currentTime - nextTime);
    const canSeek = !video.seeking && now - lastSeekRef.current > 38;

    if (canSeek && seekDelta > 0.035) {
      video.currentTime = nextTime;
      lastSeekRef.current = now;
    }

    smoothTimeRef.current = nextTime;

    if (remaining > 0.012) {
      videoFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (!video.seeking && Math.abs(video.currentTime - targetTimeRef.current) > 0.025) {
        video.currentTime = targetTimeRef.current;
      }
      smoothTimeRef.current = targetTimeRef.current;
      videoFrameRef.current = null;
    }
  }, [prefersReducedMotion]);

  const syncToScroll = useCallback(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const rect = container.getBoundingClientRect();
    const nextProgress = clamp(-rect.top / dimensionsRef.current.scrollableDistance);
    setProgress((current) => (Math.abs(current - nextProgress) > 0.006 ? nextProgress : current));

    if (!durationRef.current) return;

    const safeDuration = Math.max(durationRef.current - 0.05, 0);
    targetTimeRef.current = nextProgress * safeDuration;

    if (prefersReducedMotion) {
      video.currentTime = targetTimeRef.current;
      smoothTimeRef.current = targetTimeRef.current;
      return;
    }

    if (!videoFrameRef.current) {
      videoFrameRef.current = requestAnimationFrame(animate);
    }
  }, [animate, prefersReducedMotion]);

  const requestScrollSync = useCallback(() => {
    if (scrollFrameRef.current) return;

    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      syncToScroll();
    });
  }, [syncToScroll]);

  const handleViewportChange = useCallback(() => {
    measure();
    requestScrollSync();
  }, [measure, requestScrollSync]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const setDuration = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        durationRef.current = video.duration;
        setVideoReady(true);
        syncToScroll();
      }
    };

    const handleError = () => {
      setVideoError(true);
      setVideoReady(true);
    };

    video.addEventListener("loadedmetadata", setDuration);
    video.addEventListener("loadeddata", setDuration);
    video.addEventListener("durationchange", setDuration);
    video.addEventListener("canplay", setDuration);
    video.addEventListener("error", handleError);
    video.load();
    video.pause();

    return () => {
      video.removeEventListener("loadedmetadata", setDuration);
      video.removeEventListener("loadeddata", setDuration);
      video.removeEventListener("durationchange", setDuration);
      video.removeEventListener("canplay", setDuration);
      video.removeEventListener("error", handleError);
    };
  }, [syncToScroll]);

  useEffect(() => {
    measure();
    syncToScroll();
    window.addEventListener("scroll", requestScrollSync, { passive: true });
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);

    return () => {
      window.removeEventListener("scroll", requestScrollSync);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
      if (videoFrameRef.current) cancelAnimationFrame(videoFrameRef.current);
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [handleViewportChange, measure, requestScrollSync, syncToScroll]);

  return { containerRef, videoRef, progress, videoReady, videoError, prefersReducedMotion };
}
