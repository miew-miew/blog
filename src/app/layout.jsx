import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { connectDB } from "@/lib/config/db";
import { Toaster } from "sonner";
import AuthProvider from "@/providers/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Euphoria No Sekai",
};

const initializeDB = async() => {
  await connectDB()
}

export default function RootLayout({ children }) {
  initializeDB()

  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Toaster position="top-center" />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
