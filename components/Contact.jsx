"use client";

import { useState } from "react";
import { services, site } from "@/data/site";
import Reveal from "./Reveal";

const TikTokIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M16.6 3c.4 2.2 1.8 3.6 4.4 3.8v3c-1.7 0-3.2-.5-4.4-1.4v6.4c0 3.9-2.7 6.2-6 6.2-3.2 0-5.6-2.3-5.6-5.4 0-3 2.3-5.4 5.5-5.4.4 0 .8 0 1.1.1v3.1c-.3-.1-.7-.2-1.1-.2-1.3 0-2.4 1-2.4 2.4 0 1.3 1 2.3 2.4 2.3 1.6 0 2.7-1.1 2.7-3.1V3h3.4z"
      fill="#fff"
    />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#25d366" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#ig)" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="url(#ig)" strokeWidth="2" />
    <circle cx="17.2" cy="6.8" r="1.3" fill="url(#ig)" />
    <defs>
      <linearGradient id="ig" x1="3" y1="21" x2="21" y2="3">
        <stop stopColor="#ff7a1a" />
        <stop offset=".5" stopColor="#ff2d46" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", service: services[0].title, message: "" });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const msg =
      `Hi BAADSHAH EDITZ! 🎮\n\n` +
      `Name: ${form.name}\n` +
      `WhatsApp: ${form.phone}\n` +
      `Service: ${form.service}\n` +
      `Message: ${form.message}`;
    window.open(site.whatsappLink(msg), "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="contact" className="section-pad">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Contact & Socials</span>
          <h2>
            LET&apos;S MAKE YOUR NEXT <span className="grad-text">VIRAL EDIT</span>
          </h2>
          <p>Message us on any platform or send the form — we reply fast, usually within minutes. ⚡</p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="glass form-card">
            <h3>Send Us a Message</h3>
            <p>Fill the form — it opens WhatsApp with your order details ready to send.</p>
            <form onSubmit={submit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="c-name">Your Name</label>
                  <input id="c-name" required placeholder="e.g. Ahmed Ali" value={form.name} onChange={update("name")} />
                </div>
                <div className="field">
                  <label htmlFor="c-phone">WhatsApp Number</label>
                  <input id="c-phone" required placeholder="e.g. 03XX-XXXXXXX" value={form.phone} onChange={update("phone")} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-service">Service</label>
                <select id="c-service" value={form.service} onChange={update("service")}>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  {["Basic Editing", "Premium Editing", "Pro Editing"].map((p) => (
                    <option key={p} value={p}>
                      Package: {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="c-msg">Message / Clip Details</label>
                <textarea
                  id="c-msg"
                  placeholder="Tell us about your gameplay clip, link, deadline, style you like..."
                  value={form.message}
                  onChange={update("message")}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                <span className="shine" />
                Send via WhatsApp 💬
              </button>
              {sent && (
                <div className="form-success" role="status">
                  ✅ WhatsApp opened with your message — just hit send!
                </div>
              )}
            </form>
          </Reveal>

          <Reveal delay={140} className="glass social-card">
            <h3>Follow & Contact</h3>
            <p>Daily Free Fire edits, behind-the-scenes and exclusive drops.</p>

            <a className="social-btn tiktok" href={site.contact.tiktok} target="_blank" rel="noopener noreferrer">
              <span className="ic">
                <TikTokIcon />
              </span>
              <span>
                <b>TikTok — Follow Us</b>
                <span>@baadshah_editz01</span>
              </span>
            </a>

            <a
              className="social-btn whatsapp"
              href={site.whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ic">
                <WhatsAppIcon />
              </span>
              <span>
                <b>WhatsApp — Chat Now</b>
                <span>+{site.contact.whatsappNumber.replace(/(\d{2})(\d{3})(\d{7})/, "$1 $2 $3")}</span>
              </span>
            </a>

            <a className="social-btn instagram" href={site.contact.instagram} target="_blank" rel="noopener noreferrer">
              <span className="ic">
                <InstagramIcon />
              </span>
              <span>
                <b>Instagram — Follow</b>
                <span>{site.contact.instagram.replace("https://www.instagram.com/", "@")}</span>
              </span>
            </a>

            <div className="contact-info">
              <div>✉️ <span><b>Email:</b> {site.contact.email}</span></div>
              <div>📍 <span><b>Based in:</b> {site.contact.location} — serving gamers worldwide</span></div>
              <div>⏱️ <span><b>Response time:</b> usually within minutes</span></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
