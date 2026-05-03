import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Play, Star, Quote } from 'lucide-react';
import { AmbientOrbs } from '@/components/ui/BackgroundFx';
import { ALL_TOOLS } from '@/data/tools';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useTranslation } from 'react-i18next';

const TESTIMONIALS = [
  {
    target: "Amazing Design",
    author: "Elena R., Product Manager",
    text: "Who made this design?! It absolutely blew my mind. Not only does it look visually stunning, but the tools work 100% reliably completely in my browser. Completely redefined how I manage PDFs daily.",
    rating: 5
  },
  {
    target: "Flawless & Free",
    author: "David M., Freelancer",
    text: "Finally, a PDF toolkit that isn't loaded with paywalls or hidden limits. Merging, extracting, rotating—everything is instant and flawless. Easily the best PDF utility out there.",
    rating: 5
  },
  {
    target: "Fast & Secure",
    author: "Sarah J., Student",
    text: "I love that my files never leave my computer. Everything processes instantly. This site is brilliant securely editing and converting documents without any compromise on quality.",
    rating: 5
  }
];

export default function Home() {
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

  return (
    <div className="w-full relative bg-bg-primary overflow-hidden">
      {/* Background Effect layer for true Atmospheric feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.08),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(245,158,11,0.05),transparent_50%)] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <AmbientOrbs />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-mono tracking-widest uppercase text-white/70 mb-8 overflow-hidden relative">
             <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_3s_infinite]" />
             <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
             100% Free & Local Processing
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-[110px] leading-[0.95] font-heading font-black tracking-tighter mb-8 text-white drop-shadow-2xl mix-blend-plus-lighter">
            {t('home.title1')} <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]">
              {t('home.title2')}
            </span>
          </h1>

          <div className="h-auto flex items-center justify-center gap-3 text-xl md:text-2xl text-text-muted mb-14 font-light max-w-3xl mx-auto">
            {t('home.subtitle', { count: ALL_TOOLS.length })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#tools">
              <MagneticButton className="relative group !bg-transparent !text-white border-0 !p-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 blur-xl opacity-40 group-hover:opacity-70 group-hover:blur-2xl transition-all duration-700 group-hover:scale-110"></div>
                <div className="relative z-10 bg-black/50 backdrop-blur-xl border border-white/10 hover:border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full px-12 py-5 flex items-center justify-center gap-4 transition-all duration-500 overflow-hidden isolate">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-400/20 to-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <span className="font-heading font-bold text-lg tracking-widest uppercase">Explore Tools</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-500">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                </div>
              </MagneticButton>
            </a>
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="py-16 border-y border-white/5 bg-black/20 backdrop-blur-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/5 relative z-10">
          {[
            { value: ALL_TOOLS.length, label: "Premium Tools" },
            { value: "0", label: "Files Uploaded (Local)" },
            { value: "100%", label: "Secure & Private" },
            { value: "Free", label: "No Hidden Costs" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col group cursor-default">
              <span className="text-4xl md:text-5xl font-heading font-black text-white/90 mb-2 group-hover:text-amber-400 transition-colors duration-500">{stat.value}</span>
              <span className="text-text-muted text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10" id="tools">
        <div className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] -z-10 rounded-full"></div>
          <h2 className="text-5xl md:text-7xl font-heading font-black mb-6 tracking-tighter text-white">{t('home.toolsTitle')}</h2>
          <p className="text-text-muted/80 text-xl md:text-2xl font-light max-w-2xl mx-auto">{t('home.toolsSub')}</p>
        </div>

        <div className="space-y-32">
          {['Core PDF Tools', 'Conversion Tools', 'Manage Tools'].map((category) => {
            const categoryTools = ALL_TOOLS.filter(t => t.category === category);
            if (categoryTools.length === 0) return null;
            return (
              <div key={category} className="relative">
                <div className="flex items-center gap-6 mb-12">
                  <h3 className="text-2xl md:text-4xl font-heading font-black text-white/90 tracking-tight">
                    {category}
                  </h3>
                  <div className="h-[1px] bg-gradient-to-r from-border to-transparent flex-1"></div>
                </div>
                
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.08 } },
                    hidden: {}
                  }}
                >
                  {categoryTools.map((tool) => (
                    <motion.div
                      key={tool.id}
                      variants={{
                        hidden: { opacity: 0, y: 40, scale: 0.95 },
                        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
                      }}
                    >
                      <Link 
                        to={`/tools/${tool.id}`}
                        className="group flex flex-col h-full bg-[#111111] border border-white/5 hover:border-amber-500/30 rounded-[28px] p-7 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                      >
                        {/* Glow Behind Icon */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:bg-amber-500/20 transition-colors duration-500"></div>

                        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all duration-500 shadow-lg relative z-10">
                          <tool.icon className="w-6 h-6 text-white/80 group-hover:text-amber-400 transition-colors" />
                        </div>

                        <h3 className="font-heading font-bold text-2xl mb-3 text-white/90 group-hover:text-white transition-colors tracking-tight relative z-10">
                          {tool.name}
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed relative z-10 font-normal">
                          {tool.description}
                        </p>
                        
                        <div className="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-widest">
                          Try Tool <span className="text-lg leading-none">→</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/3">
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tighter text-white leading-tight">
              Loved by <br /> professionals.
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Experience a sophisticated toolkit designed meticulously to enhance your daily PDF workflow without comprising your privacy.
            </p>
            <div className="flex items-center gap-2 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-white font-bold ml-2">5.0 / 5</span>
            </div>
            <p className="text-sm text-text-muted mt-2">Based on over 10,000+ local users.</p>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className={cn("bg-[#111111] border border-white/5 p-8 rounded-[28px] relative", idx === 2 ? "md:col-span-2" : "")}>
                <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5" />
                <h4 className="text-xl font-heading font-bold text-white mb-4">{t.target}</h4>
                <p className="text-text-muted leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm font-mono uppercase tracking-wider text-amber-500/80">{t.author}</span>
                  <div className="flex gap-1">
                     {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                     ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
