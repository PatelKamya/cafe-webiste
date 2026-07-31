export default function Logo({ compact = false }) {
  return (
    <span className={`brand-logo ${compact ? "brand-logo--compact" : ""}`} aria-label="Cinnamon Taste Cafe">
      <span className="brand-logo__mark" aria-hidden="true">
        <span className="brand-logo__steam" />
        <span className="brand-logo__name">Cinnamon</span>
        <span className="brand-logo__sub">Taste Cafe</span>
      </span>
      {!compact && (
        <span className="brand-logo__word">
          <strong>Cinnamon Taste Cafe</strong>
          <small>Specialty Coffee | Premium Matcha</small>
        </span>
      )}
    </span>
  );
}
