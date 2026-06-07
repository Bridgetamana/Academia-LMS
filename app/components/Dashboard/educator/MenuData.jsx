import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookOpen,
  faCalendar,
  faArrowRightFromBracket,
  faGear,
  faTableColumns,
  faClipboardList,
  faUserGraduate,
  faClipboardCheck,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export const sidebarData1 = [
  {
    label: (
      <Link href='dashboard' className='text-base'>
        Dashboard
      </Link>
    ),
    icon: (
      <FontAwesomeIcon
        icon={faTableColumns}
        className=' font-bold text-[#7C8493] w-5 h-5'
      />
    ),
    key: 'dashboard',
  },
  {
    label: (
      <Link href='courses' className='text-base'>
        Courses
      </Link>
    ),
    icon: (
      <FontAwesomeIcon
        icon={faBookOpen}
        className=' font-bold text-[#7C8493] w-5 h-5'
      />
    ),
    key: 'courses',
  },
  {
    label: (
      <Link href='timetable' className='text-base'>
        Timetable
      </Link>
    ),
    icon: (
      <FontAwesomeIcon
        icon={faClipboardList}
        className=' font-bold text-[#7C8493] w-5 h-5'
      />
    ),
    key: 'timetable',
  },
  {
    label: (
      <Link href='assignments' className='text-base'>
        Assignments
      </Link>
    ),
    icon: (
      <FontAwesomeIcon icon={faClipboardCheck} className=' font-bold text-[#7C8493] w-5 h-5' />
    ),
    key: 'assignments',
  },
  {
    label: (
      <Link href='calendar' className='text-base'>
        Calendar
      </Link>
    ),
    icon: (
      <FontAwesomeIcon
        icon={faCalendar}
        className=' font-bold text-[#7C8493] w-5 h-5'
      />
    ),
    key: 'calendar',
  },
  {
    label: (
      <Link href='students' className='text-base'>
        Students
      </Link>
    ),
    icon: (
      <FontAwesomeIcon
        icon={faUserGraduate}
        className=' font-bold text-[#7C8493] w-5 h-5'
      />
    ),
    key: 'students',
  },
  {
    label: (
      <Link href='library' className='text-base'>
        library
      </Link>
    ),
    icon: (
      <FontAwesomeIcon
        icon={faUserGraduate}
        className=' font-bold text-[#7C8493] w-5 h-5'
      />
    ),
    key: 'library',
  },
];
export const sidebarData2 = [
  {
    label: (
      <Link href='settings' className='text-base'>
        Settings
      </Link>
    ),
    icon: (
      <FontAwesomeIcon
        icon={faGear}
        className=' font-bold text-[#7C8493] w-5 h-5'
      />
    ),
    key: 'settings',
  },
  {
    label: (
      <Link href='/signin' className='text-base'>
        Log Out
      </Link>
    ),
    icon: (
      <FontAwesomeIcon
        icon={faArrowRightFromBracket}
        className=' font-bold text-[#7C8493] w-5 h-5'
      />
    ),
    key: 'logout',
  },
];
export const activeKeys = [
  'dashboard',
  'courses',
  'calendar',
  'timetable',
  'assignments',
  'students',
  'settings',
  'library',
];
