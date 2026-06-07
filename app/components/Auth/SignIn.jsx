'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleSignIn } from '@/app/_store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@base-ui/react';
import Image from 'next/image';
import LogoIcon from '@/app/components/common/LogoIcon';

const SignIn = () => {
  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await handleSignIn(formData.email, formData.password);

      if (result.success) {
        let redirectUser = '/user/dashboard';
        if (result.user.role === 'educator') {
          if (!result.user.academies || result.user.academies.length === 0) {
            redirectUser = '/onboarding';
          } else {
            redirectUser = '/admin/dashboard';
          }
        }

        setTimeout(() => {
          router.push(redirectUser);
        }, 200);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Error signing in:', err);
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
            <LogoIcon />
          </Link>
        </div>
      </div>

      <div className='w-full lg:w-7/12 flex flex-col justify-center px-6 sm:px-16 lg:px-32 relative py-12 bg-white'>
        <div className='absolute top-8 left-6 lg:hidden'>
          <Link href='/'>
            <LogoIcon />
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
              Login
            </h2>
            <p className='text-text-muted'>Welcome back.</p>
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
            <div className='space-y-1'>
              <label className='text-sm text-text-main font-medium'>
                Email
              </label>
              <input
                name='email'
                type='email'
                required
                autoFocus
                disabled={isSubmitting}
                value={formData.email}
                onChange={handleInputChange}
                className='w-full p-3 text-text-main bg-white rounded-md outline-none border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors disabled:opacity-50'
              />
            </div>

            <div className='space-y-1'>
              <div className='flex justify-between items-center mb-1'>
                <label className='text-sm text-text-main font-medium'>
                  Password
                </label>
                <Link
                  href='/forgotpassword'
                  className='text-sm text-primary underline decoration-primary hover:decoration-primary/70 underline-offset-4'
                >
                  Forgot your password?
                </Link>
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
                    <FontAwesomeIcon icon={faEyeSlash} className='w-4 h-4' />
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
                'Login'
              )}
            </Button>

            <p className='text-[14px] text-text-main text-center mt-6'>
              Don't have an account?{' '}
              <Link
                href='/signup'
                className='text-primary underline decoration-primary hover:decoration-primary/70 underline-offset-4'
              >
                Join Academia
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;
