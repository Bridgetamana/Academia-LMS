'use client';

import { useLayoutEffect, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faCalendar,
  faArrowRightFromBracket,
  faGear,
  faTableColumns,
  faUserGraduate,
  faClipboardCheck,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '@/firebaseConfig';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const DashboardSider2 = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [activePath, setActivePath] = useState('');
  const [academyData, setAcademyData] = useState(null);

  const activeKeys = [
    'dashboard',
    'courses',
    'students',
    'assignments',
    'schedule',
    'resources',
    'settings',
  ];

  useLayoutEffect(() => {
    const matched = activeKeys.find((key) => pathName.includes(key)) || 'dashboard';
    setActivePath(matched);
  }, [pathName]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.academies && userData.academies.length > 0) {
              const academyDoc = await getDoc(doc(db, 'academies', userData.academies[0]));
              if (academyDoc.exists()) {
                setAcademyData(academyDoc.data());
              }
            }
          }
        } catch (error) {
          console.error("Failed to load academy data:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    { label: 'Dashboard', icon: faTableColumns, href: '/educator/dashboard', key: 'dashboard' },
    { label: 'Courses', icon: faBookOpen, href: '/educator/courses', key: 'courses' },
    { label: 'Assignments', icon: faClipboardCheck, href: '/educator/assignments', key: 'assignments' },
    { label: 'Schedule', icon: faCalendar, href: '/educator/schedule', key: 'schedule' },
    { label: 'Students', icon: faUserGraduate, href: '/educator/students', key: 'students' },
    { label: 'Resources', icon: faFolderOpen, href: '/educator/resources', key: 'resources' },
  ];

  const bottomItems = [
    { label: 'Settings', icon: faGear, href: '/educator/settings', key: 'settings' },
  ];

  return (
    <div className='w-64 shrink-0 flex flex-col bg-[#fbfbfc] border-r border-neutral-100 h-full overflow-y-auto'>
      
      {/* Academy Header */}
      <div className='p-6 mb-2'>
        <Link href='/educator/dashboard' className='flex items-center gap-3 group'>
          <div className='w-9 h-9 rounded-lg bg-primary flex items-center justify-center overflow-hidden shrink-0'>
            {academyData?.logoUrl ? (
              <img src={academyData.logoUrl} alt="Academy Logo" className="w-full h-full object-cover" />
            ) : (
              <span className='text-sm font-bold text-white'>
                {academyData?.name ? academyData.name.charAt(0).toUpperCase() : 'A'}
              </span>
            )}
          </div>
          <div className='flex flex-col overflow-hidden'>
            <span className='font-bold text-neutral-900 truncate text-[15px]'>
              {academyData?.name || 'Academia LMS'}
            </span>
            <span className='text-[11px] font-medium text-neutral-500 uppercase tracking-wider truncate'>
              Educator Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className='flex-1 px-4 flex flex-col gap-2'>
        <ul className='space-y-1'>
          {menuItems.map((item) => {
            const isActive = activePath === item.key;
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                    isActive
                      ? 'bg-neutral-200/60 text-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`w-4 h-4 ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSider2;
