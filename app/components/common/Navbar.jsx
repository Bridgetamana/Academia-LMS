'use client';

import Link from 'next/link';
import Logo from './Logo';
import { Button } from '@base-ui/react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className='w-full border-b border-border sticky top-0 backdrop-blur-md z-999 bg-white/80 py-3 sm:py-4 transition-all'>
      <div className='max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6'>
        <Logo />
        <div className='flex items-center gap-3 sm:gap-6'>
          <Link
            href='/signin'
            className='text-sm font-medium text-text-muted hover:text-text-main transition-colors'
          >
            Log in
          </Link>
          <Button
            onClick={() => router.push('/signup')}
            className='text-sm font-medium text-white bg-primary hover:bg-primary-hover px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all active:scale-[0.98] cursor-pointer'
          >
            Sign up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
