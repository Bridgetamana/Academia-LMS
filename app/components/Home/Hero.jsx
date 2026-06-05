'use client';

import Image from 'next/image';
import HeroDashboard from '@/public/assets/images/hero-dashboard.png';
import { useRouter } from 'next/navigation';
import { Button } from '@base-ui/react';
import { motion } from 'framer-motion';

const Hero = () => {
  const router = useRouter();

  return (
    <section className='relative pt-14 lg:pt-20 pb-16 overflow-hidden flex flex-col items-center justify-center'>
      <div className='absolute inset-0 z-0 pointer-events-none flex justify-center'>
        <div className='absolute top-[-10%] w-200 h-125 bg-primary/10 rounded-[100%] blur-[120px] opacity-70' />
      </div>

      <div className='mx-auto max-w-250 px-4 sm:px-6 relative z-10 flex flex-col items-center text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border mb-8'
        >
          <span className='text-xs font-semibold tracking-wide uppercase text-text-main'>
            Introducing Academia 2.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className='text-[clamp(2rem,5vw,3.4rem)] font-serif font-bold text-text-main leading-[1.1] max-w-4xl mb-6'
        >
          Launch a premium learning academy <br className='hidden sm:block' />
          in minutes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className='text-[clamp(1rem,2vw,1.15rem)] text-text-muted max-w-2xl mb-10 leading-relaxed font-sans'
        >
          Built for educators, bootcamps, and modern schools. Give your students
          a distraction-free, deeply engaging platform they will love using.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className='flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto'
        >
          <Button
            onClick={() => router.push('/signup')}
            className='w-full sm:w-auto text-sm font-semibold text-white bg-primary hover:bg-primary-hover px-8 py-3.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer'
          >
            Start building for free
          </Button>
          <Button
            onClick={() => router.push('/demo')}
            className='w-full sm:w-auto text-sm font-semibold text-text-main bg-white border border-border hover:bg-surface px-8 py-3.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer'
          >
            Book a demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className='w-full max-w-4xl mx-auto relative'
        >
          <Image
            src={HeroDashboard}
            alt='Academia Dashboard Overview'
            className='w-full h-auto object-cover'
            priority
            quality={100}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
