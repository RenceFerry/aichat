import ThemeWrapper from "./ui/theme";
import SessionWrapper from "./ui/session";
import { Inter } from "@/ui/font";
import "./globals.css";
import type { Metadata } from 'next';

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
        className={`${Inter.variable} font-inter antialiased h-[100dvh] w-[100dvw] bg-back p-0 m-0 text-fore`}
      >
        <ThemeWrapper>
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </ThemeWrapper>

      </body>
    </html>
  );
}
