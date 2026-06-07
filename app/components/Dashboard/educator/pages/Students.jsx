'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEnvelope, faUserCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '@/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import InviteStudentModal from '../InviteStudentModal';
import { removeStudentFromAcademy } from '@/app/actions/studentManagement';

const Students = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'enrolled' | 'pending'
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [academyData, setAcademyData] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().academies?.length > 0) {
            const currentAcademyId = userDoc.data().academies[0];
            
            const academyDoc = await getDoc(doc(db, 'academies', currentAcademyId));
            if (academyDoc.exists()) {
              setAcademyData({ id: currentAcademyId, ...academyDoc.data() });
            }

            await fetchData(currentAcademyId);
          }
        } catch (error) {
          console.error("Failed to load data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async (academyId) => {
    try {
      const studentsQ = query(
        collection(db, 'users'), 
        where('role', '==', 'student'),
        where('academies', 'array-contains', academyId)
      );
      const studentsSnapshot = await getDocs(studentsQ);
      const studentsList = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEnrolledStudents(studentsList);

      const invitesQ = query(
        collection(db, 'invitations'),
        where('academyId', '==', academyId),
        where('status', '==', 'pending')
      );
      const invitesSnapshot = await getDocs(invitesQ);
      const invitesList = invitesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingInvites(invitesList);

    } catch (error) {
      console.error("Failed to fetch students/invites:", error);
    }
  };

  const handleInviteSuccess = (newInvite) => {
    setPendingInvites([...pendingInvites, newInvite]);
  };

  const handleRemove = async (studentId, isPending) => {
    if (!confirm('Are you sure you want to remove this student?')) return;
    
    setIsLoading(true);
    const result = await removeStudentFromAcademy(studentId, academyData.id, isPending);
    
    if (result.success) {
      if (isPending) {
        setPendingInvites(pendingInvites.filter(i => i.id !== studentId));
      } else {
        setEnrolledStudents(enrolledStudents.filter(s => s.id !== studentId));
      }
    } else {
      alert('Failed to remove student: ' + result.error);
    }
    setIsLoading(false);
  };

  // Filter Data
  const getDisplayData = () => {
    let data = [];
    if (activeTab === 'enrolled') {
      data = enrolledStudents.map(s => ({ ...s, type: 'enrolled' }));
    } else if (activeTab === 'pending') {
      data = pendingInvites.map(i => ({ ...i, type: 'pending' }));
    } else {
      data = [
        ...enrolledStudents.map(s => ({ ...s, type: 'enrolled' })),
        ...pendingInvites.map(i => ({ ...i, type: 'pending' }))
      ];
    }

    if (searchTerm) {
      data = data.filter(item => 
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return data.sort((a, b) => {
      if (a.type === 'enrolled' && b.type === 'pending') return -1;
      if (a.type === 'pending' && b.type === 'enrolled') return 1;
      return 0;
    });
  };

  const displayData = getDisplayData();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <section className='flex flex-col gap-6 h-full'>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className='text-2xl font-bold text-neutral-900'>Students</h1>
            <p className='text-neutral-500 text-sm mt-1'>Manage your enrolled students and track invitations.</p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className='flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-sm'
          >
            <FontAwesomeIcon icon={faPlus} />
            Invite Student
          </button>
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-2 rounded-xl shadow-sm border border-neutral-100'>
          
          <div className='flex items-center p-1 bg-neutral-50 rounded-lg w-full sm:w-auto'>
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex-1 sm:flex-none ${activeTab === 'all' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('enrolled')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex-1 sm:flex-none ${activeTab === 'enrolled' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              Enrolled ({enrolledStudents.length})
            </button>
            <button 
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all flex-1 sm:flex-none ${activeTab === 'pending' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              Pending ({pendingInvites.length})
            </button>
          </div>

          <div className='relative w-full sm:w-64 px-2 sm:px-0 sm:pr-2 pb-2 sm:pb-0'>
            <div className='absolute inset-y-0 left-0 sm:left-2 flex items-center pl-3 pointer-events-none pb-2 sm:pb-0'>
              <svg className='w-4 h-4 text-neutral-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'/>
              </svg>
            </div>
            <input
              type='search'
              className='block w-full p-2 pl-10 text-sm text-neutral-900 border border-neutral-200 rounded-lg bg-neutral-50 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all'
              placeholder='Search students...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className='bg-white border border-neutral-100 rounded-xl shadow-sm overflow-hidden flex-1'>
          <div className='overflow-x-auto h-full'>
            <table className='w-full text-sm text-left text-neutral-500'>
              <thead className='text-xs text-neutral-500 uppercase bg-neutral-50/50 border-b border-neutral-100'>
                <tr>
                  <th scope='col' className='px-6 py-4 font-semibold'>Student</th>
                  <th scope='col' className='px-6 py-4 font-semibold'>Status</th>
                  <th scope='col' className='px-6 py-4 font-semibold hidden sm:table-cell'>Added Date</th>
                  <th scope='col' className='px-6 py-4 font-semibold text-right'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mb-3">
                          <FontAwesomeIcon icon={faEnvelope} className="text-neutral-400 text-xl" />
                        </div>
                        <h3 className="text-neutral-900 font-medium mb-1">No students found</h3>
                        <p className="text-neutral-500 text-sm">Get started by inviting your first student to {academyData?.name || 'your academy'}.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  displayData.map((item) => (
                    <tr key={item.id} className='bg-white border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors'>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <img 
                            src={item.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${item.name || item.email}`} 
                            alt="avatar" 
                            className="w-8 h-8 rounded-full border border-neutral-200"
                          />
                          <div className='flex flex-col'>
                            <span className='font-medium text-neutral-900'>
                              {item.type === 'enrolled' ? item.name : 'Awaiting Signup...'}
                            </span>
                            <span className='text-xs text-neutral-500'>{item.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        {item.type === 'enrolled' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <FontAwesomeIcon icon={faUserCheck} className="w-3 h-3" />
                            Enrolled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                            <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className='px-6 py-4 hidden sm:table-cell text-neutral-400'>
                        {new Date(item.createdAt || item.invitedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        {item.type === 'pending' ? (
                          <div className='flex gap-4 justify-end'>
                            <button className="text-primary hover:text-primary-dark font-medium text-sm transition-colors">
                              Resend
                            </button>
                            <button 
                              onClick={() => handleRemove(item.id, true)}
                              className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleRemove(item.id, false)}
                            className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <InviteStudentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          academyId={academyData?.id}
          academyName={academyData?.name || 'the Academy'}
          onInviteSuccess={handleInviteSuccess}
        />
      </section>
    </>
  );
};

export default Students;
