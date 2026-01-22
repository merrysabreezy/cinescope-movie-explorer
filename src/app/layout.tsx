import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CineScope - Movie Explorer',
  description:
    'Discover and explore movies from around the world. Find popular movies, top-rated films, and get detailed information about your favorite movies.',
  keywords: 'movies, films, cinema, movie database, movie explorer, TMDB',
  authors: [{ name: 'CineScope Team' }],
  creator: 'CineScope',
  publisher: 'CineScope',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cinescope-movie-explorer.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CineScope - Movie Explorer',
    description: 'Discover and explore movies from around the world',
    url: 'https://cinescope-movie-explorer.vercel.app',
    siteName: 'CineScope',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineScope - Movie Explorer',
    description: 'Discover and explore movies from around the world',
    creator: '@cinescope',
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
    google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#171717" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
