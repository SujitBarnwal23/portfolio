import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sujit Barnwal - Senior AI Engineer",
  description: "Senior Full-Stack & AI Engineer specializing in RAG systems, multi-agent architectures, and scalable backend solutions. 4+ years of experience building production-grade AI solutions.",
  keywords: "AI Engineer, Full-Stack Developer, RAG Systems, Multi-Agent Architecture, Python, FastAPI, LangChain, Machine Learning",
  authors: [{ name: "Sujit Barnwal" }],
  creator: "Sujit Barnwal",
  openGraph: {
    title: "Sujit Barnwal - Senior AI Engineer",
    description: "Senior Full-Stack & AI Engineer with expertise in building scalable AI systems and production-grade solutions.",
    url: "https://sujitbarnwal.me",
    siteName: "Sujit Barnwal Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujit Barnwal - Senior AI Engineer",
    description: "Senior Full-Stack & AI Engineer specializing in AI systems and backend development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-background to-muted`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="relative">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
