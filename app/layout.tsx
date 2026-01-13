import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "grammar.repair - Instant, Free Grammar Checker & Fixer",
  description:
    "grammar.repair is a fast, no-friction tool that instantly fixes grammar and clarity in any text. Users paste their content, get clean, correct writing, and move on — no learning curve, no clutter, just better language in seconds.",
  keywords: [
    "fix grammar",
    "grammar checker",
    "grammar corrector",
    "correct grammar",
    "grammar repair",
    "fix grammar online",
    "grammar checker online",
    "grammar checker free",
    "grammar checker without login",
    "fix my grammar",
    "correct my grammar",
    "grammar checker instant",
    "English grammar checker",
  ],
  authors: [{ name: "grammar.repair" }],
  openGraph: {
    title: "grammar.repair - Instant, Free Grammar Checker & Fixer",
    description:
      "grammar.repair is a fast, no-friction tool that instantly fixes grammar and clarity in any text. Get clean, correct writing in seconds.",
    url: "https://grammar.repair",
    siteName: "grammar.repair",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "grammar.repair - Instant, Free Grammar Checker & Fixer",
    description:
      "grammar.repair is a fast, no-friction tool that instantly fixes grammar and clarity in any text. Get clean, correct writing in seconds.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
