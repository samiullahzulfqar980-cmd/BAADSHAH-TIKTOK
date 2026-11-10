"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export default function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let start;
    const DURATION = 1700;
    const raf = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / DURATION);
      setPct(Math.round(p * 100));
      if (p < 1) requestAnimationFrame(raf);
      else {
        setDone(true);
        document.body.style.overflow = "";
      }
    };
    document.body.style.overflow = "hidden";
    requestAnimationFrame(raf);
    const t = setTimeout(() => setDone(true), DURATION + 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`loader${done ? " done" : ""}`} aria-hidden="true">
      <div className="loader-logo">{site.brand}</div>
      <div className="loader-bar">
        <i style={{ width: `${pct}%` }} />
      </div>
      <div className="loader-pct">
        {pct}
        <span>%</span>
      </div>
    </div>
  );
}
