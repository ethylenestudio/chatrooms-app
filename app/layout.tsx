"use client";
import { Footer, Header } from "@/components";
import "./globals.css";
import { Poppins } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";

const poppins = Poppins({
  weight: ["400", "500", "600", "800", "200", "300", "100", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={poppins.variable}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </body>
      </QueryClientProvider>
    </html>
  );
}
