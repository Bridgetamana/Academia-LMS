import { ChatSupport, DashboardSider2, DashNav2 } from "@/app/components/common";

export const AdminDashboardLayout = ({ children }) => {
  return (
    <section className="drawer lg:drawer-open bg-[#fbfbfc] text-black mx-auto max-w-[1640px]">
      {/* bg-[#DFE9F3] */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <DashNav2 />
        <div className="min-h-screen">{children}</div>
        <ChatSupport />
      </div>
      <DashboardSider2 />
    </section>
  );
};
