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
            <div style={{
              display: "grid",
              gridTemplateColumns: "clamp(300px, 25%, 400px) auto",
              gridTemplateRows: "100px auto 50px",
              height: "100vh"
            }}>
              <Header />
              {children}
              <Footer />
            </div>
          </RainbowProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
