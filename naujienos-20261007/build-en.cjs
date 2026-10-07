const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const source = path.join(root, '01-tapyba-ir-skulptura');
const output = path.join(root, '01-painting-and-sculpture-en');
const english = require('./english.json');
const campaign = JSON.parse(fs.readFileSync(path.join(source, 'campaign.json'), 'utf8'));
const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ordered = dictionary => Object.entries(dictionary).sort((a, b) => b[0].length - a[0].length);

function translate(text, html) {
  for (const [original, translated] of ordered(english.translations)) {
    text = text.replaceAll(html ? esc(original) : original, html ? esc(translated) : translated);
  }
  for (const [original, translated] of ordered(english.urls)) {
    // Replace only complete attribute or text-line URLs, never a prefix of an image CDN URL.
    if (html) text = text.replaceAll(`href="${original}"`, `href="${translated}"`);
  }
  if (!html) text = text.replace(/https:\/\/tumogalerija\.lt\/[^\s<"]*/g, match => english.urls[match] || match);
  if (html) text = text.replace('<html lang="lt"', '<html lang="en"');
  return text;
}

fs.mkdirSync(output, {recursive: true});
for (const file of ['newsletter.html', 'preview.html', 'HTML-BLOKAS.html', 'newsletter.txt']) {
  const result = translate(fs.readFileSync(path.join(source, file), 'utf8'), file.endsWith('.html'));
  if (/Nauji kūriniai|Peržiūrėti|PARDUOTA|Klausykla Nr|Užupio g\.|<html lang="lt"/.test(result)) throw new Error(`Untranslated text: ${file}`);
  fs.writeFileSync(path.join(output, file), result);
}
fs.writeFileSync(path.join(output, 'campaign.json'), JSON.stringify({
  language: 'en',
  subject: english.subject,
  subjectAlternatives: english.subjectAlternatives,
  preheader: english.preheader,
  artworkCount: campaign.artworkCount,
  artworkIds: campaign.artworkIds,
  basedOn: '../01-tapyba-ir-skulptura/'
}, null, 2) + '\n');
fs.writeFileSync(path.join(output, 'sources.json'), JSON.stringify({
  language: 'en',
  checkedOn: '2026-10-07',
  baseSources: '../sources.json',
  EnglishCatalogSource: 'https://tumogalerija.lt/en/products.json?limit=250',
  destinationUrls: Object.values(english.urls),
  note: 'English adaptation of the first Lithuanian newsletter. Artwork images and dimensions unchanged. Official English artwork titles used; Over the Staithe confirmed in the English catalog. Confessional block presents the series, illustrated by No. 4.',
  notSent: true
}, null, 2) + '\n');
console.log('English first newsletter generated with 8 artwork/series presentations and English storefront links.');
