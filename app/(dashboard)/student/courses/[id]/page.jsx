'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { getCourse, getCourseLessons } from '@/app/_store/courseStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faPlayCircle, 
  faCheckCircle, 
  faCircle, 
  faVideo, 
  faAlignLeft,
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function StudentCourseViewer() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [completedLessons, setCompletedLessons] = useState({}); 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const fetchedCourse = await getCourse(id);
          if (!fetchedCourse || fetchedCourse.status !== 'published') {
            setError('Course not found or is not available.');
            setIsLoading(false);
            return;
          }
          setCourse(fetchedCourse);
          
          const fetchedLessons = await getCourseLessons(id);
          setLessons(fetchedLessons);

          const progressDoc = await getDoc(doc(db, 'progress', `${currentUser.uid}_${id}`));
          if (progressDoc.exists()) {
            setCompletedLessons(progressDoc.data().completedLessons || {});
          }
        } catch (err) {
          console.error(err);
          setError('Failed to load course content.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [id]);

  const activeLesson = lessons[activeLessonIdx];

  const handleNextLesson = () => {
    if (activeLessonIdx < lessons.length - 1) {
      setActiveLessonIdx(prev => prev + 1);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIdx > 0) {
      setActiveLessonIdx(prev => prev - 1);
    }
  };

  const toggleComplete = async (idx) => {
    const newCompletedState = {
      ...completedLessons,
      [idx]: !completedLessons[idx]
    };
    
    setCompletedLessons(newCompletedState);

    if (user) {
      try {
        await setDoc(doc(db, 'progress', `${user.uid}_${id}`), {
          studentId: user.uid,
          courseId: id,
          completedLessons: newCompletedState,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.error("Failed to save progress", err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center animate-pulse">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-900 rounded-full animate-spin"></div>
          <p className="text-neutral-500 font-medium">Loading classroom...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <FontAwesomeIcon icon={faArrowLeft} className="w-8 h-8 text-red-300" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Oops!</h2>
        <p className="text-neutral-500 mb-6">{error || 'Course not found'}</p>
        <button onClick={() => router.push('/student/dashboard')} className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full font-sans">
      <div className="w-full lg:w-80 shrink-0 flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm h-[calc(100vh-6rem)] lg:sticky lg:top-4">
        <div className="p-5 border-b border-neutral-100 bg-neutral-50/50">
          <Link href="/student/dashboard" className="inline-flex items-center text-xs font-semibold text-neutral-500 hover:text-neutral-900 mb-4 transition-colors uppercase tracking-wider">
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Dashboard
          </Link>
          <h2 className="text-lg font-bold text-neutral-900 leading-tight mb-2 line-clamp-2">{course.title}</h2>
          
          <div className="mt-4">
            <div className="flex justify-between text-xs font-semibold text-neutral-500 mb-1.5">
              <span>Progress</span>
              <span>{Math.round((Object.values(completedLessons).filter(Boolean).length / (lessons.length || 1)) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500" 
                style={{ width: `${(Object.values(completedLessons).filter(Boolean).length / (lessons.length || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {lessons.length === 0 ? (
            <div className="p-6 text-center text-sm text-neutral-500">No lessons available.</div>
          ) : (
            <ul className="space-y-1">
              {lessons.map((lesson, idx) => {
                const isActive = activeLessonIdx === idx;
                const isCompleted = completedLessons[idx];
                
                return (
                  <li key={lesson.id || idx}>
                    <button 
                      onClick={() => setActiveLessonIdx(idx)}
                      className={`w-full text-left p-3 rounded-xl flex items-start gap-3 transition-colors ${
                        isActive 
                          ? 'bg-neutral-900 text-white' 
                          : 'hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isCompleted ? (
                          <FontAwesomeIcon icon={faCheckCircle} className={isActive ? 'text-green-400' : 'text-green-500'} />
                        ) : (
                          <FontAwesomeIcon icon={isActive ? faPlayCircle : faCircle} className={isActive ? 'text-white' : 'text-neutral-300'} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-neutral-900'}`}>
                          {idx + 1}. {lesson.title}
                        </p>
                        <div className={`flex gap-2 text-[10px] uppercase tracking-wider font-bold mt-1.5 ${isActive ? 'text-neutral-400' : 'text-neutral-500'}`}>
                          {lesson.videoUrl && <span><FontAwesomeIcon icon={faVideo} className="mr-1" /> Video</span>}
                          {lesson.content && <span><FontAwesomeIcon icon={faAlignLeft} className="mr-1" /> Reading</span>}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm min-h-[60vh]">
        {activeLesson ? (
          <>
            {activeLesson.videoUrl && (
              <div className="w-full aspect-video bg-black flex items-center justify-center relative">
                {activeLesson.videoUrl.includes('youtube') || activeLesson.videoUrl.includes('vimeo') ? (
                  <iframe 
                    src={activeLesson.videoUrl.replace('watch?v=', 'embed/')} 
                    className="absolute inset-0 w-full h-full" 
                    allowFullScreen 
                    title="Course Video"
                  ></iframe>
                ) : (
                  <div className="text-center text-white/50">
                    <FontAwesomeIcon icon={faVideo} size="3x" className="mb-4 text-white/20" />
                    <p>Video Player (External URL)</p>
                    <a href={activeLesson.videoUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline mt-2 inline-block">Open Video</a>
                  </div>
                )}
              </div>
            )}

            <div className="p-6 sm:p-10 flex-1 overflow-y-auto">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                    {activeLesson.title}
                  </h1>
                  <button 
                    onClick={() => toggleComplete(activeLessonIdx)}
                    className={`shrink-0 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${
                      completedLessons[activeLessonIdx] 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                    {completedLessons[activeLessonIdx] ? 'Completed' : 'Mark Complete'}
                  </button>
                </div>
                
                {activeLesson.content ? (
                  <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-a:text-blue-600">
                    <p className="whitespace-pre-wrap text-neutral-700 leading-relaxed text-lg">{activeLesson.content}</p>
                  </div>
                ) : !activeLesson.videoUrl ? (
                  <div className="py-12 text-center border-2 border-dashed border-neutral-200 rounded-xl">
                    <p className="text-neutral-500 font-medium">This lesson has no written content.</p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between mt-auto">
              <button 
                onClick={handlePrevLesson}
                disabled={activeLessonIdx === 0}
                className="px-5 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors disabled:opacity-50 flex items-center"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="mr-2" /> Previous
              </button>
              
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest hidden sm:block">
                Lesson {activeLessonIdx + 1} of {lessons.length}
              </span>

              <button 
                onClick={handleNextLesson}
                disabled={activeLessonIdx === lessons.length - 1}
                className="px-5 py-2.5 bg-neutral-900 text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center"
              >
                Next <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
            <FontAwesomeIcon icon={faBookOpen} className="w-16 h-16 text-neutral-200 mb-4" />
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No Lessons Found</h3>
            <p className="text-neutral-500">The educator has not added any curriculum to this course yet.</p>
          </div>
        )}
      </div>

    </div>
  );
}
