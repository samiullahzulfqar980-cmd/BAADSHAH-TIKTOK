// ============================================================================
//  BAADSHAH EDITZ — EDITABLE SITE CONTENT
//  Change any text, link, phone number or price here and the whole website
//  updates automatically. No need to touch the components.
// ============================================================================

export const site = {
  brand: "BAADSHAH EDITZ",
  brandShort: "BAADSHAH",
  hero: {
    badge: "#1 FREE FIRE EDITING BRAND",
    titleTop: "TURN YOUR GAMEPLAY INTO",
    titleAccent: "MASTERPIECES",
    subtitle: "Professional Free Fire Video Editing Services.",
    description:
      "Beat sync edits, cinematic montages, lobby intros, shorts & reels — crafted frame by frame to make your clips go viral.",
    primaryCta: "Explore Services",
    secondaryCta: "Order Now",
  },

  // 👇 EDIT YOUR CONTACT DETAILS HERE -------------------------------------
  contact: {
    whatsappNumber: "923001234567", // WhatsApp number WITH country code, digits only (e.g. 923001234567)
    instagram: "https://www.instagram.com/baadshah_editz01", // your Instagram profile URL
    tiktok: "https://www.tiktok.com/@baadshah_editz01", // your TikTok profile URL
    email: "baadshaheditz@gmail.com",
    location: "Pakistan",
  },
  // ------------------------------------------------------------------------

  whatsappLink: (message) =>
    `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
      message || "Hi BAADSHAH EDITZ! I want to order a Free Fire video edit. 🎮"
    )}`,

  stats: [
    { value: 500, suffix: "+", label: "Edits Delivered" },
    { value: 50, suffix: "M+", label: "Views Generated" },
    { value: 300, suffix: "+", label: "Happy Clients" },
    { value: 24, suffix: "h", label: "Fast Delivery" },
  ],

  marquee: [
    "BEAT SYNC", "MONTAGE", "LOBBY EDITS", "SHORTS & REELS", "CINEMATIC",
    "4K QUALITY", "FAST DELIVERY", "VIRAL EDITS",
  ],
};

// ---------------------------------------------------------------- SERVICES
export const services = [
  {
    id: "beat-sync",
    title: "Free Fire Beat Sync Editing",
    desc: "Your kills land exactly on the beat. Perfectly synced cuts, zooms and sound effects that hit hard with the music.",
    img: "/images/svc-beat-sync.jpg",
    tags: ["Beat Sync", "Sound FX", "Viral"],
  },
  {
    id: "lobby",
    title: "Free Fire Lobby Editing",
    desc: "Stylish lobby intros and character showcases with smooth camera moves, glow effects and premium HUD vibes.",
    img: "/images/svc-lobby.jpg",
    tags: ["Intro", "Glow FX", "HD"],
  },
  {
    id: "montage",
    title: "Free Fire Montage Editing",
    desc: "High-energy montages packed with fast cuts, glitch transitions, screen shakes and explosive finishing moves.",
    img: "/images/svc-montage.jpg",
    tags: ["Fast Cuts", "Transitions", "Epic"],
  },
  {
    id: "shorts",
    title: "Free Fire Shorts & Reels Editing",
    desc: "Vertical 9:16 edits optimized for TikTok, Instagram Reels and YouTube Shorts — hook viewers in the first second.",
    img: "/images/svc-shorts.jpg",
    tags: ["9:16", "Reels", "Trending"],
  },
  {
    id: "pro",
    title: "Professional Gaming Video Editing",
    desc: "Full professional treatment: color grading, cinematic LUTs, motion graphics, subtitles and clean sound design.",
    img: "/images/svc-pro.jpg",
    tags: ["Color Grading", "LUTs", "4K"],
  },
  {
    id: "custom",
    title: "Custom Gaming Video Editing",
    desc: "Tell us your idea — we build a 100% custom edit around your gameplay, your style and your brand.",
    img: "/images/svc-custom.jpg",
    tags: ["Custom", "Your Idea", "Premium"],
  },
];

// --------------------------------------------------------------- PORTFOLIO
export const portfolioCategories = ["All", "Beat Sync", "Montage", "Lobby", "Shorts"];

export const portfolio = [
  {
    id: "beat-sync",
    title: "Beat Sync Showcase",
    category: "Beat Sync",
    video: "/videos/beat-sync.mp4",
    poster: "/images/poster-beat-sync.jpg",
    duration: "0:08",
    views: "1.2M views",
  },
  {
    id: "montage",
    title: "Clutch Montage Edit",
    category: "Montage",
    video: "/videos/montage.mp4",
    poster: "/images/poster-montage.jpg",
    duration: "0:08",
    views: "890K views",
  },
  {
    id: "lobby",
    title: "Lobby Intro Edit",
    category: "Lobby",
    video: "/videos/lobby.mp4",
    poster: "/images/poster-lobby.jpg",
    duration: "0:08",
    views: "640K views",
  },
  {
    id: "shorts",
    title: "Shorts / Reels Cut",
    category: "Shorts",
    video: "/videos/shorts.mp4",
    poster: "/images/poster-shorts.jpg",
    duration: "0:08",
    views: "2.1M views",
  },
  {
    id: "pro",
    title: "Pro Cinematic Edit",
    category: "Montage",
    video: "/videos/pro-edit.mp4",
    poster: "/images/poster-pro.jpg",
    duration: "0:08",
    views: "475K views",
  },
  {
    id: "custom",
    title: "Custom Brand Edit",
    category: "Beat Sync",
    video: "/videos/custom-edit.mp4",
    poster: "/images/poster-custom.jpg",
    duration: "0:08",
    views: "980K views",
  },
];

// ----------------------------------------------------------------- PRICING
// 👇 EDIT PRICES HERE (in PKR). Change the price string and features freely.
export const pricing = [
  {
    id: "basic",
    name: "Basic Editing",
    price: "Rs. 500",
    period: "/ edit",
    desc: "Perfect for quick shorts and casual clips.",
    features: [
      "1 short / reel edit (up to 30s)",
      "Simple beat sync cuts",
      "Basic sound effects",
      "720p HD export",
      "Delivery within 24 hours",
    ],
    featured: false,
    cta: "Order Basic",
  },
  {
    id: "premium",
    name: "Premium Editing",
    price: "Rs. 1,500",
    period: "/ edit",
    desc: "Our most popular package for serious gamers.",
    features: [
      "Full beat sync / montage edit",
      "Cinematic transitions & zooms",
      "Custom sound effects & bass boost",
      "Color grading + glow effects",
      "1080p Full HD export",
      "Delivery within 12 hours",
      "1 free revision",
    ],
    featured: true,
    cta: "Order Premium",
  },
  {
    id: "pro",
    name: "Pro Editing",
    price: "Rs. 3,000",
    period: "/ edit",
    desc: "Studio-level production for creators & clans.",
    features: [
      "Cinematic 4K edit with LUTs",
      "Advanced motion graphics & VFX",
      "Lobby intro + montage combo",
      "Custom intro / outro branding",
      "Professional sound design",
      "Priority delivery within 6 hours",
      "Unlimited revisions",
    ],
    featured: false,
    cta: "Order Pro",
  },
];

// ------------------------------------------------------------------- ABOUT
export const about = {
  eyebrow: "ABOUT US",
  title: "WE CRAFT EDITS THAT HIT DIFFERENT",
  paragraphs: [
    "BAADSHAH EDITZ is a creative gaming video editing brand built for gamers who want their gameplay to look legendary. We specialize in high-quality Free Fire edits — from razor-sharp beat synchronization to cinematic montages that make every clutch feel like a movie scene.",
    "Every frame is crafted with precision: smooth transitions, glow and particle effects, color-graded visuals and sound design that matches the energy of your gameplay. Whether it's a viral short, a lobby intro or a full cinematic montage — we turn raw clips into masterpieces.",
  ],
  points: [
    { title: "Frame-Perfect Beat Sync", desc: "Every cut lands on the beat." },
    { title: "Cinematic Transitions", desc: "Glitch, zoom, shake & 3D moves." },
    { title: "Premium Effects", desc: "Glow, particles, LUTs & VFX." },
    { title: "Professional Presentation", desc: "Clean, viral-ready exports in 4K." },
  ],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
