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

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", service: services[0].title, message: "" });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const msg =
      `Hi BAADSHAH EDITZ! 🎮\n\n` +
      `Name: ${form.name}\n` +
      `Contact: ${form.phone}\n` +
      `Service: ${form.service}\n` +
      `Message: ${form.message}`;
    // copy to clipboard so it can be pasted into a TikTok DM
    if (navigator.clipboard) navigator.clipboard.writeText(msg).catch(() => {});
    window.open(site.contact.tiktok, "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 7000);
  };

  return (
    <section id="contact" className="section-pad">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Contact & Socials</span>
          <h2>
            LET&apos;S MAKE YOUR NEXT <span className="grad-text">VIRAL EDIT</span>
          </h2>
          <p>Reach us on TikTok — send the form and paste your details in a DM. We reply fast, usually within minutes. ⚡</p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="glass form-card">
            <h3>Send Us a Message</h3>
            <p>Fill the form — it opens our TikTok profile and copies your order details, just paste them in the DM.</p>
            <form onSubmit={submit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="c-name">Your Name</label>
                  <input id="c-name" required placeholder="e.g. Ahmed Ali" value={form.name} onChange={update("name")} />
                </div>
                <div className="field">
                  <label htmlFor="c-phone">Phone / IGN</label>
                  <input id="c-phone" required placeholder="e.g. Ahmed_FF" value={form.phone} onChange={update("phone")} />
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
                Continue on TikTok 🎵
              </button>
              {sent && (
                <div className="form-success" role="status">
                  ✅ TikTok opened and your details were copied — just paste them in the DM!
                </div>
              )}
            </form>
          </Reveal>

          <Reveal delay={140} className="glass social-card">
            <h3>Follow Us</h3>
            <p>Daily Free Fire edits, behind-the-scenes and exclusive drops — only on TikTok.</p>

            <a className="social-btn tiktok" href={site.contact.tiktok} target="_blank" rel="noopener noreferrer">
              <span className="ic">
                <TikTokIcon />
              </span>
              <span>
                <b>TikTok — Follow Us</b>
                <span>@baadshah_editz01</span>
              </span>
            </a>

            <div className="contact-info">
              <div>✉️ <span><b>Email:</b> {site.contact.email}</span></div>
              <div>📍 <span><b>Based in:</b> {site.contact.location} — serving gamers worldwide</span></div>
              <div>⏱️ <span><b>Response time:</b> usually within minutes on TikTok</span></div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
