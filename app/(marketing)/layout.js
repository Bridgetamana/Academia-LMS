import Navbar from '@/app/components/common/Navbar';
import Footer from '@/app/components/common/Footer';

export default function MarketingLayout({ children }) {
  return (
    <div className='bg-white min-h-screen flex flex-col'>
      <Navbar />
      <main className='grow'>{children}</main>
      <Footer />
    </div>
  );
}
