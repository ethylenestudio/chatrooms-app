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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "clamp(300px, 25%, 400px) auto",
                gridTemplateRows: "100px 1fr 50px",
                height: "100%",
              }}
            >
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
