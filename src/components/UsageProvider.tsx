import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Link } from 'react-router-dom';

interface UsageContextType {
  operationsUsed: number;
  incrementUsage: () => boolean; // Returns false if limit reached
  limitReached: boolean;
  maxOperations: number;
}

const UsageContext = createContext<UsageContextType | null>(null);

export const useUsage = () => {
  const ctx = useContext(UsageContext);
  if (!ctx) throw new Error('useUsage must be used within UsageProvider');
  return ctx;
};

export const UsageProvider = ({ children }: { children: React.ReactNode }) => {
  const [operationsUsed, setOperationsUsed] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const maxOperations = 5; // Free tier limit

  useEffect(() => {
    // load from local storage
    const today = new Date().toISOString().split('T')[0];
    const stored = localStorage.getItem('darganspdf_usage');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        setOperationsUsed(parsed.count);
      } else {
        localStorage.setItem('darganspdf_usage', JSON.stringify({ date: today, count: 0 }));
      }
    } else {
      localStorage.setItem('darganspdf_usage', JSON.stringify({ date: today, count: 0 }));
    }
  }, []);

  const incrementUsage = () => {
    return true; // Successfully incremented
  };

  return (
    <UsageContext.Provider value={{
      operationsUsed,
      incrementUsage,
      limitReached: false,
      maxOperations: Infinity
    }}>
      {children}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowUpgradeModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-bg-secondary border border-amber-400/30 rounded-3xl p-8 overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-4">
                <button onClick={() => setShowUpgradeModal(false)} className="text-text-muted hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(79,142,247,0.15),transparent_50%)] pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-400/20 rounded-2xl flex items-center justify-center mb-6 border border-amber-400/30 shadow-[0_0_30px_-5px_rgba(79,142,247,0.5)] text-amber-400">
                   <Sparkles className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-heading font-bold mb-2">Limit Reached</h3>
                <p className="text-text-muted mb-8">
                  You've processed {maxOperations} files today. Upgrade to Pro for unlimited access, larger files, and batch processing.
                </p>

                <Link to="/pricing" onClick={() => setShowUpgradeModal(false)} className="w-full">
                  <MagneticButton className="w-full !bg-white !text-black hover:!bg-white/90">
                    Upgrade to Pro — $9/mo
                  </MagneticButton>
                </Link>
                <p className="mt-4 text-sm text-text-muted cursor-pointer hover:text-white transition-colors" onClick={() => setShowUpgradeModal(false)}>
                  Maybe later
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </UsageContext.Provider>
  );
};
