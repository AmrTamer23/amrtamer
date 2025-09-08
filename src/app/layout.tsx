import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import { IBM_Plex_Sans, Xanh_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ViewTransitions } from "next-view-transitions";

const IBMPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const XanhMono = Xanh_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-xanh-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.name,
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.origin,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.og,
        width: 2880,
        height: 1800,
        alt: siteConfig.name,
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.socials.x,
    title: siteConfig.title,
    description: siteConfig.description,
    images: {
      url: siteConfig.og,
      width: 2880,
      height: 1800,
      alt: siteConfig.name,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "font-sans antialiased",
            IBMPlexSans.variable,
            XanhMono.variable
          )}
        >
          <NuqsAdapter>
            <div className="flex flex-col h-full py-8 gap-4 px-4 relative">
              <div
                className="absolute inset-0 z-0"
                style={{
                  background:
                    "radial-gradient(140% 140% at 50% 10%, #000000 40%, #072607 100%)",
                }}
              />
              <main className="flex flex-col h-full gap-12 lg:justify-between">
                <Header />
                <div className="container mx-auto w-full h-full flex lg:items-center lg:justify-center items-start justify-start">
                  {children}
                </div>
              </main>
            </div>
          </NuqsAdapter>
        </body>
      </html>
    </ViewTransitions>
  );
}
