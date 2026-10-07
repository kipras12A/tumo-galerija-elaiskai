# TUMO galerija · el. laiškai

TUMO galerijos „ArtVilnius’26“ naujienlaiškis. Atskira saugykla nuo galerijos svetainės.

Nauja atranka: [du naujų kūrinių naujienlaiškiai (2026-10-07)](naujienos-20261007/) – tapyba ir skulptūra (8 darbai), grafika ir piešinys (6 darbai). Siuntimo HTML, temos ir preheader yra atskiruose abiejų laiškų aplankuose. Toliau aprašyti šaknyje esantys failai priklauso ankstesniam „ArtVilnius’26“ laiškui.

## Kurį HTML naudoti?

- `newsletter.html` – visas laiškas siuntimo platformos HTML importui. Visų šešių vaizdų adresai yra vieši HTTPS URL, todėl vaizdams nereikia šalia esančio katalogo ar GitHub prisijungimo.
- `HTML-BLOKAS.html` – HTML blokas su tais pačiais viešais vaizdais, skirtas kopijuoti į siuntimo platformos kodo redaktorių.
- `preview.html` – siuntimo versijos peržiūra; vaizdams reikia interneto.
- `preview-local.html` ir `HTML-BLOKAS-local.html` – vietinės versijos su santykiniais `assets/...` adresais. Kopijuojant vien jų kodą į siuntimo platformą nuotraukos neveiks.
- `TUMO-ARTVILNIUS-HTML.zip` – vietinis HTML ir vaizdų paketas platformoms, palaikančioms ZIP importą.
- `newsletter.txt` – tekstinė alternatyva, tema ir preheader.
- `sources.json` – turinio bei fotografijų šaltiniai; `image-hosting.json` – siuntimo versijos vaizdų adresai.

GitHub failų puslapyje pasirinkite **Raw**, jei norite kopijuoti patį HTML kodą. GitHub saugyklos puslapis nėra laiško maketo peržiūra.

## Vaizdų prieinamumas

Užsakovas patvirtino, kad ši saugykla ir naujienlaiškio nuotraukos gali būti viešos. Vaizdai pateikiami iš viešos GitHub saugyklos per `raw.githubusercontent.com`, be autorizacijos. Nuorodos pririštos prie konkretaus commit, o ne kintamos `main` šakos.

Nepadarykite saugyklos privačios ir jos neištrinkite, kol šių vaizdų reikia išsiųstiems laiškams. Gavėjų el. pašto programos vis tiek gali pagal savo privatumo nustatymus blokuoti išorinius vaizdus.

## Redagavimas

HTML yra savarankiškas: lentelių maketas, įterpti stiliai ir Outlook sąlyginiai blokai. Node.js skriptui papildomų paketų nereikia.

1. Redaguokite `preview-local.html` ir `HTML-BLOKAS-local.html`.
2. Jei keičiate nuotraukas, pirmiausia įkelkite atnaujintą `assets/` į viešą saugyklą ir užfiksuokite commit SHA.
3. Paleiskite `node export.cjs https://raw.githubusercontent.com/kipras12A/tumo-galerija-elaiskai/COMMIT_SHA/assets`, pakeitę `COMMIT_SHA` tikru 40 simbolių SHA. Jei vaizdai nekeisti, pakanka `node export.cjs` – bus naudojamas esamas `image-hosting.json`.
4. Įkelkite sugeneruotus siuntimo failus.

Patikrai paleiskite `node verify-images.cjs` (Node.js 18 ar naujesnis). Skriptas be autorizacijos patikrina kiekvieno vaizdo HTTP atsakymą, MIME tipą ir turinio atitiktį vietiniam failui. Paskutinė patikra: visi šeši vaizdai grąžino HTTP 200; HTML maketas naršyklėje patikrintas 800, 390 ir 320 px pločiais, be horizontalaus perslinkimo.

Prieš siunčiant pridėkite platformos prenumeratos atsisakymo bloką ir išsiųskite testinį laišką. Laiškas dar nesiųstas. Tai nėra galerijos svetainės pakeitimas ar automatinis laiško išsiuntimas.

Stendo fotografijas pateikė užsakovas. Lingio blokas – tikros nuotraukos kadras su trimis šviesiais paveikslais. Martyno Gedimino „Daiktas“ (2022) nuotrauka iš oficialios TUMO galerijos svetainės nepristatoma kaip konkretaus mugėje eksponuojamo kūrinio dokumentacija. Originalai saugomi lokaliai; į saugyklą įtraukti tik laiške naudojami optimizuoti vaizdai.
