'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faTimes,
  faPlus,
  faTrash,
  faVideo,
  faAlignLeft,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { createCourse, addLessonToCourse } from '@/app/_store/courseStore';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { id: 1, label: 'Course Details' },
  { id: 2, label: 'Curriculum' },
  { id: 3, label: 'Publish' },
];

export default function CourseBuilderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [academyId, setAcademyId] = useState(null);
  const [error, setError] = useState('');

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
  });

  const [lessons, setLessons] = useState([]);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [newLesson, setNewLesson] = useState({
    title: '',
    videoUrl: '',
    content: '',
  });

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const uData = userDoc.data();
          setAcademyId(uData.academies?.[0]);
        }
      }
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit for Firestore document
        setError('Image must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseData((prev) => ({ ...prev, thumbnailUrl: reader.result }));
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && (!courseData.title || !courseData.description)) {
      setError('Please fill out the course title and description.');
      return;
    }
    if (currentStep === 2 && lessons.length === 0) {
      setError('Please add at least one lesson to your curriculum.');
      return;
    }
    setError('');
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleAddLesson = () => {
    if (!newLesson.title) return;
    setLessons([...lessons, { ...newLesson, order: lessons.length }]);
    setNewLesson({ title: '', videoUrl: '', content: '' });
    setIsAddingLesson(false);
  };

  const handleRemoveLesson = (index) => {
    const updated = [...lessons];
    updated.splice(index, 1);
    setLessons(updated);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!academyId) return setError('No Academy ID found.');
    setIsSubmitting(true);
    setError('');

    try {
      const courseRes = await createCourse(academyId, courseData);
      if (!courseRes.success) throw new Error(courseRes.error);

      const courseId = courseRes.id;
      for (const lesson of lessons) {
        await addLessonToCourse(courseId, lesson);
      }
      router.push('/educator/courses');
    } catch (error) {
      console.error(error);
      setError('Failed to publish course: ' + error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-white font-sans text-neutral-900 rounded-xl overflow-hidden shadow-sm border border-neutral-200'>
      <header className='w-full flex items-center justify-between px-6 py-6 border-b border-neutral-100 bg-white'>
        <div className='w-24'></div>

        <div className='hidden sm:flex flex-col flex-1 max-w-lg mx-auto relative pt-4'>
          <div className='w-full relative h-0.5 bg-neutral-200 rounded-full mt-2 mb-4'>
            <div
              className='absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-in-out rounded-full flex items-center justify-end'
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            >
              <div className='w-2.5 h-2.5 bg-primary rounded-full translate-x-1/2'></div>
            </div>
          </div>

          <div className='w-full relative h-4'>
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              return (
                <div
                  key={step.id}
                  className='absolute transform -translate-x-1/2 top-0 whitespace-nowrap'
                  style={{ left: `${(index / (steps.length - 1)) * 100}%` }}
                >
                  <span
                    className={`text-[13px] transition-all duration-500 ${isActive ? 'font-bold text-neutral-900' : 'font-medium text-neutral-400'}`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className='w-24 flex justify-end'>
          <button
            onClick={() => router.push('/educator/courses')}
            className='text-neutral-400 hover:text-neutral-900 transition-colors'
          >
            <FontAwesomeIcon icon={faTimes} className='w-5 h-5' />
          </button>
        </div>
      </header>

      <main className='flex-1 flex flex-col items-center pt-12 pb-24 px-6 relative overflow-hidden bg-white'>
        <div className='w-full max-w-xl mb-8'>
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className='text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-2 transition-colors'
            >
              <FontAwesomeIcon icon={faArrowLeft} className='w-4 h-4' /> Back
            </button>
          )}
        </div>

        <div className='w-full max-w-xl'>
          {error && (
            <div className='mb-6 p-3 text-red-600 text-sm text-center bg-red-50 rounded-md border border-red-100'>
              {error}
            </div>
          )}

          <AnimatePresence mode='wait'>
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className='space-y-8'>
                  <div className='text-center sm:text-left'>
                    <h1 className='text-3xl font-bold tracking-tight mb-2'>
                      Create a new course
                    </h1>
                    <p className='text-neutral-500'>
                      What will your students be learning?
                    </p>
                  </div>

                  <div className='space-y-6'>
                    <div className='space-y-2'>
                      <label className='text-sm font-semibold text-neutral-900'>
                        Course Title
                      </label>
                      <input
                        type='text'
                        value={courseData.title}
                        onChange={(e) =>
                          setCourseData({
                            ...courseData,
                            title: e.target.value,
                          })
                        }
                        placeholder='e.g. The Complete Freelance Developer Guide'
                        className='w-full p-3.5 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors'
                      />
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold text-neutral-900'>
                        Description
                      </label>
                      <textarea
                        value={courseData.description}
                        onChange={(e) =>
                          setCourseData({
                            ...courseData,
                            description: e.target.value,
                          })
                        }
                        placeholder='Briefly describe what this course covers...'
                        rows={4}
                        className='w-full p-3.5 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors'
                      />
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-semibold text-neutral-900'>
                        Thumbnail Image
                      </label>
                      <div className='flex gap-4 items-start'>
                        {courseData.thumbnailUrl ? (
                          <img
                            src={courseData.thumbnailUrl}
                            alt='Thumbnail'
                            className='w-32 h-20 object-cover rounded-md border border-neutral-200 shrink-0'
                            onError={(e) => (e.target.style.display = 'none')}
                          />
                        ) : (
                          <div className='w-32 h-20 bg-neutral-50 border border-neutral-200 rounded-md flex items-center justify-center text-neutral-400 shrink-0'>
                            <FontAwesomeIcon icon={faImage} />
                          </div>
                        )}
                        <div className='flex-1'>
                          <label className='cursor-pointer inline-flex px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors'>
                            Upload Image
                            <input
                              type='file'
                              accept='image/*'
                              onChange={handleFileChange}
                              className='hidden'
                            />
                          </label>
                          <p className='text-xs text-neutral-500 mt-2'>
                            Recommended: 1280x720px (Max 2MB)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className='space-y-8'>
                  <div className='text-center sm:text-left'>
                    <h1 className='text-3xl font-bold tracking-tight mb-2'>
                      Build your curriculum
                    </h1>
                    <p className='text-neutral-500'>
                      Add lessons, videos, and content for your students.
                    </p>
                  </div>

                  <div className='space-y-3'>
                    {lessons.map((lesson, idx) => (
                      <div
                        key={idx}
                        className='flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl group shadow-sm hover:border-neutral-300 transition-colors'
                      >
                        <div className='flex items-center gap-4'>
                          <div className='w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 flex items-center justify-center font-bold text-sm'>
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className='font-semibold text-neutral-900'>
                              {lesson.title}
                            </h3>
                            <div className='flex gap-3 text-xs text-neutral-500 mt-1'>
                              {lesson.videoUrl && (
                                <span className='flex items-center gap-1'>
                                  <FontAwesomeIcon icon={faVideo} /> Video
                                </span>
                              )}
                              {lesson.content && (
                                <span className='flex items-center gap-1'>
                                  <FontAwesomeIcon icon={faAlignLeft} /> Text
                                  Content
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveLesson(idx)}
                          className='text-neutral-400 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100'
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    ))}

                    {lessons.length === 0 && !isAddingLesson && (
                      <div className='text-center py-12 border border-dashed border-neutral-300 rounded-xl bg-neutral-50'>
                        <p className='text-neutral-500 font-medium'>
                          No lessons added yet.
                        </p>
                      </div>
                    )}
                  </div>

                  {isAddingLesson ? (
                    <div className='p-6 border border-neutral-200 bg-neutral-50 rounded-xl space-y-5'>
                      <h3 className='font-bold text-neutral-900 border-b border-neutral-200 pb-2'>
                        New Lesson
                      </h3>
                      <div className='space-y-2'>
                        <label className='text-sm font-semibold text-neutral-900'>
                          Lesson Title
                        </label>
                        <input
                          type='text'
                          value={newLesson.title}
                          onChange={(e) =>
                            setNewLesson({
                              ...newLesson,
                              title: e.target.value,
                            })
                          }
                          placeholder='e.g. Introduction to Variables'
                          className='w-full p-3 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors'
                        />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-sm font-semibold text-neutral-900'>
                          Video URL (Optional)
                        </label>
                        <input
                          type='text'
                          value={newLesson.videoUrl}
                          onChange={(e) =>
                            setNewLesson({
                              ...newLesson,
                              videoUrl: e.target.value,
                            })
                          }
                          placeholder='e.g. https://youtube.com/watch?v=...'
                          className='w-full p-3 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors'
                        />
                      </div>
                      <div className='space-y-2'>
                        <label className='text-sm font-semibold text-neutral-900'>
                          Lesson Content (Optional)
                        </label>
                        <textarea
                          value={newLesson.content}
                          onChange={(e) =>
                            setNewLesson({
                              ...newLesson,
                              content: e.target.value,
                            })
                          }
                          placeholder='Write your lesson content here...'
                          rows={4}
                          className='w-full p-3 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors'
                        />
                      </div>
                      <div className='flex gap-3 justify-end pt-2'>
                        <button
                          onClick={() => setIsAddingLesson(false)}
                          className='px-5 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors'
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddLesson}
                          disabled={!newLesson.title}
                          className='px-5 py-2.5 text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors disabled:opacity-50'
                        >
                          Save Lesson
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingLesson(true)}
                      className='w-full py-4 border border-dashed border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 hover:bg-neutral-50 rounded-xl transition-all font-medium flex items-center justify-center gap-2'
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add New Lesson
                    </button>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className='space-y-8 text-center py-8'>
                  <div className='text-center'>
                    <h1 className='text-3xl font-bold tracking-tight mb-2'>
                      Ready to launch
                    </h1>
                    <p className='text-neutral-500'>
                      Review your course details and publish.
                    </p>
                  </div>

                  <div className='p-6 bg-neutral-50 rounded-xl border border-neutral-200 text-left space-y-4'>
                    <div>
                      <h3 className='text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-1'>
                        Course Title
                      </h3>
                      <p className='font-medium text-neutral-900 text-lg'>
                        {courseData.title}
                      </p>
                    </div>
                    <div>
                      <h3 className='text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-1'>
                        Total Curriculum
                      </h3>
                      <p className='font-medium text-neutral-900 text-lg'>
                        {lessons.length} Lessons
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className='mt-10 pt-6 border-t border-neutral-100 flex justify-end'>
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className='px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors'
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handlePublish}
                disabled={isSubmitting}
                className='px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-70 flex items-center gap-2'
              >
                {isSubmitting ? (
                  <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                ) : (
                  'Publish Course'
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
