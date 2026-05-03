import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ja', label: '日本語' },
  { code: 'es', label: 'Español' },
  { code: 'it', label: 'Italiano' },
  { code: 'ru', label: 'Русский' },
  { code: 'fr', label: 'Français' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLang = languages.find(l => l.code === i18n.resolvedLanguage) || languages[0];

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-text-muted hover:text-white bg-bg-card/50 hover:bg-bg-card border border-border/50 hover:border-amber-500/50 transition-all duration-300"
      >
        <Globe size={16} />
        <span className="text-sm font-medium">{currentLang.label}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
          {languages.map((lng) => (
            <button
              key={lng.code}
              onClick={() => changeLanguage(lng.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-500/20 transition-colors ${i18n.resolvedLanguage === lng.code ? 'text-amber-600 font-bold' : 'text-text-primary'}`}
            >
              {lng.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
