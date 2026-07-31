import SectionHeading from "./SectionHeading.jsx";
import { advantages } from "../data/advantages.js";
import { useIntersectionReveal } from "../hooks/useIntersectionReveal.js";

const icons = {
  brew: "Cup",
  bake: "Bake",
  order: "Go",
};

export default function FeaturesSection() {
  const reveal = useIntersectionReveal();

  return (
    <section className={`section features reveal ${reveal.visible ? "is-visible" : ""}`} ref={reveal.ref}>
      <div className="section__inner">
        <SectionHeading
          eyebrow="Why guests come back"
          title="A focused cafe menu with practical ordering."
          text="Cinnamon Taste Cafe keeps the offer tight: drinks with character, pastries with freshness, and a simple route to order."
        />
        <div className="feature-grid">
          {advantages.map((advantage) => (
            <article className="feature-card" key={advantage.title}>
              <span className="feature-card__icon" aria-hidden="true">
                {icons[advantage.icon]}
              </span>
              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
