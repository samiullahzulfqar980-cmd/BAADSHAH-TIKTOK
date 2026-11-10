import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/800.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/bebas-neue/400.css";
import "./globals.css";

const SITE_URL = "https://baadshaheditz.vercel.app";
const TITLE = "BAADSHAH EDITZ — Free Fire Video Editing Services";
const DESCRIPTION =
  "BAADSHAH EDITZ turns your Free Fire gameplay into masterpieces. Professional beat sync, montage, lobby, shorts & reels video editing. Fast delivery, 4K quality, viral-ready edits.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | BAADSHAH EDITZ",
  },
  description: DESCRIPTION,
  keywords: [
    "BAADSHAH EDITZ",
    "Free Fire editing",
    "Free Fire video editor",
    "beat sync edit",
    "Free Fire montage",
    "lobby edit",
    "Free Fire shorts",
    "gaming video editing Pakistan",
    "TikTok Free Fire edits",
    "Reels editing",
  ],
  authors: [{ name: "BAADSHAH EDITZ", url: SITE_URL }],
  creator: "BAADSHAH EDITZ",
  publisher: "BAADSHAH EDITZ",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "BAADSHAH EDITZ",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BAADSHAH EDITZ — Free Fire video editing brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/og-image.jpg"],
  },
  alternates: { canonical: SITE_URL },
  category: "Gaming",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050507" },
    { color: "#ff7a1a" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BAADSHAH EDITZ",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: DESCRIPTION,
  sameAs: ["https://www.tiktok.com/@baadshah_editz01"],
  areaServed: "Worldwide",
  serviceType: "Video editing services for Free Fire gaming content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link
          rel="preconnect"
          href="https://www.tiktok.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
