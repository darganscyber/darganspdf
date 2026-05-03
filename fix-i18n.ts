import fs from 'fs';

const path = 'src/i18n.ts';
let content = fs.readFileSync(path, 'utf-8');

content = content.replace(/20 powerful tools/g, '{{count}} powerful tools');
content = content.replace(/20 güçlü/g, '{{count}} güçlü');
content = content.replace(/20 leistungsstarke/g, '{{count}} leistungsstarke');
content = content.replace(/20\u306e\u5f37\u529b\u306a/g, '{{count}}\u306e\u5f37\u529b\u306a'); // 20の強力な
content = content.replace(/20 herramientas/g, '{{count}} herramientas');
content = content.replace(/20 potenti/g, '{{count}} potenti');
content = content.replace(/20 мощных/g, '{{count}} мощных');
content = content.replace(/20 outils/g, '{{count}} outils');

fs.writeFileSync(path, content);
