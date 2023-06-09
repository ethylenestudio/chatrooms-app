"use client";
import { Footer, Header } from "@/components";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </body>
      </QueryClientProvider>
    </html>
  );
}
