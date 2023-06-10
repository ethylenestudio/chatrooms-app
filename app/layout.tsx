"use client";
import { Footer, Header } from "@/components";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { RainbowProvider } from "@/hooks/useRainbow";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <RainbowProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </RainbowProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
