import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import GlobalProviders from "@/components/providers/GlobalProvider";



export const metadata: Metadata = {
  title: "Help2Home | Affordable housing for all",
  description: "Help2Home - Making housing accessible and stress-free for everyone in Nigeria.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ClientLayout>
          <GlobalProviders>
            {children}
          </GlobalProviders>
        </ClientLayout>
      </body>
    </html>
  );
}
