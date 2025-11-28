import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "El Bethel Demo",
  description: "Plan Your Visit, 30-Day Reset, and Semantic Sermon Library",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
