import fs from 'fs';

function fixColors(filePath: string) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/accent-purple/g, 'amber-500');
    content = content.replace(/accent-blue/g, 'amber-400');
    content = content.replace(/accent-teal/g, 'amber-600');
    fs.writeFileSync(filePath, content);
  }
}

fixColors('src/components/Nav.tsx');
fixColors('src/components/LanguageSwitcher.tsx');
fixColors('src/components/CookieConsent.tsx');
fixColors('src/components/UsageProvider.tsx');
fixColors('src/components/ui/MagneticButton.tsx');
fixColors('src/pages/ToolPage.tsx');
