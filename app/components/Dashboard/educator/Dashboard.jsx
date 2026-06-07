'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBookOpen, 
  faUserGraduate, 
  faFolderOpen, 
  faPlus, 
  faArrowRight,
  faEnvelope,
  faCircleNotch
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [metrics, setMetrics] = useState({ students: 0, courses: 0, resources: 0 });
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const activeAcademyId = userDoc.data().academies?.[0];
              if (activeAcademyId) {
                const studentsQuery = query(
                  collection(db, 'users'), 
                  where('role', '==', 'student'), 
                  where('academies', 'array-contains', activeAcademyId)
                );
                const studentsSnap = await getDocs(studentsQuery);
                const allStudents = studentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                
                const coursesQuery = query(collection(db, 'courses'), where('academyId', '==', activeAcademyId));
                const coursesSnap = await getDocs(coursesQuery);
                let allCourses = coursesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
                allCourses = allCourses.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());

                let resourcesCount = 0;
                try {
                   const resourcesQuery = query(collection(db, 'resources'), where('academyId', '==', activeAcademyId));
                   const resSnap = await getDocs(resourcesQuery);
                   resourcesCount = resSnap.size;
                } catch(e) {
                }

                setMetrics({
                  students: allStudents.length,
                  courses: allCourses.length,
                  resources: resourcesCount
                });

                setRecentCourses(allCourses.slice(0, 4));
                
                const sortedStudents = allStudents.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
                setRecentStudents(sortedStudents.slice(0, 5));
              }
            }
          } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
          } finally {
            setIsLoading(false);
          }
        } else {
          router.push('/signin');
        }
      });
    };
    
    fetchDashboardData();
  }, [router]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 font-sans">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500 mt-1">Welcome back. Here's what's happening in your academy.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Total Students', value: metrics.students, icon: faUserGraduate, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Courses', value: metrics.courses, icon: faBookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Library Resources', value: metrics.resources, icon: faFolderOpen, color: 'text-orange-600', bg: 'bg-orange-50' }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${metric.bg} ${metric.color}`}>
              <FontAwesomeIcon icon={metric.icon} className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">{metric.label}</p>
              {isLoading ? (
                <div className="h-8 w-16 bg-neutral-200 animate-pulse rounded"></div>
              ) : (
                <h3 className="text-3xl font-bold text-neutral-900 leading-none">{metric.value}</h3>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <section>
            <h2 className="text-lg font-bold text-neutral-900 mb-4 tracking-tight">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/educator/courses/create" className="group bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl p-5 transition-all flex flex-col items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-primary group-hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Create Course</h3>
                  <p className="text-xs text-neutral-500 mt-1">Build a new curriculum</p>
                </div>
              </Link>
              <Link href="/educator/students" className="group bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl p-5 transition-all flex flex-col items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-primary group-hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Invite Student</h3>
                  <p className="text-xs text-neutral-500 mt-1">Send access emails</p>
                </div>
              </Link>
              <Link href="/educator/resources" className="group bg-white border border-neutral-200 hover:border-neutral-300 rounded-xl p-5 transition-all flex flex-col items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-primary group-hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faFolderOpen} />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">Upload File</h3>
                  <p className="text-xs text-neutral-500 mt-1">Add to your library</p>
                </div>
              </Link>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">Recent Courses</h2>
              <Link href="/educator/courses" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
                View all <FontAwesomeIcon icon={faArrowRight} className="ml-1 w-3 h-3" />
              </Link>
            </div>
            
            {isLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[1,2].map(n => <div key={n} className="h-48 bg-neutral-100 animate-pulse rounded-2xl border border-neutral-200"></div>)}
               </div>
            ) : recentCourses.length === 0 ? (
              <div className="bg-white border border-dashed border-neutral-300 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6 text-neutral-400" />
                </div>
                <h3 className="font-bold text-neutral-900 mb-1">No courses yet</h3>
                <p className="text-sm text-neutral-500 mb-6">Create your first course to start teaching.</p>
                <Link href="/educator/courses/create" className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors inline-block">
                  Create Course
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentCourses.map((course) => (
                  <Link key={course.id} href={`/educator/courses/${course.id}`} className="group block bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-300 transition-all h-full flex flex-col">
                    <div className="relative h-32 w-full bg-neutral-100 overflow-hidden">
                      {course.thumbnailUrl ? (
                        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300">
                          <FontAwesomeIcon icon={faBookOpen} size="2x" />
                        </div>
                      )}
                      <div className={`absolute top-3 left-3 backdrop-blur text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${course.status === 'published' ? 'bg-green-500/90 text-white' : 'bg-white/90 text-neutral-800'}`}>
                        {course.status || 'Draft'}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-neutral-900 text-base line-clamp-1 group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-xs text-neutral-500 mt-1 line-clamp-2 flex-1">{course.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

        </div>

        <div className="space-y-8">
          
          <section className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-neutral-900">Recently Enrolled</h2>
              <Link href="/educator/students" className="text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors">
                View all
              </Link>
            </div>
            
            <div className="p-2">
              {isLoading ? (
                <div className="p-4 flex justify-center">
                  <FontAwesomeIcon icon={faCircleNotch} className="animate-spin text-neutral-300 w-6 h-6" />
                </div>
              ) : recentStudents.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm font-medium text-neutral-900 mb-1">No students yet</p>
                  <p className="text-xs text-neutral-500">Invite students to see them here.</p>
                </div>
              ) : (
                <ul className="divide-y divide-neutral-100">
                  {recentStudents.map((student) => (
                    <li key={student.id}>
                      <div className="px-4 py-3 hover:bg-neutral-50 rounded-xl transition-colors flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                          {student.name ? student.name.charAt(0).toUpperCase() : student.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-neutral-900 truncate">{student.name || 'Invited Student'}</p>
                          <p className="text-xs text-neutral-500 truncate">{student.email}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

        </div>
      </div>

    </div>
  );
}
