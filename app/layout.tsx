import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AlgoViz - Interactive Algorithm Visualizer",
  description:
    "A premium, interactive platform to visualize and understand complex algorithms like BFS, DFS, A*, Merge Sort, and Quick Sort.",
  keywords: [
    "algorithm",
    "visualizer",
    "pathfinding",
    "sorting",
    "bfs",
    "dfs",
    "a*",
    "dijkstra",
    "merge sort",
    "quick sort",
    "react",
    "nextjs",
  ],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "AlgoViz - Interactive Algorithm Visualizer",
    description:
      "Visualize pathfinding and sorting algorithms in real-time with a premium, minimal interface.",
    url: "https://algoviz.demo",
    siteName: "AlgoViz",
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "AlgoViz Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AlgoViz - Interactive Algorithm Visualizer",
    description:
      "Visualize pathfinding and sorting algorithms in real-time with a premium, minimal interface.",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
