'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faBell,
  faArrowRightFromBracket,
  faGear,
} from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth } from '@/firebaseConfig';
import { signOut } from 'firebase/auth';

const DashNav = () => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null); // 'messages' | 'notifications' | 'profile' | null

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDropdown = (type) => {
    if (activeDropdown === type) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(type);
    }
  };

  const userName = auth?.currentUser?.displayName || 'Student';

  return (
    <>
      <nav className='flex gap-6 items-center px-4 lg:px-8 py-3 bg-white relative'>
        <div className='w-full flex gap-8 justify-between items-center'>
          <span className='flex flex-col gap-1'>
            <p className='text-[14px] xs:text-base lg:text-xl font-semibold text-neutral-800'>
              {getGreeting()}, <span>{userName}</span>
            </p>
            <p className='text-sm hidden lg:flex text-neutral-500'>
              Your learning adventure continues!
            </p>
          </span>

          <span className='flex gap-4 items-center relative'>
            {/* Messages Dropdown */}
            <div className='relative'>
              <button
                type='button'
                onClick={() => toggleDropdown('messages')}
                className='p-2 bg-neutral-50 hover:bg-neutral-100 rounded-full text-neutral-600 hover:text-primary transition-colors'
              >
                <FontAwesomeIcon icon={faCommentDots} className='w-6 h-6' />
              </button>
              {activeDropdown === 'messages' && (
                <div className='absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-100 py-2 z-50'>
                  <p className='px-4 py-2 text-sm text-neutral-500'>
                    No messages yet
                  </p>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className='relative'>
              <button
                type='button'
                onClick={() => toggleDropdown('notifications')}
                className='p-2 bg-neutral-50 hover:bg-neutral-100 rounded-full text-neutral-600 hover:text-primary transition-colors'
              >
                <span className='relative'>
                  <FontAwesomeIcon icon={faBell} className='w-6 h-6' />
                  <span className='rounded-full w-2 h-2 bg-primary absolute -top-0.5 right-0.5' />
                </span>
              </button>
              {activeDropdown === 'notifications' && (
                <div className='absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-100 py-2 z-50'>
                  <p className='px-4 py-2 text-sm text-neutral-500'>
                    (0) notifications
                  </p>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className='relative'>
              <button
                type='button'
                onClick={() => toggleDropdown('profile')}
                className='w-10 h-10 rounded-full overflow-hidden border border-neutral-200 focus:outline-none transition-transform active:scale-95'
              >
                <img
                  src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                  alt='Profile'
                  className='w-full h-full object-cover'
                />
              </button>
              {activeDropdown === 'profile' && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-neutral-100 py-1 z-50'>
                  <Link
                    href='/user/settings'
                    className='flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors'
                    onClick={() => setActiveDropdown(null)}
                  >
                    <FontAwesomeIcon icon={faGear} className='w-4 h-4' />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className='w-4 h-4'
                    />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </span>
        </div>
      </nav>
      <div className='border border-neutral-100' />
    </>
  );
};

export default DashNav;
