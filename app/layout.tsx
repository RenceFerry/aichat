import ThemeWrapper from "./ui/theme";
import { Inter } from "@/ui/font";
import "./globals.css";
import type { Metadata } from 'next';
import { ThemeToggler } from "./components/home/themeToggler";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "Simple AI chat bot application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${Inter.variable} font-inter antialiased h-screen w-screen bg-back p-0 m-0 text-fore`}
      >
        <ThemeWrapper>
          {children}
          <ThemeToggler/>
        </ThemeWrapper>

      </body>
    </html>
  );
}
