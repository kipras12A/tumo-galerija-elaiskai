# Nauji TUMO galerijos kūriniai · 2 naujienlaiškiai

2026-10-07 paruošti du lietuviški HTML laiškai pagal užsakovo kūrinių sąrašą. Ankstesnis „ArtVilnius’26“ laiškas saugyklos šaknyje nekeičiamas.

## Atranka

Pateikta 14 nuorodų, nors užsakovas minėjo 16 darbų. Trūkstami du kūriniai nepridėti ir nesugalvoti. Pateikti darbai įtraukti po vieną kartą:

- `01-tapyba-ir-skulptura/` – 8 pristatymai: Vytauto Dubausko „Rugpjūtis“ ir „Tėvas ir sūnus“, Martyno Gedimino „Tiesa 5“, du Theo Bardsley darbai, NKSIN „No.3: Revival III“, ALPHA ODH „BTD, DTB“ ir Miglės Jašauskės „Klausykla“ skulptūrų ciklas, iliustruotas Nr. 4 nuotrauka.
- `02-grafika-ir-piesinys/` – 6 kūriniai: dvi Theo Tobiasse litografijos, Stasio Ušinsko „Sėdinti“ ir Stasio Eidrigevičiaus, Gražinos Didelytės bei Saulės Kisarauskienės ekslibrisai.

„Nauji kūriniai“ reiškia naują galerijos pristatomą atranką, o ne tai, kad visi darbai sukurti šiais metais. Kūriniai turi savo tikras katalogo datas.

## Failai kiekvienam laiškui

- `newsletter.html` – pilnas HTML siuntimo platformos importui.
- `HTML-BLOKAS.html` – HTML turinys ir stiliai platformos kodo redaktoriui.
- `preview.html` – tas pats pilnas HTML peržiūrai naršyklėje.
- `newsletter.txt` – tekstinė alternatyva, tema ir preheader.
- `campaign.json` – tema, preheader, kūrinių skaičius ir eiliškumas.

Visos nuotraukos turi viešus HTTPS adresus iš oficialaus TUMO galerijos Shopify CDN. Kodo įkėlimui nereikia papildomo vietinio `assets` katalogo; vaizdams užkrauti reikia interneto. Naudojamas visas oficialus katalogo kadras, be retušavimo ar kūrinio apkarpymo. Nuotraukos į šią saugyklą pakartotinai nekeliamos.

GitHub pasirinkite **Raw**, jei norite kopijuoti patį HTML kodą. Kopijuokite `HTML-BLOKAS.html` arba importuokite `newsletter.html`, ne GitHub puslapio HTML.

## Svarbios turinio pastabos

- Užsakovo patikslinimu Miglės blokas pristato visą „Klausykla“ ciklą, ne vien parduotą Nr. 5. Žyma „Parduota“ pašalinta; nuotraukai naudojama prieinama Nr. 4, tai aiškiai nurodyta po vaizdu. CTA „Peržiūrėti visas skulptūras“ veda į menininkės kolekciją. Tikrinimo metu Nr. 4, 6 ir 7 pažymėtos `PARDAVIME`.
- Theo Bardsley „Virš prieplaukos“ produkto angliškas pavadinimas kataloge nesutampa su signatūra ir URL. Laiške paliktas katalogo lietuviškas pavadinimas. Galerijai verta sutvarkyti anglišką produkto antraštę.
- Eidrigevičiaus ekslibrisui metai kataloge nenurodyti, todėl jų nepridėta.
- ALPHA ODH matmenys paimti iš produkto antraštės, ne nuotraukos failo pavadinimo. Matmenų skliaustai palikti kaip kataloge, neinterpretuojant jų reikšmės.
- Kainos ir teiginiai apie investicinę grąžą neįtraukti. Trumpi nuotaikos aprašymai yra redakcinė vizualinė interpretacija, o ne autorių citatos.

## Patikra ir redagavimas

`catalog.json` – redaguojami kūrinių duomenys ir trumpi tekstai; `build.cjs` – bendras laiškų maketas bei eiliškumas; `sources.json` – faktų, vaizdų ir katalogo neatitikimų šaltiniai. Skriptams reikia Node.js 18 ar naujesnio, papildomų paketų nereikia.

Paleiskite `node build.cjs`, kad iš naujo sugeneruotumėte abu laiškus. Tada `node verify.cjs` patikrins darbų unikalumą, siuntimo failų vaizdų adresus, produktų CTA ir nuotraukų bei produktų puslapių atsakymus be autorizacijos.

Patikrinti 14 produkto puslapių ir 15 skirtingų viešų vaizdų (14 kūrinių bei logotipas): visi grąžino HTTP 200. Abu laiškai patikrinti Chromium naršyklėje 800, 390 ir 320 px pločiais: nuotraukos užkraunamos, yra alternatyvus tekstas, nėra horizontalaus perslinkimo ar antraščių perpildymo. HTML dydžiai mažesni nei 25 KB. Tai nėra visų el. pašto programų suderinamumo garantija.

Prieš siunčiant pridėkite platformos automatinį prenumeratos atsisakymo bloką, patikrinkite tuometinį kūrinių prieinamumą ir atlikite bandomąjį siuntimą. Šie laiškai dar nesiųsti; jokia siuntimo kampanija nesukurta.
