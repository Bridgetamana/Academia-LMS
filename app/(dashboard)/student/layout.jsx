import StudentSider from '@/app/components/Dashboard/student/StudentSider';
import AuthGuard from '@/app/components/Auth/AuthGuard';

export default function StudentDashboardLayout({ children }) {
  return (
    <AuthGuard>
      <div className='flex h-screen bg-[#f9fafb] text-neutral-900 font-sans overflow-hidden'>
        <StudentSider />
        <div className='flex-1 flex flex-col min-w-0 overflow-hidden'>
          <main className='flex-1 overflow-y-auto p-4 md:p-8'>
            <div className='max-w-7xl mx-auto'>
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
