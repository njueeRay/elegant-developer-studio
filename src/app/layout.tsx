import type { Metadata, Viewport } from "next";
import { AmbientCursorField } from "@/components/ambient-cursor-field";
import { CommandTraceToast } from "@/components/command-trace-toast";
import { GlobalCommandMenu } from "@/components/global-command-menu";
import { createMetadata, metadataBase } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase,
  ...createMetadata(),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        {children}
        <AmbientCursorField />
        <GlobalCommandMenu />
        <CommandTraceToast />
      </body>
    </html>
  );
}
