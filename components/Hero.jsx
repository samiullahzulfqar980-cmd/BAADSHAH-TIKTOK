import { site } from "@/data/site";
import Reveal from "./Reveal";

export default function Hero() {
  const { hero } = site;
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-bg.jpg" alt="Free Fire battle royale gaming artwork — BAADSHAH EDITZ" fetchpriority="high" />
      </div>
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <div className="container">
        <div className="hero-inner">
          <span className="hero-badge">
            <span className="dot" /> {hero.badge}
          </span>
          <h1>
            <span className="line">{hero.titleTop}</span>
            <span className="line grad-text">{hero.titleAccent}</span>
          </h1>
          <p className="hero-sub">{hero.subtitle}</p>
          <p className="hero-desc">{hero.description}</p>
          <div className="hero-actions">
            <a href="#services" className="btn btn-primary">
              <span className="shine" />
              {hero.primaryCta} →
            </a>
            <a
              href={site.orderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              🎵 {hero.secondaryCta}
            </a>
          </div>

          <div className="hero-stats">
            {site.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="stat">
                <b>
                  {s.value}
                  {s.suffix}
                </b>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="wheel" />
      </div>
    </section>
  );
}
