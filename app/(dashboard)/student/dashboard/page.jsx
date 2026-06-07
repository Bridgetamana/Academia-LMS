'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [progressData, setProgressData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
              const uData = userDoc.data();
              setUser(uData);

              const activeAcademyId = uData.academies?.[0];
              if (activeAcademyId) {
                const coursesQuery = query(
                  collection(db, 'courses'), 
                  where('academyId', '==', activeAcademyId),
                  where('status', '==', 'published')
                );
                const coursesSnap = await getDocs(coursesQuery);
                const allCourses = coursesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                
                const progressQuery = query(collection(db, 'progress'), where('studentId', '==', currentUser.uid));
                const progressSnap = await getDocs(progressQuery);
                const progressMap = {};
                progressSnap.forEach(doc => {
                  progressMap[doc.data().courseId] = doc.data().completedLessons || {};
                });
                
                setProgressData(progressMap);
                setCourses(allCourses.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()));
              }
            }
          } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
          } finally {
            setIsLoading(false);
          }
        }
      });
    };
    
    fetchDashboardData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto font-sans">
      
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
          Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-neutral-500 mt-2 text-lg">Pick up where you left off and continue learning.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(n => (
            <div key={n} className="h-64 bg-white border border-neutral-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="bg-white border border-dashed border-neutral-300 rounded-2xl p-12 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faBookOpen} className="w-8 h-8 text-neutral-300" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No Courses Available</h3>
          <p className="text-neutral-500">Your educator hasn't published any courses yet. Check back later!</p>
        </div>
      ) : (
        <div className="space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-6">My Learning Path</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const completedMap = progressData[course.id] || {};
                const completedCount = Object.values(completedMap).filter(Boolean).length;
                const totalLessons = course.lessonCount || 0; 
                
                let statusText = "Not Started";
                let statusColor = "text-neutral-400";
                
                if (completedCount > 0) {
                  statusText = "In Progress";
                  statusColor = "text-yellow-500";
                  if (totalLessons > 0 && completedCount >= totalLessons) {
                    statusText = "Completed";
                    statusColor = "text-green-500";
                  }
                }

                return (
                <Link key={course.id} href={`/student/courses/${course.id}`} className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 transition-all flex flex-col h-full">
                  <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
                    {course.thumbnailUrl ? (
                      <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-300">
                        <FontAwesomeIcon icon={faBookOpen} size="3x" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
                        <FontAwesomeIcon icon={faPlayCircle} className="w-5 h-5 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-neutral-900 text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
                    <p className="text-sm text-neutral-500 line-clamp-2 flex-1">{course.description}</p>
                    
                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${statusColor}`}>{statusText}</span>
                      <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:underline underline-offset-4">
                        {statusText === 'Completed' ? 'Review Course' : 'Start Course'}
                      </span>
                    </div>
                  </div>
                </Link>
              )})}
            </div>
          </section>

        </div>
      )}

    </div>
  );
}
