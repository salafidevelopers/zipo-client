import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://zipo.me",
    siteName: "Zipo",
    title: "Zipo - Shorten, Simplify, and Optimize Your URLs",
    description:
      "Experience the convenience and power of Zipo today! Simplify your links, enhance your brand, and track your success. Sign up now and take control of your URLs like never before.",
    images: [
      {
        url: "/og-img.jpg",
        width: 800,
        height: 600,
        alt: "Og Image Alt",
      },
    ],
  },
  twitter: {
    handle: "@pymastudio",
    site: "https://prymastudio.com",
    cardType: "summary_large_image",
  },
};

export default config;
