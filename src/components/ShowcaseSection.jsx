import SectionHeading from "./SectionHeading.jsx";
import { gallery } from "../data/gallery.js";
import { useIntersectionReveal } from "../hooks/useIntersectionReveal.js";

export default function ShowcaseSection() {
  const reveal = useIntersectionReveal();

  return (
    <section className={`section showcase reveal ${reveal.visible ? "is-visible" : ""}`} id="gallery" ref={reveal.ref}>
      <div className="section__inner">
        <SectionHeading
          eyebrow="Cafe mood"
          title="Cinnamon brown, matcha green, pastry gold."
          text="The visual system follows the logo and the drink video: deep charcoal, cinnamon warmth, cream type, and small hits of matcha."
        />
        <div className="showcase-grid">
          {gallery.map((item, index) => (
            <article className={`showcase-tile showcase-tile--${item.tone || "video"} span-${index}`} key={item.title}>
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={item.title}
                />
              ) : item.image ? (
                <img src={item.image} alt={item.imageAlt || item.title} loading="lazy" />
              ) : (
                <span aria-hidden="true" />
              )}
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
