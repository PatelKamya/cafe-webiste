import SectionHeading from "./SectionHeading.jsx";
import { business } from "../data/business.js";

export default function ContactSection() {
  const phoneHref = `tel:${business.contact.phone.replace(/\s/g, "")}`;

  return (
    <section className="section contact" id="contact">
      <div className="section__inner contact__grid">
        <SectionHeading
          eyebrow="Contact"
          title="Cinnamon Taste Cafe"
          text="Specialty coffee, premium matcha, and fresh pastries ready for quick pickup, delivery, or a direct cafe request."
        />
        <div className="contact-card">
          <div className="contact-card__media">
            <img src="/images/menu/berry-matcha.png" alt="Iced berry matcha from Cinnamon Taste Cafe" />
          </div>

          <div className="contact-card__content">
            <span className="contact-card__label">Call direct</span>
            <a className="contact-card__phone" href={phoneHref}>
              {business.contact.displayPhone}
            </a>

            <div className="contact-card__actions" aria-label="Contact actions">
              <a className="button button--primary" href={business.orderUrl}>
                Order on DRIV-U
              </a>
              <a className="button button--ghost" href={phoneHref}>
                Call cafe
              </a>
            </div>

            <dl className="contact-card__details">
              <div>
                <dt>Fresh daily</dt>
                <dd>{business.contact.hours}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{business.contact.address}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
