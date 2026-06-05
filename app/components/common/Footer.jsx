import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-white text-text-main border-t border-border'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 py-8'>
        <div className='flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
          <p className='text-sm text-text-muted text-center sm:text-left'>
            Copyright © {currentYear} All rights reserved{' '}
            <Link
              href='/'
              className='text-text-main hover:text-primary transition-colors font-medium'
            >
              Academia
            </Link>
          </p>

          <div className='flex items-center space-x-6'>
            <Link
              href='https://github.com/Bridgetamana/Academia-LMS'
              target='_blank'
              rel='noopener noreferrer'
              className='text-text-muted hover:text-text-main'
            >
              <FaGithub className='w-5 h-5' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
