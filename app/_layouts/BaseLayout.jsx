import { Footer, Navbar, ScrollButton } from "@/app/components/common";

export const BaseLayout = ({ children }) => {
  return (
    <section className="bg-white">
      {/* <section className="bg-gradient-to-r from-white from-10% to-[#DFE9F3] to-90%"> */}
      <Navbar />
      {children}
      <ScrollButton />
      <Footer />
    </section>
  );
};
