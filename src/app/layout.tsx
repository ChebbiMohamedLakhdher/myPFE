import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ["latin"] });

const CrispWithNoSSR = dynamic(() => import('../../crisp'));

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <Providers>{children}</Providers>
         <CrispWithNoSSR />
       </body>
    </html>
  );
}
