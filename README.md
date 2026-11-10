# 🔥 BAADSHAH EDITZ — Premium Free Fire Video Editing Website

A luxury dark gaming website for **BAADSHAH EDITZ** — professional Free Fire video
editing services (beat sync, montage, lobby, shorts & reels). Built with
**Next.js 14 + React 18**, custom CSS design system (no UI framework), fully
responsive, SEO-friendly and animated.

![theme](https://img.shields.io/badge/theme-black%20%2F%20neon%20orange%20%2F%20red%20%2F%20purple-ff7a1a)

## ✨ Features

- 🎬 **Hero** — "TURN YOUR GAMEPLAY INTO MASTERPIECES" over a cinematic Free Fire
  battle-royale background, with glowing CTAs ("Explore Services", "Order Now") and stats.
- 🛠️ **6 service cards** — Beat Sync, Lobby, Montage, Shorts & Reels, Pro, Custom —
  each with image, description, tags, 3D hover-tilt and an Order Now button.
- 📹 **Video portfolio** — category filters (All / Beat Sync / Montage / Lobby / Shorts),
  hover-to-play muted previews, click for a full-screen player modal. The 6 sample
  clips are **generated locally** (`scripts/make_videos.py`, numpy + ffmpeg).
- 💎 **3 pricing plans** — Basic / Premium (featured) / Pro, editable prices in PKR.
- 👤 **About** — brand story, feature bullets, animated counters.
- 📞 **Contact & socials** — TikTok follow button, WhatsApp chat button, Instagram
  button, and a contact form that opens WhatsApp with a pre-filled message.
- ⚡ Extras — animated loading screen, smooth scrolling, scroll-reveal animations,
  glassmorphism, glowing buttons, marquee strip, cursor glow, floating WhatsApp
  button, custom scrollbar, JSON-LD + Open Graph SEO, mobile hamburger menu.

## 🚀 Run it

```bash
npm install
npm run dev      # http://localhost:3000 (dev)
```

## 📦 Website output (static build)

The site is configured with `output: "export"`, so a build produces a
**ready-to-deploy static website** in the `out/` folder — plain HTML, CSS, JS
and all images/videos. No server needed.

```bash
npm run build    # generates ./out  (index.html + _next/ + images/ + videos/)
```

Deploy `out/` to any static host — Vercel, Netlify, GitHub Pages, Cloudflare
Pages, or any web server:

```bash
# example: serve the output locally
python3 -m http.server 3000 --directory out
```

Current output size: ~9 MB total (incl. 6 preview videos).

## ✏️ Easy editing (no code diving needed)

All texts, links, phone numbers and prices live in **`data/site.js`**:

| What | Where |
|---|---|
| WhatsApp number | `site.contact.whatsappNumber` (digits only, with country code, e.g. `923001234567`) |
| Instagram / TikTok / email | `site.contact.instagram` / `.tiktok` / `.email` |
| Prices & plan features | `pricing` array in `data/site.js` |
| Services & descriptions | `services` array |
| Portfolio videos | `portfolio` array → files in `public/videos/` + posters in `public/images/` |
| Hero heading / subtitle | `site.hero` |
| Images | `public/images/` (hero-bg.jpg, svc-*.jpg, about.jpg, og-image.jpg) |

## 📁 Structure

```
app/            # Next.js App Router (layout.jsx, page.jsx, globals.css, icon.svg)
components/     # Reusable React components (Navbar, Hero, Services, Portfolio, ...)
data/site.js    # ⭐ ALL editable content (links, phone, prices, texts)
public/images/  # generated brand imagery + video posters
public/videos/  # generated Free Fire edit preview clips (H.264)
scripts/        # make_videos.py / optimize_images.py (asset generators)
```

## 🎨 Design tokens

Colors: black `#050507`, neon orange `#ff7a1a`, red `#ff2d46`, purple `#a855f7`.
Fonts: Orbitron (display), Bebas Neue (numbers), Manrope (body) — self-hosted via
@fontsource, so the site works fully offline.
