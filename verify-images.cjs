const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

async function main() {
  const root = __dirname;
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'image-hosting.json'), 'utf8'));
  if (manifest.images.length !== 6) throw new Error('Tikėtasi šešių vaizdų.');
  for (const file of ['newsletter.html', 'preview.html', 'HTML-BLOKAS.html']) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const urls = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)].map(match => match[1]);
    if (urls.length !== 6 || urls.some((url, index) => url !== manifest.images[index].url)) {
      throw new Error(`Netinkami arba santykiniai vaizdų adresai: ${file}`);
    }
  }
  const results = await Promise.all(manifest.images.map(async ({file, url}) => {
    // Jokio Authorization, slapukų ar GitHub CLI prisijungimo.
    const response = await fetch(url, {credentials: 'omit', signal: AbortSignal.timeout(30000)});
    const type = response.headers.get('content-type') || '';
    if (!response.ok || !type.startsWith('image/')) throw new Error(`${file}: HTTP ${response.status}, ${type}`);
    const remote = Buffer.from(await response.arrayBuffer());
    const local = fs.readFileSync(path.join(root, 'assets', file));
    const hash = data => crypto.createHash('sha256').update(data).digest('hex');
    if (hash(remote) !== hash(local)) throw new Error(`${file}: viešas vaizdas neatitinka vietinio failo.`);
    return {file, status: response.status, contentType: type, bytes: remote.length, matchesLocal: true};
  }));
  console.log(JSON.stringify(results, null, 2));
}
main().catch(error => {console.error(error); process.exitCode = 1;});
