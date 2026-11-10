import { pricing, site } from "@/data/site";
import Reveal from "./Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="section-pad">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Pricing Plans</span>
          <h2>
            CHOOSE YOUR <span className="grad-text">EDIT PACKAGE</span>
          </h2>
          <p>
            Simple, honest pricing — no hidden fees. Every package includes premium quality and
            fast delivery. 💎
          </p>
        </Reveal>

        <div className="pricing-grid">
          {pricing.map((p, i) => (
            <Reveal key={p.id} delay={i * 120} className={p.featured ? "featured-wrap" : ""}>
              <article className={`price-card${p.featured ? " featured" : ""}`}>
                {p.featured && <span className="popular-tag">★ Most Popular</span>}
                <span className="price-name">{p.name}</span>
                <div className="price-value">
                  {p.price} <small>{p.period}</small>
                </div>
                <p className="price-desc">{p.desc}</p>
                <ul className="price-features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="tick">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`}
                  href={site.orderLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.featured && <span className="shine" />}
                  {p.cta} 🛒
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
