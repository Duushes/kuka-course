'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CourseProvider, useCourse } from '@/context/CourseContext';
import ProgressBar from '@/components/ProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Landing from '@/components/Landing';
import nextDynamic from 'next/dynamic';

const Module1 = nextDynamic(() => import('@/modules/Module1'), { ssr: false });
const Module2 = nextDynamic(() => import('@/modules/Module2'), { ssr: false });
const Module3 = nextDynamic(() => import('@/modules/Module3'), { ssr: false });
const Module4 = nextDynamic(() => import('@/modules/Module4'), { ssr: false });
const Module5 = nextDynamic(() => import('@/modules/Module5'), { ssr: false });
const Module6 = nextDynamic(() => import('@/modules/Module6'), { ssr: false });
const Module7 = nextDynamic(() => import('@/modules/Module7'), { ssr: false });
const Module8 = nextDynamic(() => import('@/modules/Module8'), { ssr: false });
const Module9 = nextDynamic(() => import('@/modules/Module9'), { ssr: false });
const Module10 = nextDynamic(() => import('@/modules/Module10'), { ssr: false });

const moduleComponents = [
  Landing,
  Module1,
  Module2,
  Module3,
  Module4,
  Module5,
  Module6,
  Module7,
  Module8,
  Module9,
  Module10,
];

const SCROLL_KEY = 'kuka-scroll-positions';

function CourseContent() {
  const { currentModule } = useCourse();
  const ModuleComponent = moduleComponents[currentModule] || Landing;

  // Restore scroll position on module change
  useEffect(() => {
    try {
      const positions = JSON.parse(localStorage.getItem(SCROLL_KEY) || '{}');
      const saved = positions[currentModule];
      if (saved !== undefined && saved > 0) {
        window.scrollTo(0, saved);
        // Retry if page content hasn't loaded yet (dynamic imports)
        const timer = setTimeout(() => {
          if (window.scrollY < saved - 10) {
            window.scrollTo(0, saved);
          }
        }, 400);
        return () => clearTimeout(timer);
      } else {
        window.scrollTo(0, 0);
      }
    } catch {
      window.scrollTo(0, 0);
    }
  }, [currentModule]);

  // Save scroll position on page close/refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        const positions = JSON.parse(localStorage.getItem(SCROLL_KEY) || '{}');
        positions[currentModule] = window.scrollY;
        localStorage.setItem(SCROLL_KEY, JSON.stringify(positions));
      } catch {}
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentModule]);

  return (
    <>
      <ProgressBar />
      <Header />
      <main className="min-h-[calc(100vh-8rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModule}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ModuleComponent />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default function CourseApp() {
  return (
    <CourseProvider>
      <CourseContent />
    </CourseProvider>
  );
}
