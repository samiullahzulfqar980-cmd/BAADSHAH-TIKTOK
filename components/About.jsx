"use client";

import { useEffect, useRef, useState } from "react";
import { about, site } from "@/data/site";
import Reveal from "./Reveal";

const icons = ["🎵", "🎬", "✨", "🏆"];

function Counter({ target, suffix }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const t0 = performance.now();
          const DUR = 1600;
          const tick = (ts) => {
            const p = Math.min(1, (ts - t0) / DUR);
            setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <b ref={ref}>
      {val}
      {suffix}
    </b>
  );
}

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about.jpg"
              alt="BAADSHAH EDITZ editing studio — professional video editing setup with neon lighting"
              loading="lazy"
            />
            <div className="about-float">
              <Counter target={500} suffix="+" />
              <span>Edits Crafted</span>
            </div>
          </Reveal>

          <div className="about-copy">
            <Reveal>
              <span className="eyebrow">{about.eyebrow}</span>
              <h2>
                WE CRAFT <span className="grad-text">EDITS</span> THAT HIT DIFFERENT
              </h2>
            </Reveal>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={100 + i * 90}>
                <p>{p}</p>
              </Reveal>
            ))}
            <div className="about-points">
              {about.points.map((pt, i) => (
                <Reveal key={pt.title} delay={i * 90} className="about-point">
                  <span className="ic">{icons[i % icons.length]}</span>
                  <b>{pt.title}</b>
                  <span>{pt.desc}</span>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <div style={{ marginTop: 28 }}>
                <a
                  className="btn btn-primary"
                  href={site.whatsappLink("Hi BAADSHAH EDITZ! Tell me more about your editing services. 🎮")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="shine" />
                  Work With Us 🚀
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
