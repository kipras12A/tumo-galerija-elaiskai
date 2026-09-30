const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const manifestPath = path.join(root, 'image-hosting.json');
const previous = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  : null;
const baseUrl = process.argv[2] || previous?.baseUrl;
if (!baseUrl || !/^https:\/\/raw\.githubusercontent\.com\/kipras12A\/tumo-galerija-elaiskai\/[a-f0-9]{40}\/assets$/.test(baseUrl)) {
  throw new Error('Pateikite viešą assets URL su 40 simbolių Git commit SHA.');
}

const full = fs.readFileSync(path.join(root, 'preview-local.html'), 'utf8');
const fragment = fs.readFileSync(path.join(root, 'HTML-BLOKAS-local.html'), 'utf8');
const files = [...full.matchAll(/src="assets\/([^"/]+)"/g)].map(match => match[1]);
if (files.length !== 6 || new Set(files).size !== 6) {
  throw new Error('Tikėtasi šešių skirtingų vietinių vaizdų.');
}
for (const file of files) {
  if (!fs.existsSync(path.join(root, 'assets', file))) throw new Error(`Trūksta vaizdo: ${file}`);
}
function hosted(html) {
  const result = html.replace(/src="assets\/([^"/]+)"/g, (_, file) => `src="${baseUrl}/${file}"`);
  const images = [...result.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]);
  if (images.length !== 6 || images.some(url => !url.startsWith(`${baseUrl}/`))) {
    throw new Error('Visų šešių vaizdų src turi būti vieši HTTPS adresai.');
  }
  return result;
}
fs.writeFileSync(path.join(root, 'newsletter.html'), hosted(full));
fs.writeFileSync(path.join(root, 'preview.html'), hosted(full));
fs.writeFileSync(path.join(root, 'HTML-BLOKAS.html'), hosted(fragment));
fs.writeFileSync(manifestPath, JSON.stringify({
  repository: 'https://github.com/kipras12A/tumo-galerija-elaiskai',
  baseUrl,
  images: files.map(file => ({file, url: `${baseUrl}/${file}`})),
  note: 'Vieši, prisijungimo nereikalaujantys vaizdai. URL pririšti prie konkretaus commit, kad išsiųsto laiško vaizdai nepasikeistų atnaujinus saugyklą.'
}, null, 2) + '\n');
console.log('Paruošti newsletter.html, preview.html ir HTML-BLOKAS.html su 6 viešais HTTPS vaizdų adresais.');
