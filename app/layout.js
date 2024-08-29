import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
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
    <html lang="en">
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
