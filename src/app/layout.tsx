import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "GUIATREND - Guía Turística de México",
  description: "Descubre los mejores destinos, restaurantes, hoteles y experiencias en las principales ciudades de México. Tu guía turística integral con IA personalizada.",
  keywords: "turismo México, guía turística, Monterrey, Guadalajara, CDMX, Cancún, restaurantes, hoteles, eventos",
  authors: [{ name: "GUIATREND" }],
  creator: "GUIATREND",
  publisher: "GUIATREND",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://guiatrend.com'),
  openGraph: {
    title: "GUIATREND - Guía Turística de México",
    description: "Descubre los mejores destinos, restaurantes, hoteles y experiencias en las principales ciudades de México.",
    url: 'https://guiatrend.com',
    siteName: 'GUIATREND',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GUIATREND - Guía Turística de México',
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GUIATREND - Guía Turística de México",
    description: "Descubre los mejores destinos, restaurantes, hoteles y experiencias en las principales ciudades de México.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FF004F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GUIATREND" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#FF004F" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider>
          <div className="min-h-screen bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text-dark)] dark:text-white transition-colors duration-300">
            <Header />
            <main className="relative">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}