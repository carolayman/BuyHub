
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MySessionProvider from "../MySessionProvider/MySessionProvider";
import NavbarWrapper from "./_components/NavbarWrapper/NavbarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuyHub",
  description: "Your favorite online shopping destination",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MySessionProvider>
          <NavbarWrapper />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={1500}
            closeOnClick={true}
            pauseOnHover={false}
          />
        </MySessionProvider>
      </body>
    </html>
  );
}
