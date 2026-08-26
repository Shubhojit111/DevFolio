import "./globals.css";
import { Raleway, Lexend, Poppins } from "next/font/google";
import ToastProvider from "@/components/common/ToastProvider";
import SocialSidebar from "@/components/common/SocialSidebar";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-raleway",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-lexend",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Shubhojit Deb | Frontend-Focused Full-Stack Developer",
  description: "Portfolio of Shubhojit Deb, a frontend-focused Full-Stack Developer based in Kolkata, India, building modern web applications with MERN & Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${raleway.variable} ${lexend.variable} ${poppins.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ToastProvider>
          <SocialSidebar />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}