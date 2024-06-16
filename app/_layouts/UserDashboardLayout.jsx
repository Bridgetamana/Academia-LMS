import { DashboardSider, DashNav } from "@/app/components/common";

export const UserDashboardLayout = ({ children }) => {
  return (
    <section className="drawer lg:drawer-open bg-[#DFE9F3] text-black mx-auto max-w-[1640px]">
      {/* bg-[#FAFAFA] */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <DashNav />
        {children}
      </div>
      <DashboardSider />
    </section>
  );
};
