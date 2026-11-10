"use client";

import { useEffect, useRef, useState } from "react";
import { portfolio, portfolioCategories, site } from "@/data/site";
import Reveal from "./Reveal";

function VideoCard({ item, index, onOpen }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const hoverPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.play().catch(() => {});
    setPlaying(true);
  };
  const hoverStop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <Reveal delay={(index % 3) * 100}>
      <article
        className={`vid-card${playing ? " playing" : ""}`}
        onMouseEnter={hoverPlay}
        onMouseLeave={hoverStop}
        onClick={() => onOpen(item)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen(item)}
        aria-label={`Play preview: ${item.title}`}
      >
        <div className="vid-frame">
          <video
            ref={videoRef}
            src={item.video}
            poster={item.poster}
            preload="none"
            playsInline
            muted
            aria-label={item.title}
          />
          <span className="vid-cat">{item.category}</span>
          <span className="vid-play" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#160a02">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="vid-dur">{item.duration}</span>
        </div>
        <div className="vid-meta">
          <div>
            <h3>{item.title}</h3>
            <small>Free Fire edit sample</small>
          </div>
          <span className="views">▶ {item.views}</span>
        </div>
      </article>
    </Reveal>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const modalRef = useRef(null);

  const items = filter === "All" ? portfolio : portfolio.filter((p) => p.category === filter);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [active]);

  return (
    <section id="portfolio" className="section-pad">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Video Portfolio</span>
          <h2>
            WATCH OUR <span className="grad-text">LATEST EDITS</span>
          </h2>
          <p>
            Real Free Fire editing samples from BAADSHAH EDITZ. Hover a card to preview — click to
            watch it full screen.
          </p>
        </Reveal>

        <Reveal className="filters" delay={80}>
          {portfolioCategories.map((c) => (
            <button
              key={c}
              className={`filter-pill${filter === c ? " active" : ""}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="portfolio-grid">
          {items.map((item, i) => (
            <VideoCard key={item.id} item={item} index={i} onOpen={setActive} />
          ))}
        </div>

        <Reveal className="center-cta" delay={120}>
          <a
            className="btn btn-ghost"
            href={site.contact.tiktok}
            target="_blank"
            rel="noopener noreferrer"
          >
            📱 See more on TikTok →
          </a>
        </Reveal>
      </div>

      {active && (
        <div
          className="vid-modal"
          ref={modalRef}
          onClick={(e) => e.target === e.currentTarget && setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div className="vid-modal-box">
            <video src={active.video} poster={active.poster} controls autoPlay playsInline />
            <div className="vid-modal-head">
              <div>
                <h3>{active.title}</h3>
                <small>
                  {active.category} edit • {active.views}
                </small>
              </div>
              <button className="modal-close" onClick={() => setActive(null)} aria-label="Close video">
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
