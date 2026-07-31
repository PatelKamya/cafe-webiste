import { getRangeProgress, clamp } from "../hooks/useScrollVideo.js";

export default function VideoStage({ stage, progress }) {
  const enter = getRangeProgress(progress, stage.start, stage.peakStart);
  const leave = 1 - getRangeProgress(progress, stage.peakEnd, stage.end);
  const visibility = clamp(Math.min(enter, leave));
  const y = (1 - visibility) * 18;

  return (
    <article
      className={`video-stage video-stage--${stage.position}`}
      style={{
        opacity: visibility,
        transform: `translate3d(0, ${y}px, 0) scale(${0.985 + visibility * 0.015})`,
        pointerEvents: visibility > 0.7 ? "auto" : "none",
      }}
      aria-hidden={visibility < 0.12}
    >
      {stage.label && <p className="eyebrow">{stage.label}</p>}
      <h2>{stage.heading}</h2>
      <p>{stage.description}</p>
      {stage.button && (
        <a className="button button--primary" href="#order">
          {stage.button}
        </a>
      )}
    </article>
  );
}
