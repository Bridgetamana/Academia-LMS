import { DashboardSider, DashNav } from "@/app/components/common";

export const UserDashboardLayout = ({ children }) => {
  return (
    <section className="drawer lg:drawer-open bg-[#F2F2F2] text-black mx-auto max-w-[1640px]">
      {/* bg-[#DFE9F3] */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <DashNav />
        <div className="min-h-screen">{children}</div>
      </div>
      <DashboardSider />
    </section>
  );
};
