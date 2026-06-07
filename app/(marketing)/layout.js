import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import ScrollButton from "@/app/components/common/ScrollButton";

export default function MarketingLayout({ children }) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <ScrollButton />
      <Footer />
    </div>
  );
}
