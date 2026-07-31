import SectionHeading from "./SectionHeading.jsx";
import { business } from "../data/business.js";

export default function ContactSection() {
  return (
    <section className="section contact" id="contact">
      <div className="section__inner contact__grid">
        <SectionHeading
          eyebrow="Contact"
          title="Cinnamon Taste Cafe"
          text="Specialty Coffee | Premium Matcha. Daily fresh-baked pastries."
        />
        <div className="contact-card">
          <a href={`tel:${business.contact.phone.replace(/\s/g, "")}`}>{business.contact.displayPhone}</a>
          <a href={business.orderUrl}>Order on DRIV-U app</a>
          <span>{business.contact.hours}</span>
          <span>{business.contact.address}</span>
        </div>
      </div>
    </section>
  );
}
