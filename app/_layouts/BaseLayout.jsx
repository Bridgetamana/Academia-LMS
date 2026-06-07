import { Footer, Navbar, ScrollButton } from "@/app/components/common";

export const BaseLayout = ({ children }) => {
  return (
    <section className="bg-white">
      <Navbar />
      {children}
      <ScrollButton />
      <Footer />
    </section>
  );
};
