import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "./_components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rolldown menu deactivated by router.back()",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <div className="py-[80px]">{children}</div>
        <footer className="bg-slate-800 text-white p-4">
          UIcons by <a href="https://www.flaticon.com/uicons">Flaticon</a>
        </footer>
      </body>
    </html>
  );
}
