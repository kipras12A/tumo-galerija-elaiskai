const fs = require('node:fs');
const path = require('node:path');
const catalog = require('./catalog.json');
const folders = ['01-tapyba-ir-skulptura', '02-grafika-ir-piesinys'];
const decode = value => value.replace(/&amp;/g, '&');
const read = file => fs.readFileSync(path.join(__dirname, file), 'utf8');

async function main() {
  const ids = [];
  const imageUrls = new Set();
  for (const folder of folders) {
    const campaign = JSON.parse(read(`${folder}/campaign.json`));
    ids.push(...campaign.artworkIds);
    const expected = campaign.artworkIds.map(id => {
      const work = catalog.find(item => item.id === id);
      if (!work) throw new Error(`Nežinomas kūrinys: ${id}`);
      return `https://tumogalerija.lt/products/${work.handle}`;
    });
    const full = read(`${folder}/newsletter.html`);
    if (full !== read(`${folder}/preview.html`)) throw new Error(`${folder}: peržiūra neatitinka laiško.`);
    if (Buffer.byteLength(full) > 90000) throw new Error(`${folder}: HTML per didelis el. paštui.`);
    for (const file of ['newsletter.html', 'HTML-BLOKAS.html']) {
      const html = read(`${folder}/${file}`);
      const images = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => decode(match[1]));
      if (images.length !== campaign.artworkCount + 1 || images.some(src => !src.startsWith('https://'))) throw new Error(`${file}: netinkami vaizdų adresai arba jų skaičius.`);
      images.forEach(src => imageUrls.add(src));
      const productLinks = new Set([...html.matchAll(/href="(https:\/\/tumogalerija.lt\/products\/[^"]+)"/g)].map(match => decode(match[1])));
      if (productLinks.size !== expected.length || expected.some(url => !productLinks.has(url))) throw new Error(`${folder}: nesutampa produktų nuorodos.`);
      if (/admin\.shopify|file:\/\/|localhost|src="assets\//.test(html)) throw new Error(`${folder}: vidinis arba vietinis adresas siuntimo HTML.`);
      if (!html.includes('prenumeratos atsisakymo')) throw new Error(`${folder}: trūksta atsisakymo integravimo pastabos.`);
    }
    console.log(`${folder}: ${campaign.artworkCount} kūriniai, visi CTA ir vaizdai turi viešus adresus.`);
  }
  if (ids.length !== catalog.length || new Set(ids).size !== catalog.length || catalog.some(work => !ids.includes(work.id))) throw new Error('Darbai kartojasi arba ne visi įtraukti.');
  if (!read('01-tapyba-ir-skulptura/newsletter.html').includes('PARDUOTA')) throw new Error('Miglės kūriniui trūksta pardavimo būsenos.');
  const imageResults = await Promise.all([...imageUrls].map(async url => {
    const response = await fetch(url, {credentials: 'omit', signal: AbortSignal.timeout(30000)});
    const type = response.headers.get('content-type') || '';
    const bytes = (await response.arrayBuffer()).byteLength;
    if (!response.ok || !type.startsWith('image/') || bytes === 0) throw new Error(`Vaizdas: ${response.status} ${type} ${url}`);
    return {url, status: response.status, contentType: type, bytes};
  }));
  const productResults = await Promise.all(catalog.map(async work => {
    const url = `https://tumogalerija.lt/products/${work.handle}`;
    const response = await fetch(url, {credentials: 'omit', signal: AbortSignal.timeout(30000)});
    await response.arrayBuffer();
    if (!response.ok) throw new Error(`Kūrinys ${work.id}: HTTP ${response.status}`);
    return {id: work.id, url, status: response.status};
  }));
  fs.mkdirSync(path.join(__dirname, 'qa'), {recursive: true});
  fs.writeFileSync(path.join(__dirname, 'qa', 'network-report.json'), JSON.stringify({imageResults, productResults}, null, 2));
  console.log(`Patvirtinta: ${ids.length} unikalių kūrinių, ${imageResults.length} viešų vaizdų ir ${productResults.length} produkto puslapių. Visi HTTP 200.`);
}
main().catch(error => {console.error(error); process.exitCode = 1;});
