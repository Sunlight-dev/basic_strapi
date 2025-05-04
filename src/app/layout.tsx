import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { fetchMetaData, getStrapiURL } from "@/utils/functions";
import { SEOType } from "@/utils/types";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata | null> {
  const seoData: SEOType | undefined = await fetchMetaData();
  if (!seoData) {
    return null;
  }
  return {
    title: seoData?.metaTitle,
    description: seoData?.metaDescription,
    icons: getStrapiURL(seoData?.metaImage?.url),
    keywords: seoData.keywords,
    openGraph: {
      title: seoData?.openGraph?.ogTitle,
      description: seoData?.openGraph?.ogDescription,
      images: getStrapiURL(seoData?.openGraph?.ogImage?.url),
    },
    alternates: {
      canonical: seoData.canonicalURL,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}
