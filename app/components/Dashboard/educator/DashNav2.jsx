'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGear, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const DashNav2 = () => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userName, setUserName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || 'Educator');
        setPhotoURL(user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${user.displayName || 'E'}`);
      }
    });
    return () => unsubscribe();
  }, []);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good Morning';
    if (currentHour < 18) return 'Good Afternoon';
    return 'Good Evening';
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
    if (activeDropdown === type) setActiveDropdown(null);
    else setActiveDropdown(type);
  };

  return (
    <div className='w-full z-40 bg-[#f4f6f8]'>
      <nav className='flex items-center justify-end px-4 sm:px-8 lg:px-10 py-6'>
        
        <div className='flex items-center gap-4'>

          {/* Profile Dropdown */}
          <div className='relative'>
            <button
              type='button'
              onClick={() => toggleDropdown('profile')}
              className='flex items-center justify-center rounded-full hover:ring-2 hover:ring-neutral-200 hover:ring-offset-2 hover:ring-offset-[#f4f6f8] transition-all'
            >
              <img
                src={photoURL || 'https://api.dicebear.com/7.x/initials/svg?seed=A'}
                alt='Profile'
                className='w-9 h-9 rounded-full object-cover border border-neutral-200 shadow-sm'
              />
            </button>
            <AnimatePresence>
              {activeDropdown === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className='absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 py-2 z-50'
                >
                  <div className="px-4 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-sm font-semibold text-neutral-900 truncate">{userName}</p>
                    <p className="text-xs text-neutral-500 truncate">{auth?.currentUser?.email}</p>
                  </div>
                  <Link
                    href='/educator/settings'
                    className='flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors'
                    onClick={() => setActiveDropdown(null)}
                  >
                    <FontAwesomeIcon icon={faGear} className='w-4 h-4 text-neutral-400' />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors'
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='w-4 h-4 text-red-500' />
                    Log Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications Dropdown */}
          <div className='relative ml-1'>
            <button
              type='button'
              onClick={() => toggleDropdown('notifications')}
              className='relative p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50 transition-colors'
            >
              <FontAwesomeIcon icon={faBell} className='w-[18px] h-[18px]' />
              {/* Notification Badge */}
              <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#f4f6f8]'></span>
            </button>
            <AnimatePresence>
              {activeDropdown === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className='absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg border border-neutral-100 py-2 z-50'
                >
                  <div className="px-4 py-2 border-b border-neutral-100 flex justify-between items-center">
                    <span className="text-sm font-semibold text-neutral-900">Notifications</span>
                    <span className="text-xs text-primary font-medium cursor-pointer">Mark all read</span>
                  </div>
                  <div className="p-4 text-center">
                    <p className='text-sm text-neutral-500'>You're all caught up!</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default DashNav2;
