import SectionHeading from "./SectionHeading.jsx";
import { testimonials } from "../data/testimonials.js";
import { useIntersectionReveal } from "../hooks/useIntersectionReveal.js";

export default function TestimonialsSection() {
  const reveal = useIntersectionReveal();

  return (
    <section className={`section testimonials reveal ${reveal.visible ? "is-visible" : ""}`} id="reviews" ref={reveal.ref}>
      <div className="section__inner">
        <SectionHeading
          eyebrow="Guest notes"
          title="Small rituals, remembered."
          text="A few words from regular-style cafe moments."
        />
        <div className="testimonial-row" tabIndex="0" aria-label="Customer reviews">
          {testimonials.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <div>
                <strong>{testimonial.rating}</strong>
                <span aria-label={`${testimonial.rating} out of 5 stars`}>5 stars</span>
              </div>
              <p>"{testimonial.quote}"</p>
              <footer>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
