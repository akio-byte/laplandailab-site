# Lapland AI Lab -sivusto

Lapland AI Labin verkkosivuston koodi. Projekti on rakennettu Vite + React + TypeScript -pinolla ja tyylitetty Tailwind CSS:llä.

## Teknologiat

- [Vite](https://vitejs.dev/) nopeaan kehitykseen ja buildaukseen
- [React](https://react.dev/) käyttöliittymän rakentamiseen
- [TypeScript](https://www.typescriptlang.org/) tyypitettyyn kehitykseen
- [Tailwind CSS](https://tailwindcss.com/) tyylien hallintaan
- [Supabase](https://supabase.com/) ajankohtaisten päivitysten hallintaan

## Vaatimukset

- Node.js >= 20
- npm >= 10

## Ympäristömuuttujat

Sivusto voi hakea ajankohtaiset uutiset Supabasesta. Kopioi pohja `.env.example` → `.env.local` ja täytä tunnukset:

```bash
cp .env.example .env.local
```

`.env.local` sisältää vähintään:

```env
VITE_SUPABASE_URL=...   # Supabase-projektin URL
VITE_SUPABASE_ANON_KEY=...  # Supabase public anon key
```

Jos avaimia ei ole määritelty, komponentti käyttää staattista varasisältöä eikä tee verkko- tai reaaliaikayhteyksiä.

## Kehitysympäristön käynnistäminen

1. Asenna riippuvuudet:
   ```bash
   npm install
   ```
2. Käynnistä kehityspalvelin:
   ```bash
   npm run dev
   ```
   Palvelin avautuu oletuksena osoitteeseen <http://localhost:5173>.
3. Luo tuotantoversio:
   ```bash
   npm run build
   ```
   Generoitu tuotantoversio löytyy `dist/`-hakemistosta.

### Hyödylliset komennot

| Komento | Kuvaus |
| --- | --- |
| `npm run dev` | Kehityspalvelin hot reload -tuella |
| `npm run build` | Tyyppitarkistus ja Viten tuotantobuild |
| `npm run preview` | Esikatsele tuotantobuildia lokaalisti |
| `npm run typecheck` | Pelkkä TypeScript-tarkistus ilman bundlea |
| `npm run test` | Suorita Vitest-ajot (kertaluonteinen) |
| `npm run test:watch` | Vitest watch -tila prompt-testaukselle |
| `npm run check` | Yhdistää tyyppitarkistuksen ja testit |
| `npm run updates:digest` | Luo AI Weekly Digest -markdownin `updates/`-hakemistoon |
| `npm run browserslist:update` | Päivitä Browserslist DB nykyisille selaintiedoille |
| `npm run audit:fix` | Yritä automaattista npm audit -korjausta |

## Testaus ja laatuvarmistus

- **Vitest + Testing Library** muodostavat kehitysympäristön komponentti- ja prompt-testeille. `vitest.setup.ts` aktivoi `@testing-library/jest-dom`-matcherit ja `jsdom`-ympäristön.
- `npm run check` on suositeltu tapa varmistaa että tyyppitarkistus ja yksikkötestit läpäisevät ennen julkaisuja.
- Turvallisuuden ylläpitämiseksi suorita säännöllisesti `npm run audit:fix` sekä `npm run browserslist:update` jotta riippuvuudet ja selaintietokanta pysyvät ajan tasalla.

## Supabase-päivitykset

`SupabaseUpdates`-komponentti hakee oletuksena tuoreimmat merkinnät Supabasen `updates`-taulusta ja päivittää näkymää reaaliajassa. Komponentti

- palautuu varasisältöön jos ympäristömuuttujia ei ole tai nouto epäonnistuu;
- näyttää käyttäjälle virheilmoituksen ja pitää päivitä-napin käytettävissä;
- tukee myös manuaalista `refresh()`-painiketta joka on hyödyllinen kehityksessä.

Taulun skeema oletusarvoisesti:

| Sarake | Tyyppi | Kuvaus |
| --- | --- | --- |
| `id` | UUID / bigint | Yksilöllinen tunniste |
| `title` | text | Päivityksen otsikko |
| `description` | text | Lyhyt kuvaus |
| `link` | text | Valinnainen lisätiedon URL |
| `published_at` | timestamptz | Julkaisuaika, formatoidaan suomenkieliseksi päivämääräksi |

## Projektirakenne

- `src/components/layout` – sivupohjan header ja footer
- `src/components/updates` – Supabasea hyödyntävä päivityslista ja sen UI
- `src/hooks` – uudelleenkäytettävät logiikkahooksit kuten `useSupabaseUpdates`
- `src/lib` – ulkoiset integraatiot (Supabase-clientti)
- `src/sections` – sivun sisältöosiot (hero, mission, yhteys, jne.)
- `src/data` – staattiset sisällöt ja navigaatio
- `scripts/digest.js` – AI Weekly Digest -generaattori
- `docs/` – kehittäjille suunnattu syventävä dokumentaatio

## Dokumentaatio

- [docs/moduulianalyysi.md](docs/moduulianalyysi.md) – moduuleihin liittyvä analyysi, riskit ja jatkokehitysideoita.

## Lisenssi

Tämä projekti on tarkoitettu Lapland AI Labin sisäiseen käyttöön.
