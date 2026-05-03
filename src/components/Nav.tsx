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
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 z-[100] origin-left shadow-[0_0_10px_rgba(234,179,8,0.5)]"
        style={{ scaleX }}
      />
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between backdrop-blur-xl border-b border-border bg-bg-primary/70 shadow-lg shadow-black/20">
        <Link to="/" className="text-3xl font-bold font-heading tracking-tight flex items-center gap-2 drop-shadow-[0_0_15px_rgba(147,51,234,0.3)]">
          <div>
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
              Dargans
            </span>
            <span className="text-text-primary">PDF</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link to="/#tools" className="px-5 py-2 rounded-xl text-white bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_0_20px_-5px_rgba(147,51,234,0.4)] transition-all duration-300">
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
