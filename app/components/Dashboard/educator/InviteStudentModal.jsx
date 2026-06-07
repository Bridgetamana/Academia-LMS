'use client';

import { useState } from 'react';
import { db } from '@/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { sendInviteEmail } from '@/app/actions/sendInvite';

const InviteStudentModal = ({ isOpen, onClose, academyId, academyName, onInviteSuccess }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!email || !academyId) return;

    setIsLoading(true);
    setError(null);

    try {
      // 1. Check if an invitation already exists for this email and academy
      const q = query(
        collection(db, 'invitations'), 
        where('email', '==', email),
        where('academyId', '==', academyId)
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        throw new Error('An invitation has already been sent to this email for this Academy.');
      }

      // 2. Add invitation to Firestore
      const inviteData = {
        email: email.toLowerCase(),
        academyId,
        status: 'pending',
        invitedAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, 'invitations'), inviteData);

      // 3. Trigger Server Action to send email
      const emailResult = await sendInviteEmail(email, academyName);

      if (!emailResult.success) {
        throw new Error('Invitation saved, but failed to send email: ' + emailResult.error);
      }

      onInviteSuccess({ id: docRef.id, ...inviteData });
      setEmail('');
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-900/60 z-50 p-4'>
      <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-xl'>
        <h2 className='text-xl font-bold text-neutral-900 mb-2'>Invite Student</h2>
        <p className='text-sm text-neutral-500 mb-6'>
          Send an email invitation allowing this student to sign up and access {academyName}.
        </p>

        {error && (
          <div className='bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100'>
            {error}
          </div>
        )}

        <form onSubmit={handleInvite}>
          <div className='mb-6'>
            <label className='block text-sm font-medium text-neutral-700 mb-1.5'>
              Student Email Address
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all'
              placeholder='student@example.com'
              required
              disabled={isLoading}
            />
          </div>

          <div className='flex gap-3 justify-end'>
            <button
              type='button'
              onClick={onClose}
              disabled={isLoading}
              className='px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isLoading || !email}
              className='px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Invitation'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteStudentModal;
