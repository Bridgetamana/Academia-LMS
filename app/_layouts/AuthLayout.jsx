import { Nav } from "@/app/components/common";

export const AuthLayout = ({ children }) => {
  return (
    <section className="bg-gradient-to-r from-white from-10% to-[#DFE9F3] to-90%">
      {/* bg-gradient-bg */}
      <Nav />
      <section className="mx-auto max-w-screen-xl min-h-screen px-4 md:px-8 pt-16 pb-0 lg:flex bg-[url('/assets/images/AI.png')] bg-no-repeat bg-contain bg-right">
        <div className="h-max">{children}</div>
      </section>
    </section>
  );
};
