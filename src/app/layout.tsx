import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/ui-states";

export const metadata = {
  title: "Aether AI | Private AI Platform",
  description: "Discover, run, and verify private AI models on the Aether Compute Layer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        <div className="bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}
