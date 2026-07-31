import { useCallback, useEffect, useState } from "react";
import { navigation } from "../data/navigation.js";
import { business } from "../data/business.js";
import Logo from "./Logo.jsx";
import MobileMenu from "./MobileMenu.jsx";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      const hero = document.getElementById("top");
      const headerOffset = 96;
      const solidHeaderAt = hero ? hero.offsetHeight - window.innerHeight + headerOffset : 64;

      setScrolled(window.scrollY > solidHeaderAt);
      frameId = 0;
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : "site-header--over-hero"}`}>
      <a className="site-header__logo" href="#top" aria-label="Cinnamon Taste Cafe home">
        <Logo />
      </a>
      <nav className="site-header__nav" aria-label="Primary">
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="site-header__cta" href={business.orderUrl}>
        Order on DRIV-U
      </a>
      <button
        className="icon-button site-header__menu"
        type="button"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
      >
        <span aria-hidden="true">Menu</span>
      </button>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
