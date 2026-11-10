import { site } from "@/data/site";

export default function TikTokFloat() {
  return (
    <a
      className="tt-float"
      href={site.contact.tiktok}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow BAADSHAH EDITZ on TikTok"
    >
      <span className="tip">Follow us on TikTok 🎵</span>
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
        <path d="M16.6 3c.4 2.2 1.8 3.6 4.4 3.8v3c-1.7 0-3.2-.5-4.4-1.4v6.4c0 3.9-2.7 6.2-6 6.2-3.2 0-5.6-2.3-5.6-5.4 0-3 2.3-5.4 5.5-5.4.4 0 .8 0 1.1.1v3.1c-.3-.1-.7-.2-1.1-.2-1.3 0-2.4 1-2.4 2.4 0 1.3 1 2.3 2.4 2.3 1.6 0 2.7-1.1 2.7-3.1V3h3.4z" />
      </svg>
    </a>
  );
}
