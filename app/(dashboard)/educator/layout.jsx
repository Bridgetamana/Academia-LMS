import DashNav2 from '@/app/components/Dashboard/educator/DashNav2';
import DashboardSider2 from '@/app/components/Dashboard/educator/DashboardSider2';
import AuthGuard from '@/app/components/Auth/AuthGuard';

export default function AdminDashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className='flex h-screen bg-[#f4f6f8] text-neutral-900 font-sans overflow-hidden'>
        <DashboardSider2 />
        <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
          <DashNav2 />
          <main className='flex-1 overflow-y-auto p-4'>
            <div className='max-w-7xl mx-auto'>{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
