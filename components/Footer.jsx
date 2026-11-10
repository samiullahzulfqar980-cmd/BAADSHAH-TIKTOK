import { navLinks, site } from "@/data/site";

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
    <path d="M16.6 3c.4 2.2 1.8 3.6 4.4 3.8v3c-1.7 0-3.2-.5-4.4-1.4v6.4c0 3.9-2.7 6.2-6 6.2-3.2 0-5.6-2.3-5.6-5.4 0-3 2.3-5.4 5.5-5.4.4 0 .8 0 1.1.1v3.1c-.3-.1-.7-.2-1.1-.2-1.3 0-2.4 1-2.4 2.4 0 1.3 1 2.3 2.4 2.3 1.6 0 2.7-1.1 2.7-3.1V3h3.4z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.6 12.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="#e1306c" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="#e1306c" strokeWidth="2" />
    <circle cx="17.2" cy="6.8" r="1.3" fill="#e1306c" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#home" className="logo">
              <span className="logo-mark">🔥</span>
              <span>
                BAADSHAH <b>EDITZ</b>
              </span>
            </a>
            <p>
              Premium Free Fire video editing — beat sync, montages, lobby intros, shorts & reels.
              Your gameplay, turned into masterpieces. 🎬🔥
            </p>
            <div className="footer-social">
              <a href={site.contact.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <TikTokIcon />
              </a>
              <a href={site.whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
              <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Beat Sync Editing</a></li>
              <li><a href="#services">Lobby Editing</a></li>
              <li><a href="#services">Montage Editing</a></li>
              <li><a href="#services">Shorts & Reels</a></li>
              <li><a href="#pricing">Pricing Plans</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} <b>{site.brand}</b>. All rights reserved.
          </span>
          <span>
            Crafted with 🔥 by <b>BAADSHAH EDITZ</b>
          </span>
        </div>
      </div>
    </footer>
  );
}
