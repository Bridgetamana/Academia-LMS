import { Nav } from "@/app/components/common";

export const AuthLayout = ({ children }) => {
  return (
    <section className="bg-[#F9F9F9]">
      <Nav />
      <section className="mx-auto max-w-screen-xl zzz px-4 md:px-8 pt-16 pb-0 lg:flex justify-center">
        <div className="h-max">{children}</div>
      </section>
    </section>
  );
};
