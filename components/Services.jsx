"use client";

import { services, site } from "@/data/site";
import Reveal from "./Reveal";

function ServiceCard({ s, index }) {
  const handleMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${px * 7}deg) rotateX(${ -py * 7}deg) translateY(-6px)`;
  };
  const handleLeave = (e) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <Reveal delay={(index % 3) * 110}>
      <article className="svc-card" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <div className="svc-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={s.img} alt={s.title} loading="lazy" />
          <span className="svc-num">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="svc-body">
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <ul className="svc-tags">
            {s.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <a
            className="btn btn-primary btn-sm"
            href={site.orderLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="shine" />
            Order Now
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Our Editing Services</span>
          <h2>
            PREMIUM <span className="grad-text">FREE FIRE EDITS</span>
          </h2>
          <p>
            From beat-synced kills to cinematic montages — pick a service and we will turn your
            raw gameplay into scroll-stopping content.
          </p>
        </Reveal>
        <div className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
