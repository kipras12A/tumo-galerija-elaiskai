const fs = require('node:fs');
const path = require('node:path');
const folder = path.join(__dirname, '01-painting-and-sculpture-en');
const english = require('./english.json');
const decode = value => value.replace(/&amp;/g, '&');
const read = file => fs.readFileSync(path.join(folder, file), 'utf8');

async function main() {
  const first = path.join(__dirname, '01-tapyba-ir-skulptura');
  const html = read('newsletter.html');
  if (html !== read('preview.html') || !html.includes('<html lang="en"')) throw new Error('Preview or language mismatch.');
  const images = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => decode(match[1]));
  const originals = [...fs.readFileSync(path.join(first, 'newsletter.html'), 'utf8').matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => decode(match[1]));
  if (images.length !== 9 || JSON.stringify(images) !== JSON.stringify(originals)) throw new Error('English artwork images must match the first Lithuanian newsletter.');
  const forbidden = /Nauji kūriniai|Peržiūrėti|PARDUOTA|Užupio g\.|Drobė|Akrilas|Klausykla Nr|tumogalerija\.lt\/en\/en\/|src="assets\//;
  for (const file of ['newsletter.html', 'HTML-BLOKAS.html', 'newsletter.txt']) {
    const content = read(file);
    if (forbidden.test(content)) throw new Error(`Untranslated text or invalid URL: ${file}`);
    if ((file.endsWith('.html') && !content.includes('View all sculptures')) || !content.includes('en/collections/migle-jasauske')) throw new Error('Confessional collection CTA missing.');
  }
  const links = new Set([...html.matchAll(/href="(https:\/\/tumogalerija.lt\/[^"]*)"/g)].map(match => decode(match[1])));
  if (links.size !== Object.values(english.urls).length || [...links].some(link => !link.startsWith('https://tumogalerija.lt/en/'))) throw new Error('Not all storefront links are English.');
  const campaign = JSON.parse(read('campaign.json'));
  if (campaign.artworkCount !== 8 || campaign.subject !== english.subject || campaign.preheader !== english.preheader) throw new Error('Campaign metadata mismatch.');
  const results = await Promise.all([...links, ...images].map(async url => {
    const response = await fetch(url, {credentials: 'omit', signal: AbortSignal.timeout(30000)});
    const type = response.headers.get('content-type') || '';
    const bytes = (await response.arrayBuffer()).byteLength;
    if (!response.ok || bytes === 0 || (images.includes(url) && !type.startsWith('image/'))) throw new Error(`HTTP ${response.status}: ${url}`);
    return {url, status: response.status, contentType: type};
  }));
  fs.mkdirSync(path.join(__dirname, 'qa'), {recursive: true});
  fs.writeFileSync(path.join(__dirname, 'qa/network-report-en.json'), JSON.stringify(results, null, 2));
  console.log('EN verified: 8 presentations, 9 unchanged public images, 9 English storefront destinations, HTTP 200; no Lithuanian UI text or malformed URLs.');
}
main().catch(error => {console.error(error); process.exitCode = 1;});
