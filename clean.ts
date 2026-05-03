import fs from 'fs';
['fix.ts', 'fix-colors.ts', 'fix-simple-colors.ts', 'fix-tools2.ts', 'clean-simple.ts', 'clean-imports.ts', 'clean-components.ts', 'cleanTools.ts', 'fix-i18n.ts'].forEach(f => {
  if(fs.existsSync(f)) fs.unlinkSync(f);
});
