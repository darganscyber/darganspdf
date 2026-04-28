import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Play } from 'lucide-react';
import { AmbientOrbs } from '@/components/ui/BackgroundFx';
import { ALL_TOOLS } from '@/data/tools';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useTranslation } from 'react-i18next';

const WORDS = ["Merge", "Compress", "Convert", "Sign", "Protect"];

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <AmbientOrbs />
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-[100px] leading-[1.1] font-heading font-black tracking-tighter mb-6 text-white drop-shadow-2xl">
            {t('home.title1')} <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-teal bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(157,78,221,0.4)]">
              {t('home.title2')}
            </span>
          </h1>

          <div className="h-14 flex items-center justify-center gap-3 text-xl md:text-3xl text-text-muted mb-12 overflow-hidden font-light">
            20 powerful tools to 
            <div className="relative w-40 h-full flex items-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={WORDS[wordIndex]}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            pdf.
          </div>
        </motion.div>
      </section>

      {/* TOOLS GRID */}
      <section className="py-28 px-6 max-w-7xl mx-auto relative z-10" id="tools">
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-purple/20 blur-[100px] -z-10 rounded-full"></div>
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-4 tracking-tight drop-shadow-lg text-white">{t('home.toolsTitle')}</h2>
          <p className="text-text-muted text-2xl font-light">{t('home.toolsSub')}</p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
            hidden: {}
          }}
        >
          {ALL_TOOLS.map((tool) => (
            <motion.div
              key={tool.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
              }}
            >
              <Link 
                to={`/tools/${tool.id}`}
                className="group relative block h-full p-6 bg-bg-card/50 backdrop-blur-xl border border-border/80 hover:border-accent-purple/50 rounded-2xl transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[0_15px_40px_-15px_rgba(157,78,221,0.3)] overflow-hidden"
              >
                {/* Hover Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/0 to-accent-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex items-start justify-between mb-5 relative z-10">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-inner group-hover:scale-110 transition-transform duration-500",
                    tool.color, "bg-opacity-20"
                  )}>
                    <tool.icon className="w-7 h-7 text-white drop-shadow-md" />
                  </div>
                </div>

                <h3 className="font-heading font-bold text-xl mb-3 text-text-primary group-hover:text-white transition-colors relative z-10">
                  {tool.name}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed relative z-10 group-hover:text-text-muted/90">
                  {tool.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="py-24 border-y border-border/50 bg-bg-card/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(157,78,221,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-border/30 relative z-10">
          <div className="flex flex-col transform hover:scale-105 transition-transform">
            <span className="text-5xl font-heading font-black text-white mb-3 drop-shadow-[0_0_15px_rgba(157,78,221,0.3)]">20</span>
            <span className="text-text-muted text-sm font-mono tracking-widest uppercase">Tools</span>
          </div>
          <div className="flex flex-col transform hover:scale-105 transition-transform">
            <span className="text-5xl font-heading font-black text-white mb-3 drop-shadow-[0_0_15px_rgba(123,44,191,0.3)]">2.4M+</span>
            <span className="text-text-muted text-sm font-mono tracking-widest uppercase">Processed</span>
          </div>
          <div className="flex flex-col transform hover:scale-105 transition-transform">
            <span className="text-5xl font-heading font-black text-white mb-3 drop-shadow-[0_0_15px_rgba(199,125,255,0.3)]">190</span>
            <span className="text-text-muted text-sm font-mono tracking-widest uppercase">Countries</span>
          </div>
          <div className="flex flex-col transform hover:scale-105 transition-transform">
            <span className="text-5xl font-heading font-black text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">100%</span>
            <span className="text-text-muted text-sm font-mono tracking-widest uppercase">Free Apps</span>
          </div>
        </div>
      </section>

    </div>
  );
}
