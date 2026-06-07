import DashNav2 from '@/app/components/Dashboard/Admin/DashNav2';
import DashboardSider2 from '@/app/components/Dashboard/Admin/DashboardSider2';
import ChatSupport from '@/app/components/common/ChatSupport';

export default function AdminDashboardLayout({ children }) {
  return (
    <section className='drawer lg:drawer-open bg-[#fbfbfc] text-black mx-auto max-w-410'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <DashNav2 />
        <div className='min-h-screen'>{children}</div>
        <ChatSupport />
      </div>
      <DashboardSider2 />
    </section>
  );
}
