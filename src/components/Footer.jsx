import Logo from "./Logo.jsx";
import { navigation } from "../data/navigation.js";
import { productsOrServices } from "../data/productsOrServices.js";
import { business } from "../data/business.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <Logo />
          <p>{business.description}</p>
        </div>
        <nav aria-label="Footer navigation">
          <strong>Explore</strong>
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <nav aria-label="Menu links">
          <strong>Menu</strong>
          {productsOrServices.map((item) => (
            <a key={item.title} href="#menu">
              {item.title}
            </a>
          ))}
        </nav>
        <div>
          <strong>Contact</strong>
          <a href={`tel:${business.contact.phone.replace(/\s/g, "")}`}>{business.contact.displayPhone}</a>
          <a href={business.orderUrl}>DRIV-U app</a>
          <span>{business.contact.address}</span>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>(c) 2026 Cinnamon Taste Cafe</span>
        <a href="#top">Privacy policy</a>
        <a href="#top">Terms</a>
      </div>
    </footer>
  );
}
