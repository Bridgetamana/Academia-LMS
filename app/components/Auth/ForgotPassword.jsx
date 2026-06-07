'use client';

import { useState } from 'react';
import Link from 'next/link';
import { resetPassword } from '@/app/_store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@base-ui/react';
import Image from 'next/image';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await resetPassword(email);

      if (result.success) {
        setIsSuccess(true);
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
          <div className='mb-10'>
            <h2 className='text-4xl font-bold text-text-main mb-3 font-sans'>
              Reset Password
            </h2>
            <p className='text-text-muted'>
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>
          </div>

          <AnimatePresence mode='wait'>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className='mb-6 p-3 text-red-600 text-sm bg-red-50 rounded-md border border-red-100'
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className='p-8 bg-gray-50 border border-border rounded-xl text-center shadow-sm'
            >
              <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-6 h-6 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-bold text-text-main mb-2'>
                Check your email
              </h3>
              <p className='text-sm text-text-muted mb-6'>
                We've sent a password reset link to{' '}
                <span className='font-semibold'>{email}</span>.
              </p>
              <Link href='/signin'>
                <Button className='w-full py-3.5 px-4 rounded-md text-sm font-medium text-text-main bg-white border border-border hover:bg-gray-50 transition-all active:scale-[0.99]'>
                  Return to Login
                </Button>
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-1'>
                <label className='text-sm text-text-main font-medium'>
                  Email
                </label>
                <input
                  type='email'
                  required
                  autoFocus
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className='w-full p-3 text-text-main bg-white rounded-md outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50'
                />
              </div>

              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full py-3.5 px-4 rounded-md text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.99] flex justify-center items-center mt-2'
              >
                {isSubmitting ? (
                  <span className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
                ) : (
                  'Send Reset Link'
                )}
              </Button>

              <div className='mt-6'>
                <Link
                  href='/signin'
                  className='text-sm text-primary underline decoration-primary hover:decoration-primary/70 underline-offset-4'
                >
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
