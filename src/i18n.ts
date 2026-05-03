import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: { tools: "Tools", allTools: "All Tools", free: "100% Free" },
      home: {
        badge: "DargansPDF v2.0 is live",
        title1: "PDF Tools That",
        title2: "Actually Work.",
        subtitle: "{{count}} powerful tools to edit, convert, and secure your PDF.",
        cta1: "Try Free — No Signup",
        cta2: "Watch Demo",
        stats: { processed: "2M+ files processed", rating: "4.9★ rating", privacy: "GDPR compliant", security: "256-bit encryption" },
        toolsTitle: "Everything you need.",
        toolsSub: "Completely free, forever.",
        freeTitle: "100% Free.",
        freeSub: "No hidden fees. No premium tiers. Just tools.",
        footerText: "The completely free, elegant PDF toolsuite."
      }
    }
  },
  tr: {
    translation: {
      nav: { tools: "Araçlar", allTools: "Tüm Araçlar", free: "%100 Ücretsiz" },
      home: {
        badge: "DargansPDF v2.0 yayında",
        title1: "Gerçekten İşe Yarayan",
        title2: "PDF Araçları.",
        subtitle: "PDF'nizi düzenlemek, dönüştürmek ve güvenceye almak için {{count}} güçlü araç.",
        cta1: "Ücretsiz Dene — Kayıt Yok",
        cta2: "Demoyu İzle",
        stats: { processed: "2M+ dosya işlendi", rating: "4.9★ puan", privacy: "GDPR uyumlu", security: "256-bit şifreleme" },
        toolsTitle: "İhtiyacınız olan her şey.",
        toolsSub: "Tamamen ücretsiz, sonsuza dek.",
        freeTitle: "%100 Ücretsiz.",
        freeSub: "Gizli ücret yok. Premium seviye yok. Sadece araçlar.",
        footerText: "Tamamen ücretsiz, zarif PDF araç seti."
      }
    }
  },
  de: {
    translation: {
      nav: { tools: "Werkzeuge", allTools: "Alle Werkzeuge", free: "100% Kostenlos" },
      home: {
        badge: "DargansPDF v2.0 ist live",
        title1: "PDF-Tools, die",
        title2: "wirklich funktionieren.",
        subtitle: "{{count}} leistungsstarke Tools, um Ihre PDF zu bearbeiten, zu konvertieren und zu sichern.",
        cta1: "Kostenlos testen — Keine Anmeldung",
        cta2: "Demo ansehen",
        stats: { processed: "2M+ Dateien verarbeitet", rating: "4.9★ Bewertung", privacy: "DSGVO-konform", security: "256-Bit-Verschlüsselung" },
        toolsTitle: "Alles was Sie brauchen.",
        toolsSub: "Völlig kostenlos, für immer.",
        freeTitle: "100% Kostenlos.",
        freeSub: "Keine versteckten Gebühren. Keine Premium-Stufen. Nur Werkzeuge.",
        footerText: "Die komplett kostenlose, elegante PDF-Toolsuite."
      }
    }
  },
  ja: {
    translation: {
      nav: { tools: "ツール", allTools: "すべてのツール", free: "完全無料" },
      home: {
        badge: "DargansPDF v2.0 がライブ",
        title1: "本当に役立つ",
        title2: "PDFツール。",
        subtitle: "PDFを編集、変換、保護するための{{count}}の強力なツール。",
        cta1: "無料でお試し — 登録不要",
        cta2: "デモを見る",
        stats: { processed: "200万以上のファイル処理", rating: "4.9★ 評価", privacy: "GDPR 準拠", security: "256ビット暗号化" },
        toolsTitle: "必要なものすべて。",
        toolsSub: "完全無料、永遠に。",
        freeTitle: "完全無料。",
        freeSub: "隠された料金はありません。プレミアム層はありません。ツールのみです。",
        footerText: "完全無料のエレガントなPDFツールスイート。"
      }
    }
  },
  es: {
    translation: {
      nav: { tools: "Herramientas", allTools: "Todas las Herramientas", free: "100% Gratis" },
      home: {
        badge: "DargansPDF v2.0 está en vivo",
        title1: "Herramientas PDF que",
        title2: "realmente funcionan.",
        subtitle: "{{count}} herramientas poderosas para editar, convertir y asegurar su PDF.",
        cta1: "Pruébalo Gratis — Sin Registro",
        cta2: "Ver Demo",
        stats: { processed: "2M+ archivos procesados", rating: "4.9★ puntuación", privacy: "Cumple GDPR", security: "Cifrado 256-bit" },
        toolsTitle: "Todo lo que necesitas.",
        toolsSub: "Completamente gratis, para siempre.",
        freeTitle: "100% Gratis.",
        freeSub: "Sin tarifas ocultas. Sin niveles premium. Solo herramientas.",
        footerText: "El conjunto de herramientas PDF elegante y completamente gratuito."
      }
    }
  },
  it: {
    translation: {
      nav: { tools: "Strumenti", allTools: "Tutti gli Strumenti", free: "100% Gratis" },
      home: {
        badge: "DargansPDF v2.0 è online",
        title1: "Strumenti PDF che",
        title2: "funzionano davvero.",
        subtitle: "{{count}} potenti strumenti per modificare, convertire e proteggere i tuoi PDF.",
        cta1: "Prova Gratis — Nessuna Registrazione",
        cta2: "Guarda la Demo",
        stats: { processed: "2M+ file elaborati", rating: "4.9★ valutazione", privacy: "Conforme GDPR", security: "Crittografia 256-bit" },
        toolsTitle: "Tutto ciò di cui hai bisogno.",
        toolsSub: "Completamente gratis, per sempre.",
        freeTitle: "100% Gratis.",
        freeSub: "Nessun costo nascosto. Nessun livello premium. Solo strumenti.",
        footerText: "La suite di strumenti PDF elegante e completamente gratuita."
      }
    }
  },
  ru: {
    translation: {
      nav: { tools: "Инструменты", allTools: "Все инструменты", free: "100% Бесплатно" },
      home: {
        badge: "DargansPDF v2.0 запущен",
        title1: "PDF Инструменты, которые",
        title2: "реально работают.",
        subtitle: "{{count}} мощных инструментов для редактирования, конвертации и защиты PDF.",
        cta1: "Попробовать бесплатно — без регистрации",
        cta2: "Смотреть демо",
        stats: { processed: "2M+ файлов обработано", rating: "4.9★ рейтинг", privacy: "Соответствует GDPR", security: "256-битное шифрование" },
        toolsTitle: "Всё, что вам нужно.",
        toolsSub: "Абсолютно бесплатно, навсегда.",
        freeTitle: "100% Бесплатно.",
        freeSub: "Никаких скрытых платежей. Никаких премиум-уровней. Только инструменты.",
        footerText: "Полностью бесплатный и элегантный набор PDF-инструментов."
      }
    }
  },
  fr: {
    translation: {
      nav: { tools: "Outils", allTools: "Tous les Outils", free: "100% Gratuit" },
      home: {
        badge: "DargansPDF v2.0 est en ligne",
        title1: "Des Outils PDF qui",
        title2: "fonctionnent vraiment.",
        subtitle: "{{count}} outils puissants pour éditer, convertir et sécuriser votre PDF.",
        cta1: "Essai Gratuit — Sans Inscription",
        cta2: "Voir la Démo",
        stats: { processed: "2M+ fichiers traités", rating: "4.9★ avis", privacy: "Conforme RGPD", security: "Chiffrement 256-bit" },
        toolsTitle: "Tout ce dont vous avez besoin.",
        toolsSub: "Totalement gratuit, pour toujours.",
        freeTitle: "100% Gratuit.",
        freeSub: "Pas de frais cachés. Pas de niveaux premium. Juste des outils.",
        footerText: "La suite d'outils PDF élégante et totalement gratuite."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
