const fs = require('node:fs');
const path = require('node:path');

const handles = [
  'migle-jasauske-klausykla-nr-5-2026',
  'migle-jasauske-klausykla-nr-4-2026',
  'vytautas-dubauskas-tevas-ir-sunus-2026',
  'vytautas-dubauskas-rugpjutis-2026',
  'theo-bardsley-three-dancers-in-the-smoke-2026-oil-on-canvas-100x80',
  'theo-bardsley-over-the-staithe-2026-oil-on-canvas-40x50',
  'nksin-japan-no-3-revival-iii-2022-acrylic-on-canvas-161x130',
  'martynas-gediminas-the-truth-5-from-the-flowers-series-2026-acrylic-mixed-media-canvas-84x84',
  'alpha-odh-kenya-btd-dtb-2024',
  'theo-tobiasse-when-the-torah-dances-with-the-rabbi-1968-10-color-lithograph-on-arches-paper-60x45-83x63',
  'theo-tobiasse-the-giving-of-the-torah-1968-10-color-lithograph-on-arches-paper-45x60-64x79',
  'stasys-eidrigevicius-ex-libris-tjarko-tjitte-van-der-zee-ofort-6x6-4-19-5x19-5',
  'stasys-usinskas-seated-1930s-pencil-charcoal-paper-40x30-55x45-1',
  'grazina-didelyte-ex-eroticis-geerth-1998-etching-9-5x6-6-21x16',
  'saule-kisarauskiene-ex-libris-herber-blokland-1971-etching-7x4-8-19-3x15-3'
];

async function main() {
  const root = __dirname;
  const data = [];
  for (const handle of handles) {
    const url = `https://tumogalerija.lt/products/${handle}.js`;
    const response = await fetch(url, {signal: AbortSignal.timeout(30000)});
    if (!response.ok) throw new Error(`${handle}: HTTP ${response.status}`);
    const product = await response.json();
    data.push({url: url.slice(0, -3), endpoint: url, product});
    console.log(JSON.stringify({handle: product.handle, title: product.title, available: product.available, tags: product.tags, image: product.featured_image, description: product.description}));
  }
  fs.mkdirSync(path.join(root, 'research'), {recursive: true});
  fs.writeFileSync(path.join(root, 'research', 'products.json'), JSON.stringify(data, null, 2));
}
main().catch(error => {console.error(error); process.exitCode = 1;});
