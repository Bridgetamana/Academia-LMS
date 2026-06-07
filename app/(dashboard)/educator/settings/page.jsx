'use client';

import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { updateAcademy } from '@/app/_store/academyStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faSignOutAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [academyId, setAcademyId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [educatorName, setEducatorName] = useState('');
  const [academyData, setAcademyData] = useState({
    name: '',
    subdomain: '',
    primaryColor: '#000000',
    logoUrl: '',
    logoBase64: null 
  });

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchData(currentUser.uid);
    } else {
      router.push('/signin');
    }
  }, [router]);

  const fetchData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const uData = userDoc.data();
        setEducatorName(uData.name || '');
        
        if (uData.academies && uData.academies.length > 0) {
          const actId = uData.academies[0];
          setAcademyId(actId);
          const acaDoc = await getDoc(doc(db, 'academies', actId));
          if (acaDoc.exists()) {
            const aData = acaDoc.data();
            setAcademyData({
              name: aData.name || '',
              subdomain: aData.subdomain || '',
              primaryColor: aData.primaryColor || '#000000',
              logoUrl: aData.logoUrl || '',
              logoBase64: null
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { 
        setMessage('Logo must be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAcademyData((prev) => ({ ...prev, logoBase64: reader.result, logoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    
    try {
      if (user) {
        await updateDoc(doc(db, 'users', user.uid), { name: educatorName });
      }

      if (academyId) {
        const payload = {
          name: academyData.name,
          subdomain: academyData.subdomain,
          primaryColor: academyData.primaryColor,
        };
        if (academyData.logoBase64) {
          payload.logoBase64 = academyData.logoBase64;
        }
        await updateAcademy(academyId, payload);
      }

      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8 animate-pulse space-y-8">
        <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
        <div className="h-64 bg-white rounded-2xl border border-neutral-200"></div>
        <div className="h-64 bg-white rounded-2xl border border-neutral-200"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-500 mt-1">Manage your academy details and profile.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
        >
          <FontAwesomeIcon icon={faSave} /> {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`p-4 mb-6 rounded-lg text-sm font-medium ${message.includes('success') ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          {message}
        </div>
      )}

      <div className="space-y-8">
        <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-neutral-100 bg-neutral-50/50">
            <h2 className="text-lg font-bold text-neutral-900">Academy Details</h2>
            <p className="text-sm text-neutral-500">Update your school's branding and URL.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900">Academy Name</label>
              <input
                type="text"
                value={academyData.name}
                onChange={(e) => setAcademyData({...academyData, name: e.target.value})}
                className="w-full p-3 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors max-w-md block"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900">Workspace URL</label>
              <div className="flex max-w-md">
                <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-neutral-300 bg-neutral-50 text-neutral-500 sm:text-sm">
                  academia.com/
                </span>
                <input
                  type="text"
                  value={academyData.subdomain}
                  onChange={(e) => setAcademyData({...academyData, subdomain: e.target.value})}
                  className="flex-1 min-w-0 block w-full p-3 bg-white border border-neutral-300 rounded-none rounded-r-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-neutral-900">Academy Logo</label>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-xl border border-neutral-200 overflow-hidden flex items-center justify-center bg-neutral-50">
                  {academyData.logoUrl ? (
                    <img src={academyData.logoUrl} alt="Logo preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-neutral-300 text-xs text-center px-2">No logo</span>
                  )}
                </div>
                <div>
                  <label className="cursor-pointer px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors inline-flex items-center gap-2">
                    <FontAwesomeIcon icon={faCloudUploadAlt} />
                    Change Logo
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  <p className="text-xs text-neutral-500 mt-2">Recommended: 256x256px (Max 1MB)</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900">Primary Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={academyData.primaryColor}
                  onChange={(e) => setAcademyData({...academyData, primaryColor: e.target.value})}
                  className="w-10 h-10 rounded-md cursor-pointer border border-neutral-300 p-0.5 bg-white"
                />
                <input
                  type="text"
                  value={academyData.primaryColor}
                  onChange={(e) => setAcademyData({...academyData, primaryColor: e.target.value})}
                  className="w-28 p-2 text-sm bg-white border border-neutral-300 rounded-md outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-neutral-100 bg-neutral-50/50">
            <h2 className="text-lg font-bold text-neutral-900">Educator Profile</h2>
            <p className="text-sm text-neutral-500">Your personal details.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900">Full Name</label>
              <input
                type="text"
                value={educatorName}
                onChange={(e) => setEducatorName(e.target.value)}
                className="w-full p-3 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors max-w-md block"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
                Email Address <span className="text-[10px] uppercase bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded font-bold tracking-wider">Read Only</span>
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full p-3 bg-neutral-50 border border-neutral-200 text-neutral-500 rounded-lg outline-none cursor-not-allowed max-w-md block"
              />
              <p className="text-xs text-neutral-500">Contact support to change your login email.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm">
           <div className="px-6 py-5 border-b border-red-100 bg-red-50/30">
            <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-neutral-900">Log out of your account</h3>
              <p className="text-sm text-neutral-500">You will be required to sign in again.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-5 py-2 border border-red-200 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
