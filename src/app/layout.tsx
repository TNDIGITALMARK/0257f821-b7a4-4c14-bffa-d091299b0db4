import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { PhoenixTracker } from "@/components/PhoenixTracker";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'SportsBet Community Hub',
  description: 'Join the ultimate social sports betting platform. Compete with friends, climb leaderboards, and prove your sports knowledge in friendly communities.',
  keywords: 'sports betting, community, social betting, leaderboards, fantasy sports, NBA, NFL, MLB, NHL',
  authors: [{ name: 'SportsBet Community Hub' }],
  creator: 'SportsBet Community Hub',
  publisher: 'SportsBet Community Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#1A2E4C',
  colorScheme: 'dark',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SportsBet Community Hub',
    title: 'SportsBet Community Hub - Social Sports Betting',
    description: 'Join the ultimate social sports betting platform. Compete with friends, climb leaderboards, and prove your sports knowledge in friendly communities.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportsBet Community Hub',
    description: 'Join the ultimate social sports betting platform. Compete with friends, climb leaderboards, and prove your sports knowledge.',
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
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <AuthProvider>
              <TooltipProvider>
                <div className="relative flex min-h-screen flex-col bg-background">
                  <div className="flex-1">{children}</div>
                </div>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
        <PhoenixTracker />


      </body>
    </html>
  );
}
