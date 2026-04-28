import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const { t } = useTranslation();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-blue via-accent-purple to-accent-teal z-[100] origin-left shadow-[0_0_10px_rgba(157,78,221,0.5)]"
        style={{ scaleX }}
      />
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between backdrop-blur-xl border-b border-border bg-bg-primary/70 shadow-lg shadow-black/20">
        <Link to="/" className="text-3xl font-bold font-heading tracking-tight flex items-center gap-2 drop-shadow-[0_0_15px_rgba(157,78,221,0.3)]">
          <div>
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-teal bg-clip-text text-transparent">
              Dargans
            </span>
            <span className="text-text-primary">PDF</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link to="/#tools" className="px-5 py-2 rounded-xl text-white bg-accent-purple/10 border border-accent-purple/20 hover:bg-accent-purple/20 hover:border-accent-purple/40 hover:shadow-[0_0_20px_-5px_rgba(157,78,221,0.4)] transition-all duration-300">
            {t('nav.tools')}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </header>
    </>
  );
}
