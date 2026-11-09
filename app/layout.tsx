import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Satyam Gupta | Immersive Digital Portfolio",
  description:
    "The interactive portfolio of Satyam Gupta — Software Engineer, AI/ML & Full-Stack Developer, and Cybersecurity practitioner.",
  keywords: [
    "Satyam Gupta",
    "Software Engineer",
    "AI/ML",
    "Full Stack Developer",
    "Cybersecurity",
    "Digital Forensics",
    "The AI Guy",
  ],
  openGraph: {
    title: "Satyam Gupta — Enter My Digital World",
    description: "An immersive 3D portfolio exploring code, intelligence and security.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
