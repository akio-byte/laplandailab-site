# Moduulianalyysi ja jatkokehitysideat

Tämä dokumentti kokoaa yhteen uuden Supabase-integraation ja olemassa olevan koodipohjan analyysin. Tarkoituksena on tarjota kehittäjille nopeasti omaksuttava näkymä keskeisiin moduuleihin, havaittuihin riskeihin sekä jatkokehityksen prioriteetteihin.

## 1. Sovellusrakenne (`src/App.tsx`)

- Vastaa etusivun perusrakenteesta ja kokoaa eri sisältöosiot yhteen.
- Supabase-päivitykset on irrotettu erilliseen `SupabaseUpdates`-komponenttiin, mikä selkeyttää datalähteiden hallintaa.
- **Mahdollinen jatkokehitys:** siirrä tekstisisällöt ja lokaatiot erilliseen konfiguraatiokerrokseen, jotta monikielistys helpottuu.

## 2. Supabase-ketju (`src/components/updates/SupabaseUpdates.tsx`, `src/hooks/useSupabaseUpdates.ts`, `src/lib/supabaseClient.ts`)

- `SupabaseUpdates` vastaa käyttöliittymästä ja virhe-/statusviesteistä.
- `useSupabaseUpdates` kapseloi datan noudon, virheenkäsittelyn, reaaliaikaisen päivityksen sekä manuaalisen `refresh()`-mahdollisuuden.
- `supabaseClient.ts` tarjoaa turvallisen tavan muodostaa asiakas vain kun ympäristömuuttujat on asetettu. Clientti pysyy yksittäisenä instanssina (singleton), jolloin avoimia WebSocket-yhteyksiä ei muodostu tarpeettomasti.
- **Mahdolliset riskit:**
  - Supabasen taulun skeema ei ole tyypitetty kattavasti. Jos sarakkeiden nimiä muutetaan, hookka ei huomaa muutosta ennen ajoa.
  - Reaaliaikainen kanava kuuntelee `event: '*'` -suodattimella. Jos taulu kasvaa suureksi tai päivityksiä tulee usein, tarvitaan mahdollisesti lisäsuodattimia tai sivutusta.
- **Parannusehdotuksia:**
  - Lisää supabase-js:n generoidut tyypit (`supabase gen types typescript --project-id ...`) ja hyödyntää niitä `SupabaseDatabase`-tyypin sijaan.
  - Toteuta optimointi, jossa `refresh()` käyttää `AbortControlleria` estämään päällekkäiset pyynnöt.

## 3. UI-osiot ja layout (`src/components/layout/*`, `src/sections/*`)

- Layout-komponentit ovat puhtaita presentaatiosia, mikä helpottaa uudelleenkäyttöä ja testattavuutta.
- Päivitysosio tukee nyt lataus-, virhe- ja tyhjän tilan esittämistä. Tämä vähentää kopioitua logiikkaa, jos samaa komponenttia halutaan käyttää muualla.
- **Parannusehdotuksia:**
  - Erottele `UpdatesSection`ista yksittäisen kortin renderöinti omaan komponenttiinsa, mikäli kortti halutaan hyödyntää muissa näkymissä.
  - Lisää saavutettavuustestejä (`@testing-library/jest-dom` tarjoaa hyvät apuvälineet).

## 4. Scripts (`scripts/digest.js`)

- Skripti tuottaa AI Weekly Digest -yhteenvedon valituista RSS-lähteistä. Se voidaan integroida Supabaseen jatkossa, esimerkiksi tuomalla luodut merkinnät `updates`-tauluun cron-tehtävällä.
- **Parannusehdotus:** Kirjaa lähdekohtaiset virheet lokiin (esim. `console.warn`) ja lisää mahdollisuus konfiguroida lähteitä ympäristömuuttujilla.

## 5. Testausympäristö

- Vitest + Testing Library tarjoavat hyvän pohjan sekä komponentti- että logiikkatesteille. `useSupabaseUpdates`-hookin testit osoittavat, miten riippuvuuksien injektointi (options.client) helpottaa testausta.
- `npm run check` yhdistää tyyppitarkastuksen ja testit, mikä kannattaa ajaa CI-putkessa.
- **Parannusehdotus:** lisää visuaaliset regressiotestit (esim. Playwright + Storybook) mikäli käyttöliittymä muuttuu usein.

## 6. Tunnetut kehityskohteet

- **Sisällönhallinta:** tekstisisällöt sijaitsevat vielä TypeScript-taulukoissa. Pitkällä aikavälillä voidaan harkita CMS-rajapintaa tai Supabase-tauluja myös muulle sisällölle.
- **Lokalisointi:** nykyinen rakenne tukee vain suomea. Tarvitaan i18n-strategia ennen kieliversioiden lisäämistä.
- **Turvallisuus:** Supabase public anon key soveltuu julkiseen käyttöön, mutta palvelinpuolen hallintatoiminnot (insert/update) kannattaa rajata Edge Functioneihin tai palvelinpuolen API:iin.

## 7. Jatkokehitysideoita

1. **Sisältöeditori** – yksinkertainen käyttöliittymä Supabasen `updates`-taulun hallintaan, jotta sisällöntuottajat voivat päivittää uutisia ilman SQL-konsolia.
2. **Hakutoiminto** – lisää hakukenttä päivityslistaan (client-side filtteri) sekä mahdollinen avainsanoihin perustuva rajaus.
3. **CI-putki** – luo GitHub Actions -workflow, joka ajaa `npm run check`, `npm run build` ja turvallisuustarkistukset automaattisesti pull requesteille.
4. **Tiedotteen RSS** – julkaise päivityslista myös RSS-syötteenä, jolloin kumppanit voivat tilata uutiset.

---

Päivitetty: 2025-09-24
