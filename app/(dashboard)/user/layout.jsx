import DashNav from "@/app/components/Dashboard/User/DashNav";
import DashboardSider from "@/app/components/Dashboard/User/DashboardSider";

export default function UserDashboardLayout({ children }) {
  return (
    <section className="drawer lg:drawer-open bg-[#F2F2F2] text-black mx-auto max-w-410">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <DashNav />
        <div className="min-h-screen">{children}</div>
      </div>
      <DashboardSider />
    </section>
  );
}
