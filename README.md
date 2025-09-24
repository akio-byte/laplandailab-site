# Lapland AI Lab -sivusto

Vite + React + TypeScript -projekti, joka julkaistaan Netlifyssä ja hakee ajankohtaiset uutiset Neon-tietokannasta. Tämä README kokoaa kehittäjille tarvittavat komennot, ympäristömuuttujat, dataputket ja jatkokehityksen checklistin.

## Teknologiapino

- **Frontend**: Vite, React 18, TypeScript, Tailwind CSS
- **Serverless-tausta**: Netlify Functions (`netlify/functions/news.ts`)
- **Tietokanta**: Neon PostgreSQL (uutisten lähde)
- **Laatutyökalut**: Vitest + Testing Library + `vitest-axe`, ESLint, `depcheck`, `npm audit`
- **Automaatiot**: GitHub Actions (`.github/workflows/ci.yml`), Weekly Digest -skripti (`scripts/digest.js`)

## Ympäristömuuttujat ja konfiguraatio

Kaikki ympäristömuuttujat luetaan `.env`-tiedostosta kehityksessä ja Netlifyssa tuotannossa. Aloita kopioimalla `.env.example` ja nimeä se `.env` (tai `.env.local`).

```bash
cp .env.example .env
```

| Muuttuja | Kuvaus |
| --- | --- |
| `VITE_NEWS_API_URL` | Julkinen API-osoite, josta frontend hakee uutiset. Kehityksessä `http://localhost:8888/.netlify/functions/news`. |
| `NEON_DATABASE_URL` | Neon-yhteyden `postgres://`-merkkijono Netlify Functionille. Sisältää käyttäjän, salasanan ja tietokannan. |

> **Muistutus käyttäjälle**: Luo Neon-projekti, generoi käyttäjä+salasana ja salli `require_ssl = true`. Tallenna `NEON_DATABASE_URL` Netlify-projektin environment-asetuksiin *Production*, *Deploy Preview* ja *Branch deploy* -ympäristöille sekä paikalliseen `.env`-tiedostoon. Netlifyssä voit hallita muuttujia komennolla `netlify env:set` tai verkkokäyttöliittymässä.

### Neon skeema

Netlify-funktio olettaa taulun rakenteen:

```sql
CREATE TABLE public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  link TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW()
);
```

Lisää vähintään muutama rivi tuotantoa varten. Julkaisussa tärkeät sarakkeet ovat `title`, `summary`, `link` (valinnainen) ja `published_at`.

## Paikallinen kehitys

1. Asenna riippuvuudet ja kopioi `.env`:
   ```bash
   npm install
   cp .env.example .env
   ```
2. **Mock-tila** (ei Neon-yhteyttä):
   - Aseta `.env`-tiedostoon `VITE_NEWS_API_URL=http://localhost:5173/mock/news.json`.
   - Tiedosto `public/mock/news.json` sisältää esimerkkidatan.
   - Käynnistä `npm run dev`.
3. **Neon-dev** (Netlify Functions + paikallinen Neon/remote Neon):
   - Säilytä `VITE_NEWS_API_URL=http://localhost:8888/.netlify/functions/news`.
   - Käytä Netlify CLI:tä: `netlify dev` (käynnistää sekä Vite-palvelimen että Netlify-funktion).
   - Varmista, että `.env` sisältää toimivan `NEON_DATABASE_URL`-merkkijonon.
4. **Staging**: luo erillinen Neon-tietokanta ja Netlify-ympäristö (esim. branch deploy), kopioi `.env`-asetus staging-arvoilla. Käytä Netlifyn `Context`-asetuksia, jotta staging ja tuotanto eriytyvät.

Tuotantobuild:
```bash
npm run build
```
`dist/`-hakemisto sisältää julkaistavat tiedostot.

## Laatu- ja turvallisuusprosessit

| Tarkistus | Komento |
| --- | --- |
| Linttaus | `npm run lint` |
| Testit (Vitest + Testing Library + axe) | `npm run test` (watch) / `npm run test:run` (CI) |
| Riippuvuuksien siivous | `npm run check:deps` |
| Turvallisuusauditointi | `npm run check:audit` |
| Täydellinen laatuajo | `npm run check:ci` |

GitHub Actions -putki (`CI`) suorittaa nämä kaikki sekä buildin jokaisella pull requestilla ja `main`-haaran pushilla.

### Testit

- `src/hooks/useUpdates.test.tsx`: varmistaa Neon API:n onnistuneen/failover-toiminnan.
- `src/__tests__/App.fallback.test.tsx`: UI näyttää fallback-sisällön virhetilanteessa.
- `src/__tests__/App.accessibility.test.tsx`: `axe`-a11y-tarkistus sekä tumma että valoisa teema.
- `src/__tests__/contrast.test.ts`: WCAG AA -kontrastitestit teemaväreille.

> **Käyttäjän tehtävä**: Aja `npm run check:ci` ennen jokaista PR:ää. Korjaa lint-varoitukset, koska ne katkaisevat CI:n.

## Uutiset ja ajankohtaista Netlify + Neon -putki

- Frontend käyttää `useUpdates`-hookia (`src/hooks/useUpdates.ts`), joka hakee `fetchUpdates`-palvelun kautta `VITE_NEWS_API_URL`-osoitteesta.
- Jos haku onnistuu, UI näyttää Neonin datan ja ilmoittaa onnistumisesta. Jos haku epäonnistuu tai palauttaa tyhjän listan, UI näyttää fallback-sisällön (`src/data/fallbackUpdates.ts`) ja kertoo syyn.
- Serverless-funktio `netlify/functions/news.ts` tekee SQL-kyselyn Neonista, rajaa 12 uusinta uutista ja palauttaa JSONin muodossa `{ updates: [...] }`.
- Netlify-konfiguraatio (`netlify.toml`) ohjaa pyynnön `/api/news` → `/.netlify/functions/news` ja määrittää build-komennot.

### Käyttäjän vastuulla

1. **Neon**: luo `news`-taulu ja syötä dataa. Lisää tarvittaessa migraatiotyökalu (esim. Prisma, Drizzle) jatkokehityksessä.
2. **Netlify**: aseta `NEON_DATABASE_URL`, `VITE_NEWS_API_URL` ja muut ympäristömuuttujat (tuotanto + deploy preview + branch deploy). Varmista, että `/.netlify/functions/news` toimii `netlify dev` -komennolla.
3. **Fallback-päivitykset**: päivitä `src/data/fallbackUpdates.ts`, jos haluat muuttaa varmuuskopioviestejä. Fallbackia hyödynnetään vain jos Neon ei vastaa.

## Weekly Digest -putki

`scripts/digest.js` hakee RSS-lähteitä ja tuottaa viikoittaisen Markdownin `updates/`-hakemistoon. Skripti kirjaa virheet ja keskeyttää suorituksen, jos kaikki lähteet epäonnistuvat.

```bash
node scripts/digest.js
```

- Generoidut tiedostot (`updates/YYYY-wWW.md`) voidaan julkaista esim. sisäisenä uutiskirjeenä tai käyttää tulevan CMS-integraation pohjana.
- Lisää lähteitä muokkaamalla `SOURCES`-taulukkoa.
- GitHub Actions voidaan ajastaa ajamaan skripti (scheduler ei sisälly tähän repoon).

## Julkaisu Netlifyyn

1. Ota Netlifyssä käyttöön tämä repo.
2. Lisää ympäristömuuttujat (`NEON_DATABASE_URL`, `VITE_NEWS_API_URL`). Julkisen muuttujan voit asettaa muotoon `/.netlify/functions/news`, jolloin asiakas käyttää Netlifyä proxy-nä.
3. Tarkista `netlify.toml` ja varmista, että build-komento (`npm run build`) ja `publish = dist` vastaavat tarpeita.
4. Kytke Netlify CLI paikalliseen kehitykseen (`npm install -g netlify-cli`, `netlify login`, `netlify link`).
5. Pidä Neonia varten erilliset tunnukset staging- ja tuotantoympäristöihin, jotta testidata ei sekoitu tuotantoon.

## Kehityschecklist

1. ✅ **Ympäristömuuttujat**: päivitä `.env` ja Netlify ympäristöasetukset (dev/staging/prod). Varmista, että `NEON_DATABASE_URL` toimii.
2. ✅ **Tietokanta**: ylläpidä `news`-taulun skeemaa ja siemendataa. Dokumentoi muutokset (esim. SQL-migraatiot).
3. ✅ **Laatukomennot**: ennen committeja `npm run lint`, `npm run test:run`, `npm run check:deps`, `npm run check:audit`.
4. ✅ **A11y ja teemat**: pidä tumma/vaalea-teema -kontrastit ajan tasalla (`src/__tests__/contrast.test.ts`).
5. ✅ **Weekly Digest**: aja skripti ja pushaa `updates/`-hakemistoon syntyvät tiedostot, jos koostetta tarvitaan.
6. ✅ **Monitorointi**: lisää virhelokit Netlify Functions -dashboardiin tai käytä omaa observability-palvelua (jatkokehitysidea).
7. ✅ **Dokumentaatio**: päivitä README tai sisäinen wiki, kun ympäristöihin tai tietomalleihin tulee muutoksia.

## Tunnetut jatkokehitysideat

- Lisää autentikointi Netlify Functioniin (esim. API-avain), jos uutisdatasta tulee arkaluonteista.
- Rakenna automaattinen migraatioputki (Prisma/Drizzle + Netlify build hookit).
- Lisää Storybook tai vastaava komponenttikirjasto visuaalisen regressiotestauksen tueksi.
- Laajenna Weekly Digest lukemaan `updates/`-hakemiston Markdownit suoraan UI:hin (nyt UI käyttää Neonia + fallbackia).

## Lisenssi

Tämä projekti on tarkoitettu Lapland AI Labin sisäiseen käyttöön.
