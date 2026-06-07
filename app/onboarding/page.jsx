'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createAcademy } from '@/app/_store/academyStore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import LogoIcon from '@/app/components/common/LogoIcon';

const steps = [
  { id: 1, label: 'Basics' },
  { id: 2, label: 'Branding' },
  { id: 3, label: 'Operations' },
];

export default function Onboarding() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    primaryColor: '#000000',
    logoBase64: '',
    timezone: 'UTC',
    supportEmail: '',
  });

  const [previewLogo, setPreviewLogo] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFormData((prev) => ({ ...prev, supportEmail: currentUser.email }));
      } else {
        router.push('/signin');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit for Firestore document
        setError('Logo must be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, logoBase64: reader.result }));
        setPreviewLogo(reader.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && (!formData.name || !formData.subdomain)) {
      setError('Please fill out all fields.');
      return;
    }
    setError('');
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      const result = await createAcademy(user.uid, formData);

      if (result.success) {
        router.push('/admin/dashboard');
      } else {
        setError('Failed to create Academy. Please ensure Firebase Storage is initialized in your console.');
        setIsSubmitting(false);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="w-8 h-8 border-4 border-neutral-200 border-t-neutral-800 rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-neutral-900">
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-neutral-100">
        <div className="w-24">
           <LogoIcon />
        </div>

        <div className="hidden sm:flex flex-col flex-1 max-w-lg mx-auto relative pt-4">
          <div className="w-full relative h-0.5 bg-neutral-200 rounded-full mt-2 mb-4">
            <div 
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-in-out rounded-full flex items-center justify-end"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            >
              <div className="w-2.5 h-2.5 bg-primary rounded-full translate-x-1/2"></div>
            </div>
          </div>
          
          <div className="w-full relative h-4">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              
              return (
                <div 
                  key={step.id} 
                  className="absolute transform -translate-x-1/2 top-0 whitespace-nowrap"
                  style={{ left: `${(index / (steps.length - 1)) * 100}%` }}
                >
                  <span className={`text-[13px] transition-all duration-500 ${isActive ? 'font-bold text-neutral-900' : 'font-medium text-neutral-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-24 flex justify-end">
          <button onClick={() => getAuth().signOut()} className="text-neutral-400 hover:text-neutral-900 transition-colors">
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-12 pb-24 px-6 relative overflow-hidden">
        
        <div className="w-full max-w-xl mb-8">
          {currentStep > 1 && (
            <button onClick={handleBack} className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-2 transition-colors">
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" /> Back
            </button>
          )}
        </div>

        <div className="w-full max-w-xl">
          {error && (
            <div className="mb-6 p-3 text-red-600 text-sm text-center bg-red-50 rounded-md border border-red-100">
              {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Let's set up your Academy</h1>
                    <p className="text-neutral-500">What should we call your learning platform?</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-neutral-900">Academy Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. CodeMasters Bootcamp"
                        className="w-full p-3.5 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-neutral-900">Workspace URL</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-neutral-300 bg-neutral-50 text-neutral-500 sm:text-sm">
                          academia.com/
                        </span>
                        <input
                          type="text"
                          name="subdomain"
                          value={formData.subdomain}
                          onChange={handleInputChange}
                          placeholder="codemasters"
                          className="flex-1 min-w-0 block w-full p-3.5 bg-white border border-neutral-300 rounded-none rounded-r-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                        />
                      </div>
                      <p className="text-xs text-neutral-500 mt-1">This will be the web address your students visit.</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Make it yours</h1>
                    <p className="text-neutral-500">Upload your logo and pick your primary brand color.</p>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-neutral-900">Academy Logo</label>
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-xl border border-neutral-200 overflow-hidden flex items-center justify-center bg-neutral-50">
                          {previewLogo ? (
                            <img src={previewLogo} alt="Logo preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-neutral-300 text-xs text-center px-2">No logo</span>
                          )}
                        </div>
                        <label className="cursor-pointer px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium hover:bg-neutral-50 transition-colors flex items-center gap-2">
                          <FontAwesomeIcon icon={faCloudUploadAlt} />
                          Upload Image
                          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-neutral-900">Primary Color</label>
                      <div className="flex items-center gap-4">
                        <input
                          type="color"
                          name="primaryColor"
                          value={formData.primaryColor}
                          onChange={handleInputChange}
                          className="w-12 h-12 rounded-md cursor-pointer border border-neutral-300 p-0.5 bg-white"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            name="primaryColor"
                            value={formData.primaryColor}
                            onChange={handleInputChange}
                            className="w-32 p-2 text-sm bg-white border border-neutral-300 rounded-md outline-none focus:border-neutral-900"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500">Used for buttons and active states.</p>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Final details</h1>
                    <p className="text-neutral-500">How should students contact you, and what is your local time?</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-neutral-900">Support Email</label>
                      <input
                        type="email"
                        name="supportEmail"
                        value={formData.supportEmail}
                        onChange={handleInputChange}
                        placeholder="help@codemasters.com"
                        className="w-full p-3.5 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-neutral-900">Timezone</label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full p-3.5 bg-white border border-neutral-300 rounded-lg outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="UTC">UTC (Universal Time Coordinated)</option>
                        <option value="America/New_York">Eastern Time (US & Canada)</option>
                        <option value="America/Chicago">Central Time (US & Canada)</option>
                        <option value="America/Denver">Mountain Time (US & Canada)</option>
                        <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                        <option value="Europe/London">London</option>
                        <option value="Europe/Paris">Paris</option>
                        <option value="Asia/Dubai">Dubai</option>
                        <option value="Asia/Tokyo">Tokyo</option>
                        <option value="Australia/Sydney">Sydney</option>
                      </select>
                      <p className="text-xs text-neutral-500 mt-1">Used for scheduling deadlines and live sessions.</p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          <div className="mt-10 pt-6 border-t border-neutral-100 flex justify-end">
            {currentStep < steps.length ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-70 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  'Launch Academy'
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
