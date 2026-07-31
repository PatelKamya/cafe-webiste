import { useEffect, useRef } from "react";
import { navigation } from "../data/navigation.js";
import { business } from "../data/business.js";
import Logo from "./Logo.jsx";

export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a, button")?.focus();

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll("a, button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="mobile-menu__panel" ref={panelRef}>
        <div className="mobile-menu__top">
          <Logo />
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close menu">
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={onClose}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button--primary" href={business.orderUrl} onClick={onClose}>
          Order on DRIV-U
        </a>
      </div>
    </div>
  );
}
