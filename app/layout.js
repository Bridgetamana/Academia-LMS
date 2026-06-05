import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Academia",
    default: "Academia | Home",
  },
  description: "Academia LMS: Your All-in-One Solution - Effortlessly manage your academic responsibilities and boost productivity with our comprehensive platform for students and educators.",

  keywords: ["Academia"],
  // openGraph: {
  //   images: "/opengraph-image.png",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
