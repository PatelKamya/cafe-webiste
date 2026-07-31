export default function ProductServiceCard({ item }) {
  return (
    <article className="product-card">
      <div className={`product-card__media product-card__media--${item.category.toLowerCase().replace(/\s/g, "-")}`}>
        {item.image ? <img src={item.image} alt={item.imageAlt || item.title} loading="lazy" /> : null}
        <span>{item.tag}</span>
      </div>
      <div className="product-card__body">
        <p className="eyebrow">{item.category}</p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <strong>{item.price}</strong>
      </div>
    </article>
  );
}
