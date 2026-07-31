import SectionHeading from "./SectionHeading.jsx";
import ProductServiceCard from "./ProductServiceCard.jsx";
import { productsOrServices } from "../data/productsOrServices.js";
import { business } from "../data/business.js";
import { useIntersectionReveal } from "../hooks/useIntersectionReveal.js";

export default function AboutSection() {
  const reveal = useIntersectionReveal();

  return (
    <section className={`section about reveal ${reveal.visible ? "is-visible" : ""}`} id="story" ref={reveal.ref}>
      <div className="section__inner about__grid">
        <div>
          <SectionHeading
            eyebrow={business.tagline}
            title="Coffee, matcha, and pastry craft under one warm mark."
            text={business.description}
          />
          <div className="about__stats" aria-label="Cafe highlights">
            <span>
              <strong>3</strong>
              Core specialties
            </span>
            <span>
              <strong>Daily</strong>
              Fresh-baked pastries
            </span>
            <span>
              <strong>DRIV-U</strong>
              App ordering
            </span>
          </div>
        </div>
        <div className="menu-grid" aria-label="Featured menu">
          {productsOrServices.map((item) => (
            <ProductServiceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
