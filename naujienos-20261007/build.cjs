const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'catalog.json'), 'utf8'));
const works = Object.fromEntries(catalog.map(work => [work.id, work]));
const gallery = 'https://tumogalerija.lt/';
const logo = 'https://raw.githubusercontent.com/kipras12A/tumo-galerija-elaiskai/17505e4382fe7a5dec0e6df5185c9cd73052574f/assets/tumo-logo.png';
const font = 'Arial, Helvetica, sans-serif';
const serif = 'Georgia, Times, serif';
const ink = '#20211f';
const muted = '#60615b';
const sand = '#eeece5';
const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const url = work => `https://tumogalerija.lt/products/${work.handle}`;
const imageUrl = work => `${work.image}&width=1200`;
const title = work => `${work.title}${work.year ? `, ${work.year}` : ''}`;
const img = (work, width, cls = '') => `<a href="${esc(url(work))}" target="_blank">` +
  `<img class="work-image ${cls}" src="${esc(imageUrl(work))}" alt="${esc(`${work.artist} — ${title(work)}`)}" width="${width}" height="${width}" border="0" style="display:block;width:100%;max-width:${width}px;height:auto;border:0;outline:none;text-decoration:none;">` + '</a>';
const textLink = (href, label, color = ink) => `<a href="${esc(href)}" target="_blank" style="font-family:${font};font-size:13px;line-height:21px;font-weight:bold;color:${color};text-decoration:underline;text-underline-offset:4px;">${esc(label)}&nbsp;↗</a>`;
const button = (href, label, inverse = false) => `<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td bgcolor="${inverse ? '#ffffff' : ink}" style="background:${inverse ? '#ffffff' : ink};"><a href="${esc(href)}" target="_blank" style="display:inline-block;padding:15px 22px;border:1px solid ${inverse ? '#ffffff' : ink};font-family:${font};font-size:14px;line-height:20px;font-weight:bold;color:${inverse ? ink : '#ffffff'};text-decoration:none;mso-padding-alt:0;"><!--[if mso]><i style="mso-font-width:150%;mso-text-raise:20pt;">&nbsp;</i><![endif]--><span style="mso-text-raise:10pt;">${esc(label)}&nbsp;↗</span><!--[if mso]><i style="mso-font-width:150%;">&nbsp;</i><![endif]--></a></td></tr></table>`;
const artistLine = work => `${work.artist}${work.origin ? ` · ${work.origin}` : ''}`;
const metadata = work => `<p style="margin:0 0 14px;font-family:${font};font-size:12px;line-height:20px;color:${muted};">${esc(work.medium)}<br>${esc(work.dimensions)}</p>`;
const caption = (work, feature = false) => `<p style="margin:0 0 7px;font-family:${font};font-size:${feature ? 15 : 14}px;line-height:22px;font-weight:bold;color:${ink};">${esc(artistLine(work))}</p>
  <h3 style="margin:0 0 11px;font-family:${serif};font-size:${feature ? 25 : 21}px;line-height:${feature ? 31 : 27}px;font-weight:normal;color:${ink};">${esc(title(work))}</h3>
  ${work.series ? `<p style="margin:-5px 0 10px;font-family:${font};font-size:12px;line-height:18px;color:${muted};">${esc(work.series)}</p>` : ''}
  ${metadata(work)}`;

function card(work) {
  return `<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td style="padding:0 0 19px;">${img(work, 268)}</td></tr>
  <tr><td>${caption(work)}
  <p style="margin:0 0 17px;font-family:${font};font-size:14px;line-height:22px;color:${muted};">${esc(work.copy)}</p>
  ${textLink(url(work), 'Peržiūrėti kūrinį')}
  </td></tr></table>`;
}

function pair(left, right) {
  return `<tr><td class="pad" style="padding:0 40px 36px;"><table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0"><tr>
  <td class="stack card-cell" width="268" valign="top" style="width:268px;">${card(works[left])}</td>
  <td class="spacer" width="24" style="width:24px;font-size:0;line-height:0;">&nbsp;</td>
  <td class="stack card-cell second-card" width="268" valign="top" style="width:268px;">${card(works[right])}</td>
  </tr></table></td></tr>`;
}

function section(kicker, heading, copy = '') {
  return `<tr><td class="pad" style="padding:0 40px 25px;">
  <p style="margin:0 0 9px;font-family:${font};font-size:10px;line-height:17px;letter-spacing:1.6px;color:${muted};">${esc(kicker)}</p>
  <h2 class="section-title" style="margin:0${copy ? ' 0 12px' : ''};font-family:${serif};font-size:29px;line-height:35px;font-weight:normal;letter-spacing:-0.4px;color:${ink};">${esc(heading)}</h2>
  ${copy ? `<p style="margin:0;font-family:${font};font-size:14px;line-height:23px;color:${muted};">${esc(copy)}</p>` : ''}
  </td></tr>`;
}

function feature(id, kicker) {
  const work = works[id];
  return `<tr><td class="pad feature-section" bgcolor="${sand}" style="padding:32px 40px 34px;background:${sand};">
  <p style="margin:0 0 20px;font-family:${font};font-size:10px;line-height:17px;letter-spacing:1.6px;color:${muted};">${esc(kicker)}</p>
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0"><tr>
  <td class="stack feature-photo" width="224" valign="top" style="width:40%;">${img(work, 224)}</td>
  <td class="stack feature-copy" width="336" valign="top" style="width:60%;padding:0 0 0 26px;">
  ${caption(work, true)}
  <p style="margin:0 0 17px;font-family:${font};font-size:14px;line-height:23px;color:${muted};">${esc(work.copy)}</p>
  ${work.sold ? `<p style="margin:0 0 17px;font-family:${font};font-size:11px;line-height:19px;color:${muted};"><strong style="letter-spacing:1px;color:${ink};">PARDUOTA</strong><br>Kūrinį pristatome kaip menininkės kūrybos dalį.</p>` : ''}
  ${textLink(url(work), work.sold ? 'Susipažinti su kūriniu' : 'Peržiūrėti kūrinį')}
  </td></tr></table>
  </td></tr><tr><td style="height:34px;line-height:34px;font-size:0;">&nbsp;</td></tr>`;
}

function hero(work) {
  return `<tr><td class="pad hero-art" style="padding:0 40px;">${img(work, 560)}</td></tr>
  <tr><td class="pad" style="padding:24px 40px 36px;">${caption(work, true)}
  <p style="margin:0 0 21px;font-family:${font};font-size:15px;line-height:24px;color:${muted};">${esc(work.copy)}</p>
  ${button(url(work), 'Peržiūrėti kūrinį')}
  </td></tr>
  <tr><td class="pad" style="padding:0 40px 31px;"><div style="border-top:1px solid #deded7;font-size:0;line-height:0;">&nbsp;</div></td></tr>`;
}

const styles = `<style>
html,body{margin:0!important;padding:0!important;width:100%!important;}
table{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}
td{box-sizing:border-box;}
img{-ms-interpolation-mode:bicubic;}
a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important;}
@media only screen and (max-width:600px){
  .outer{padding:0!important;}
  .pad{padding-left:24px!important;padding-right:24px!important;}
  .headline{font-size:36px!important;line-height:42px!important;}
  .section-title{font-size:27px!important;line-height:33px!important;}
  .stack{display:block!important;width:100%!important;}
  .spacer{display:none!important;}
  .work-image{max-width:none!important;}
  .second-card{padding-top:32px!important;}
  .feature-copy{padding:23px 0 0!important;}
}
@media only screen and (max-width:360px){
  .pad{padding-left:20px!important;padding-right:20px!important;}
  .headline{font-size:32px!important;line-height:38px!important;}
}
</style>`;

const emails = [
  {
    slug: '01-tapyba-ir-skulptura',
    subject: 'Nauji kūriniai: spalva, gestas ir forma | TUMO galerija',
    preheader: 'Dubausko tapyba, Theo Bardsley figūros ir nauji žvilgsniai į paviršių bei formą.',
    edition: '01 · TAPYBA IR SKULPTŪRA',
    accent: '#a64b2d',
    heading: 'Spalva. Gestas.<br>Forma.',
    intro: 'Nauji kūriniai TUMO galerijoje — nuo didelio formato tapybos ir kasdienybės scenų iki šviesai jautrių paviršių bei medžio skulptūros. Kviečiame atrasti savo žvilgsnį patrauksiantį darbą.',
    hero: 'dubauskas-rugpjutis',
    ids: ['dubauskas-rugpjutis', 'dubauskas-tevas', 'gediminas-tiesa5', 'bardsley-dancers', 'bardsley-staithe', 'nksin-revival', 'alpha-btd', 'migle-klausykla5'],
    content: () => section('SPALVA IR FAKTŪRA', 'Skirtingi tapybos ritmai') +
      pair('dubauskas-tevas', 'gediminas-tiesa5') +
      section('THEO BARDSLEY', 'Kasdienybė, tapusi paveikslu', 'Du kūriniai, kuriuose asmeninė patirtis susitinka su figūratyvinės tapybos kalba.') +
      pair('bardsley-dancers', 'bardsley-staithe') +
      section('NAUJOS PERSPEKTYVOS', 'Žvilgsnis ir šviesa') +
      pair('nksin-revival', 'alpha-btd') + feature('migle-klausykla5', 'IŠ ARTI · SKULPTŪRA')
  },
  {
    slug: '02-grafika-ir-piesinys',
    subject: 'Nauji kūriniai: grafika ir piešinio tyluma | TUMO galerija',
    preheader: 'Theo Tobiasse litografijos, Stasio Ušinsko piešinys ir trys saviti ekslibrisų pasauliai.',
    edition: '02 · GRAFIKA IR PIEŠINYS',
    accent: '#76563a',
    heading: 'Linija. Spalva.<br>Istorija.',
    intro: 'Nauja galerijos kūrinių atranka kviečia įsižiūrėti: į spalvingas litografijų istorijas, tylią piešinio figūrą ir mažo formato grafikos detales. Šeši darbai, kuriems verta skirti laiko.',
    hero: 'tobiasse-dance',
    ids: ['tobiasse-dance', 'tobiasse-dovana', 'usinskas-sedinti', 'eidrigevicius-exlibris', 'didelyte-geerth', 'kisarauskiene-blokland'],
    content: () => section('FIGŪRA IR PASAKOJIMAS', 'Nuo spalvos iki piešinio') +
      pair('tobiasse-dovana', 'usinskas-sedinti') + feature('eidrigevicius-exlibris', 'MAŽAS FORMATAS · STASYS EIDRIGEVIČIUS') +
      section('EKSLIBRISAI', 'Detalės, kuriose telpa pasaulis') + pair('didelyte-geerth', 'kisarauskiene-blokland')
  }
];

function body(email) {
  return `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${esc(email.preheader)}</div>
<table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f2f1ed" style="width:100%;background:#f2f1ed;"><tr><td class="outer" align="center" style="padding:28px 0;">
<!--[if mso]><table role="presentation" width="640" border="0" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
<table class="email" role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="width:100%;max-width:640px;background:#ffffff;">
<tr><td class="pad" style="padding:28px 40px 23px;"><table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0"><tr>
<td width="64" style="width:64px;"><a href="${gallery}" target="_blank"><img src="${logo}" alt="TUMO galerija" width="64" height="63" border="0" style="display:block;width:64px;height:auto;border:0;"></a></td>
<td align="right" style="font-family:${font};font-size:10px;line-height:17px;letter-spacing:1.1px;color:${muted};">MODERNUS IR<br>ŠIUOLAIKINIS MENAS</td>
</tr></table></td></tr>
<tr><td class="pad" style="padding:16px 40px 30px;">
<p style="margin:0 0 14px;font-family:${font};font-size:10px;line-height:18px;letter-spacing:1.8px;color:${email.accent};">NAUJI KŪRINIAI · ${esc(email.edition)}</p>
<h1 class="headline" style="margin:0 0 20px;font-family:${serif};font-size:43px;line-height:49px;font-weight:normal;letter-spacing:-1px;color:${ink};">${email.heading}</h1>
<p style="margin:0;font-family:${font};font-size:16px;line-height:26px;color:${muted};">${esc(email.intro)}</p>
</td></tr>
${hero(works[email.hero])}${email.content()}
<tr><td class="pad" bgcolor="${ink}" style="padding:34px 40px 36px;background:${ink};">
<p style="margin:0 0 12px;font-family:${font};font-size:10px;line-height:18px;letter-spacing:1.7px;color:#d9dacf;">ATRASKITE DAUGIAU</p>
<h2 style="margin:0 0 15px;font-family:${serif};font-size:30px;line-height:37px;font-weight:normal;color:#ffffff;">Kuris kūrinys — jūsų?</h2>
<p style="margin:0 0 22px;font-family:${font};font-size:14px;line-height:23px;color:#d9dacf;">Peržiūrėkite galerijos kolekciją arba parašykite mums — padėsime išsirinkti ir atsakysime į klausimus apie dominančius darbus.</p>
${button(gallery, 'Atraskite TUMO galerijos kūrinius', true)}
<p style="margin:18px 0 0;font-family:${font};font-size:13px;line-height:21px;">${textLink('mailto:info@tumogalerija.lt', 'Pasiteirauti galerijos', '#ffffff')}</p>
</td></tr>
<tr><td class="pad" style="padding:27px 40px 29px;">
<p style="margin:0 0 5px;font-family:${font};font-size:13px;line-height:21px;font-weight:bold;color:${ink};">TUMO galerija</p>
<p style="margin:0 0 12px;font-family:${font};font-size:12px;line-height:20px;color:${muted};">Užupio g. 28, Vilnius<br><a href="mailto:info@tumogalerija.lt" style="color:${muted};text-decoration:none;">info@tumogalerija.lt</a></p>
<p style="margin:0;font-family:${font};font-size:12px;line-height:20px;color:${muted};"><a href="${gallery}" target="_blank" style="color:${muted};text-decoration:underline;">Galerija</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="https://www.instagram.com/tumo_gallery/" target="_blank" style="color:${muted};text-decoration:underline;">Instagram</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="https://www.facebook.com/TumoGalerija/" target="_blank" style="color:${muted};text-decoration:underline;">Facebook</a></p>
<!-- Prieš siunčiant pridėkite siuntimo platformos automatinį prenumeratos atsisakymo bloką. -->
</td></tr>
</table><!--[if mso]></td></tr></table><![endif]-->
</td></tr></table>`;
}

for (const email of emails) {
  const out = path.join(root, email.slug);
  fs.mkdirSync(out, {recursive: true});
  const content = body(email).replace(/[ \t]+$/gm, '');
  const html = `<!doctype html>\n<html lang="lt" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${esc(email.subject)}</title><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->${styles}</head><body style="margin:0;padding:0;background:#f2f1ed;">${content}</body></html>\n`;
  fs.writeFileSync(path.join(out, 'newsletter.html'), html);
  fs.writeFileSync(path.join(out, 'preview.html'), html);
  fs.writeFileSync(path.join(out, 'HTML-BLOKAS.html'), `${styles}${content}\n`);
  fs.writeFileSync(path.join(out, 'newsletter.txt'), `Tema: ${email.subject}\nPreheader: ${email.preheader}\n\n${email.heading.replace(/<br>/g, ' ')}\n\n${email.intro}\n\n${email.ids.map(id => {
    const work = works[id];
    return `${artistLine(work)} — ${title(work)}${work.series ? ` (${work.series})` : ''}\n${work.medium}; ${work.dimensions}.\n${work.copy}${work.sold ? '\nPARDUOTA. Kūrinį pristatome kaip menininkės kūrybos dalį.' : ''}\n${url(work)}`;
  }).join('\n\n')}\n\nAtraskite TUMO galerijos kūrinius: ${gallery}\nPasiteirauti: info@tumogalerija.lt\nTUMO galerija | Užupio g. 28, Vilnius\n`);
  fs.writeFileSync(path.join(out, 'campaign.json'), JSON.stringify({subject: email.subject, preheader: email.preheader, artworkCount: email.ids.length, artworkIds: email.ids}, null, 2) + '\n');
  console.log(`${email.slug}: ${email.ids.length} darbai, ${Buffer.byteLength(html)} B HTML.`);
}

fs.writeFileSync(path.join(root, 'sources.json'), JSON.stringify({
  checkedOn: '2026-10-07',
  inputLinkCount: 14,
  requestedCount: 16,
  note: 'Vartotojo sąraše buvo 14 nuorodų; du trūkstami darbai nepridėti ar nesugalvoti. Du laiškai pagal mediją: 8 ir 6 kūriniai. Tai naujos galerijos atrankos, ne teiginys, kad visi darbai sukurti 2026 m.',
  images: 'Vieši HTTPS vaizdai iš oficialaus TUMO galerijos Shopify CDN. Visas katalogo kadras išsaugomas; crop, retušas ir generavimas netaikomi.',
  copy: 'Trumpi originalūs redakciniai vaizdo aprašymai yra vizualinė interpretacija; technika, metai, dydžiai ir pavadinimai tikrinti pagal viešą produktų katalogą.',
  works: catalog.map(work => ({id: work.id, artist: work.artist, title: work.title, year: work.year || null, productUrl: url(work), jsonSource: `${url(work)}.js`, imageSource: work.image, imageUsed: imageUrl(work), availableWhenChecked: work.availableWhenChecked, ...(work.sold ? {sold: true} : {}), ...(work.sourceNote ? {note: work.sourceNote} : {})})),
  logo,
  sendingNote: 'Naujienlaiškiai nesiųsti. Reikia pridėti siuntimo platformos prenumeratos atsisakymo bloką ir prieš siuntimą patikrinti prieinamumą bei atlikti bandomąjį siuntimą.'
}, null, 2) + '\n');
