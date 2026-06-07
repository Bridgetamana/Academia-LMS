'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUserGraduate, faBookOpen } from '@fortawesome/free-solid-svg-icons';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { getEducatorCourses } from '@/app/_store/courseStore';
import Link from 'next/link';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const activeAcademyId = userData.academies?.[0];
              if (activeAcademyId) {
                const fetchedCourses = await getEducatorCourses(activeAcademyId);
                setCourses(fetchedCourses);
              }
            }
          } catch (error) {
            console.error('Failed to fetch courses:', error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      });
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <section className='max-w-410 flex flex-col gap-6 p-4'>
        <div>
          <h2 className='lg:text-xl font-semibold mb-4'>Courses</h2>
          <div className='flex justify-between items-center mb-4'>
            <form className='max-w-sm'>
              <label htmlFor='default-search' className='sr-only'>
                Search
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none'>
                  <svg
                    className='w-3 h-3 text-gray-500'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                    />
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#B9B8FB] focus:border-[#B9B8FB] outline-none'
                  placeholder='Find course'
                  required
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
            <div className='flex items-center'>
              <Link href="/educator/courses/create">
                <button
                  className='flex p-2 px-4 items-center rounded-md text-white bg-primary hover:bg-primary-dark transition-colors font-medium shadow-sm'
                >
                  <FontAwesomeIcon icon={faPlus} className='mr-2' />
                  <p className='hidden lg:flex'>Create Course</p>
                </button>
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[1, 2, 3].map((n) => (
                <div key={n} className='bg-white border rounded-md w-full animate-pulse'>
                  <div className='w-full h-48 bg-neutral-200 rounded-t-lg'></div>
                  <div className='p-4 space-y-3'>
                    <div className='h-6 bg-neutral-200 rounded w-3/4'></div>
                    <div className='h-4 bg-neutral-200 rounded w-full'></div>
                    <div className='h-4 bg-neutral-200 rounded w-5/6'></div>
                    <div className='flex justify-end pt-4'>
                      <div className='h-4 bg-neutral-200 rounded w-12'></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className='text-center text-gray-500 mt-12 bg-white p-12 rounded-xl border border-neutral-200 border-dashed'>
              <p>No courses have been created yet.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredCourses.map((course, index) => (
                <Link key={index} href={`/educator/courses/${course.id}`} className="block h-full">
                  <div className='bg-white hover:shadow-md border border-neutral-200 rounded-xl w-full h-full flex flex-col overflow-hidden transition-all hover:border-neutral-300'>
                    <div className="relative w-full h-48">
                      {course.thumbnailUrl ? (
                        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                          <FontAwesomeIcon icon={faBookOpen} size="2x" />
                        </div>
                      )}
                    </div>
                    <div className='p-5 flex flex-col flex-1'>
                      <h2 className='text-lg font-bold text-neutral-900 line-clamp-2'>
                        {course.title}
                      </h2>
                      <p className='text-sm text-neutral-500 mt-2 line-clamp-3 flex-1'>{course.description}</p>
                      <div className='flex items-center justify-end mt-4 text-neutral-400 text-sm font-medium pt-4 border-t border-neutral-100'>
                        <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
                        <p>0 Students</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;
