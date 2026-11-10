import { site } from "@/data/site";

export default function Marquee() {
  const items = [...site.marquee, ...site.marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((m, i) => (
          <span key={i}>{m}</span>
        ))}
      </div>
    </div>
  );
}
