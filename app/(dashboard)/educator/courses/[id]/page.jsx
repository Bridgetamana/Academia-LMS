'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCourse, getCourseLessons } from '@/app/_store/courseStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faVideo, faAlignLeft, faClock, faPlayCircle, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCourse = await getCourse(id);
        if (!fetchedCourse) {
          setError('Course not found');
          setIsLoading(false);
          return;
        }
        setCourse(fetchedCourse);
        
        const fetchedLessons = await getCourseLessons(id);
        setLessons(fetchedLessons);
      } catch (err) {
        console.error(err);
        setError('Failed to load course details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-6 flex flex-col gap-6 animate-pulse">
        <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
        <div className="h-64 bg-neutral-200 rounded-xl w-full"></div>
        <div className="h-8 bg-neutral-200 rounded w-1/3 mt-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-20 bg-neutral-200 rounded-lg w-full"></div>)}
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Oops!</h2>
        <p className="text-neutral-500 mb-6">{error || 'Course not found'}</p>
        <button onClick={() => router.push('/educator/courses')} className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto py-8 px-4 sm:px-6 font-sans'>
      <Link
        href='/educator/courses'
        className='inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 mb-6 transition-colors'
      >
        <FontAwesomeIcon icon={faArrowLeft} className='mr-2 w-4 h-4' /> Back to
        Courses
      </Link>

      <div className='bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm mb-8'>
        <div className='relative w-full h-64 sm:h-80 lg:h-96 bg-neutral-100 flex items-center justify-center'>
          {course.thumbnailUrl ? (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='text-neutral-400 flex flex-col items-center gap-4'>
              <FontAwesomeIcon
                icon={faBookOpen}
                className='w-16 h-16 opacity-50'
              />
              <p className='text-sm font-medium'>No cover image provided</p>
            </div>
          )}
          <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent'></div>
          <div className='absolute bottom-0 left-0 w-full p-6 sm:p-10 text-white'>
            <div className='inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider uppercase mb-4 text-white/90'>
              <span className='w-2 h-2 rounded-full bg-green-400'></span>{' '}
              Published
            </div>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight'>
              {course.title}
            </h1>
            <p className='text-white/80 text-sm sm:text-base max-w-3xl line-clamp-2'>
              {course.description}
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-6'>
          <div className='flex items-center justify-between border-b border-neutral-100 pb-4'>
            <h2 className='text-2xl font-bold text-neutral-900 tracking-tight'>
              Curriculum
            </h2>
            <span className='text-sm font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full'>
              {lessons.length} Lessons
            </span>
          </div>

          {lessons.length === 0 ? (
            <div className='p-12 text-center border border-dashed border-neutral-300 rounded-xl bg-neutral-50'>
              <p className='text-neutral-500 font-medium'>
                This course has no lessons yet.
              </p>
            </div>
          ) : (
            <div className='space-y-3'>
              {lessons.map((lesson, idx) => (
                <div
                  key={lesson.id || idx}
                  className='group p-5 bg-white border border-neutral-200 rounded-xl hover:border-neutral-300 hover:shadow-sm transition-all flex items-start sm:items-center gap-4 sm:gap-6'
                >
                  <div className='w-10 h-10 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center font-bold text-sm shrink-0 mt-1 sm:mt-0'>
                    {idx + 1}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h3 className='font-semibold text-neutral-900 text-base mb-1 truncate'>
                      {lesson.title}
                    </h3>
                    <div className='flex flex-wrap gap-4 text-xs font-medium text-neutral-500'>
                      {lesson.videoUrl && (
                        <span className='flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2 py-0.5 rounded'>
                          <FontAwesomeIcon icon={faVideo} className='w-3 h-3' />{' '}
                          Video Lesson
                        </span>
                      )}
                      {lesson.content && (
                        <span className='flex items-center gap-1.5 text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded'>
                          <FontAwesomeIcon
                            icon={faAlignLeft}
                            className='w-3 h-3'
                          />{' '}
                          Reading Material
                        </span>
                      )}
                    </div>
                  </div>
                  <button className='hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-neutral-50 text-neutral-400 group-hover:bg-primary group-hover:text-white transition-colors shrink-0'>
                    <FontAwesomeIcon
                      icon={faPlayCircle}
                      className='w-5 h-5 ml-0.5'
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='space-y-6'>
          <div className='bg-neutral-50 border border-neutral-200 rounded-2xl p-6'>
            <h3 className='font-bold text-neutral-900 mb-4'>
              Course Information
            </h3>
            <div className='space-y-4'>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 shrink-0'>
                  <FontAwesomeIcon icon={faBookOpen} className='w-3 h-3' />
                </div>
                <div>
                  <p className='text-sm font-medium text-neutral-900'>
                    Total Lessons
                  </p>
                  <p className='text-xs text-neutral-500'>
                    {lessons.length} structured modules
                  </p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 shrink-0'>
                  <FontAwesomeIcon icon={faClock} className='w-3 h-3' />
                </div>
                <div>
                  <p className='text-sm font-medium text-neutral-900'>
                    Creation Date
                  </p>
                  <p className='text-xs text-neutral-500'>
                    {course.createdAt
                      ? new Date(
                          course.createdAt.seconds * 1000,
                        ).toLocaleDateString()
                      : 'Just now'}
                  </p>
                </div>
              </div>
            </div>

            <button className='w-full mt-6 py-3 bg-white border border-neutral-300 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors'>
              Edit Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
