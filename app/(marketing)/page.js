import Hero from '@/app/components/Home/Hero';
import Features from '@/app/components/Home/Features';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <hr className='border-t border-border' />
    </>
  );
}
