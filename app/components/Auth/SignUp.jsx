'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleSignUp } from '@/app/_store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@base-ui/react';
import Image from 'next/image';

const SignUp = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'educator',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      setIsSubmitting(false);
      return;
    }

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const result = await handleSignUp(
        fullName,
        formData.email,
        formData.password,
        formData.role,
      );

      if (result.success) {
        setTimeout(() => router.push('/signin?registered=true'), 1000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex bg-white font-sans'>
      <div className='hidden lg:flex lg:w-5/12 relative bg-neutral-900'>
        <Image
          src='/assets/images/auth-bg-academia.png'
          alt='Academia'
          fill
          className='object-cover opacity-80'
          priority
        />

        <div className='absolute top-10 left-10 text-white flex items-center gap-2'>
          <Link href='/'>
            <div className='w-8 h-8 bg-primary flex items-center justify-center rounded-sm'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                className='text-white'
              >
                <path
                  d='M12 3L2 21h4.5l2.5-4.5h6l2.5 4.5H22L12 3zm0 5.5l2.5 4.5h-5L12 8.5z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      <div className='w-full lg:w-7/12 flex flex-col justify-center px-6 sm:px-16 lg:px-32 relative py-12 bg-white'>
        <div className='absolute top-8 left-6 lg:hidden'>
          <Link href='/'>
            <div className='w-8 h-8 bg-primary flex items-center justify-center rounded-sm'>
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                className='text-white'
              >
                <path
                  d='M12 3L2 21h4.5l2.5-4.5h6l2.5 4.5H22L12 3zm0 5.5l2.5 4.5h-5L12 8.5z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='w-full max-w-125 mx-auto'
        >
          <div className='text-center mb-10'>
            <h2 className='text-4xl font-bold text-text-main mb-3 font-sans'>
              Join Academia
            </h2>
            <p className='text-text-muted'>
              Already have an account?{' '}
              <Link
                href='/signin'
                className='text-primary underline decoration-primary hover:decoration-primary/70 underline-offset-4'
              >
                Login
              </Link>
            </p>
          </div>

          <AnimatePresence mode='wait'>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className='mb-6 p-3 text-red-600 text-sm text-center bg-red-50 rounded-md border border-red-100'
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label className='text-sm text-text-main font-medium'>
                  First name
                </label>
                <input
                  name='firstName'
                  type='text'
                  required
                  disabled={isSubmitting}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className='w-full p-3 text-text-main bg-white rounded-md outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50'
                />
              </div>
              <div className='space-y-1'>
                <label className='text-sm text-text-main font-medium'>
                  Last name
                </label>
                <input
                  name='lastName'
                  type='text'
                  required
                  disabled={isSubmitting}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className='w-full p-3 text-text-main bg-white rounded-md outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50'
                />
              </div>
            </div>

            <div className='space-y-1'>
              <label className='text-sm text-text-main font-medium'>
                Email
              </label>
              <input
                name='email'
                type='email'
                required
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleInputChange}
                className='w-full p-3 text-text-main bg-white rounded-md outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50'
              />
            </div>

            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <label className='text-sm text-text-main font-medium'>
                  Role
                </label>
              </div>
              <div className='relative'>
                <select
                  name='role'
                  required
                  disabled={isSubmitting}
                  value={formData.role}
                  onChange={handleInputChange}
                  className='w-full p-3 text-text-main bg-white rounded-md outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50 appearance-none cursor-pointer'
                >
                  <option value='educator'>Educator (Create an Academy)</option>
                  <option value='student'>Student (Join an Academy)</option>
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-text-muted'>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M19 9l-7 7-7-7'
                    ></path>
                  </svg>
                </div>
              </div>
              {formData.role === 'student' && (
                <p className='text-xs text-text-muted mt-1 leading-relaxed'>
                  * Note: Students are typically invited directly by their
                  instructors. If you were sent a link, please use that to sign
                  up.
                </p>
              )}
            </div>

            <div className='space-y-1'>
              <div className='flex items-center gap-2'>
                <label className='text-sm text-text-main font-medium'>
                  Password
                </label>
                <span className='text-xs text-text-muted'>(min. 6 char)</span>
              </div>
              <div className='relative'>
                <input
                  name='password'
                  type={isPasswordHidden ? 'password' : 'text'}
                  required
                  disabled={isSubmitting}
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full p-3 text-text-main bg-white rounded-md outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50'
                />
                <button
                  type='button'
                  onClick={() => setPasswordHidden(!isPasswordHidden)}
                  disabled={isSubmitting}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main'
                >
                  {isPasswordHidden ? (
                    <FontAwesomeIcon icon={faEye} className='w-4 h-4' />
                  ) : (
                    <FontAwesomeIcon icon={faEye} Off className='w-4 h-4' />
                  )}
                </button>
              </div>
            </div>

            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full py-3.5 px-4 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.99] flex justify-center items-center mt-2'
            >
              {isSubmitting ? (
                <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
              ) : (
                'Join'
              )}
            </Button>

            <p className='text-[13px] text-text-muted text-center mt-6 leading-relaxed px-4'>
              By joining, you agree to the Terms and Privacy Policy.
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
