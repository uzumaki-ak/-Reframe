import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SiteProvider } from "@/components/site-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Philosophy Tracker - Archive Your Evolving Beliefs",
  description:
    "A place to archive philosophies, worldviews, or beliefs you no longer hold.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteProvider>
            {children}
            <Toaster />
          </SiteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
