import { business } from "../data/business.js";
import { videoStages } from "../data/videoStages.js";
import { useScrollVideo } from "../hooks/useScrollVideo.js";
import VideoStage from "./VideoStage.jsx";

export default function ScrollVideoHero() {
  const { containerRef, videoRef, progress, videoReady, videoError, prefersReducedMotion } = useScrollVideo();
  const endingOpacity = Math.max((progress - 0.9) / 0.1, 0);

  return (
    <section className="scroll-video" id="top" ref={containerRef} aria-label="Cinnamon Taste Cafe cinematic story">
      <div className="scroll-video__sticky">
        <div className="scroll-video__media">
          {!videoError && (
            <video
              ref={videoRef}
              className="scroll-video__video"
              muted
              playsInline
              preload="auto"
              poster={business.video.poster}
              aria-label={business.video.ariaLabel}
              style={{
                "--video-position-desktop": business.video.desktopObjectPosition,
                "--video-position-mobile": business.video.mobileObjectPosition,
              }}
            >
              {business.video.webm && <source src={business.video.webm} type="video/webm" />}
              <source src={business.video.mp4} type="video/mp4" />
            </video>
          )}
          {videoError && (
            <div className="scroll-video__fallback" role="img" aria-label="Cinnamon Taste Cafe fallback visual">
              <span>Cinnamon Taste Cafe</span>
            </div>
          )}
        </div>
        <div className="scroll-video__wash" />
        <div className="scroll-video__bottom" style={{ opacity: 0.45 + endingOpacity * 0.45 }} />
        {!videoReady && (
          <div className="video-loader" role="status">
            <span />
            Preparing the pour
          </div>
        )}
        <div className={`hero-copy ${progress > 0.18 ? "hero-copy--quiet" : ""}`}>
          <p className="eyebrow">{business.hero.label}</p>
          <h1>{business.hero.heading}</h1>
          <p>{business.hero.description}</p>
          <div className="hero-copy__actions">
            <a className="button button--primary" href={business.orderUrl}>
              {business.hero.primaryCta}
            </a>
            <a className="button button--ghost" href="#menu">
              {business.hero.secondaryCta}
            </a>
          </div>
        </div>
        {!prefersReducedMotion &&
          videoStages.map((stage) => <VideoStage key={stage.id} stage={stage} progress={progress} />)}
        <div className="scroll-indicator" aria-hidden="true">
          <span />
          {business.hero.scrollText}
        </div>
      </div>
    </section>
  );
}
