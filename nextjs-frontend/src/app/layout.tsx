import type { Metadata } from "next";
import "./globals.css";
import { IntroductionBanner } from '@/modules/introduction';

export const metadata: Metadata = {
  title: "JobBoard — Find Your Next Role",
  description: "Browse thousands of jobs at top companies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <IntroductionBanner />
        {children}
      </body>
    </html>
  );
}
