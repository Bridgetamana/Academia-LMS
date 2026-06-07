'use client';

import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function StudentSettings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const uData = userDoc.data();
            setUser({ id: currentUser.uid, ...uData });
            setFormData({
              name: uData.name || '',
              email: uData.email || '',
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    setMessage('');

    try {
      await updateDoc(doc(db, 'users', user.id), {
        name: formData.name
      });
      setMessage('Profile updated successfully.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to update profile.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push('/signin');
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="h-8 w-48 bg-neutral-200 animate-pulse rounded mb-8"></div>
        <div className="h-64 bg-white border border-neutral-200 rounded-2xl animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto font-sans">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Account Settings</h1>
        <p className="text-neutral-500 mt-1">Manage your personal profile.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden mb-8">
        <div className="p-6 sm:p-8">
          <h2 className="text-lg font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Personal Information</h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            
            {message && (
              <div className="p-4 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-100">
                {message}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-900">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-900">Email Address <span className="text-neutral-400 font-normal ml-1">(Read Only)</span></label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 text-neutral-500 rounded-lg outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-70 flex items-center gap-2"
              >
                {isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white border border-red-200 rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-lg font-bold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-neutral-500 mb-6">Log out of your active session on this device.</p>
          
          <button 
            onClick={handleLogout}
            className="px-5 py-2.5 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Log Out
          </button>
        </div>
      </div>

    </div>
  );
}
