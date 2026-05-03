import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Basic check if cookies are already accepted
    const hasConsented = localStorage.getItem('dargans_cookie_consent');
    if (!hasConsented) {
      // Small timeout to show it cleanly after load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('dargans_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-sm bg-bg-card/90 backdrop-blur-xl border border-amber-500/30 p-6 rounded-2xl shadow-[0_0_40px_rgba(147,51,234,0.2)] z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors"
      >
        <X size={18} />
      </button>
      <div>
        <h4 className="font-heading font-bold text-lg mb-1">We use cookies 🍪</h4>
        <p className="text-sm text-text-muted">
          We use strictly necessary cookies to make our site work. We do not track you or sell your data.
        </p>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={acceptCookies}
          className="flex-1 bg-amber-500/20 hover:bg-amber-500/40 border border-amber-500/50 text-white font-medium py-2 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
        >
          Sounds good
        </button>
      </div>
    </div>
  );
}
