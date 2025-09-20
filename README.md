# Lapland AI Lab -sivusto

Lapland AI Labin verkkosivuston koodi. Projekti on rakennettu Vite + React + TypeScript -pinolla ja tyylitetty Tailwind CSS:llä.

## Teknologiat

- [Vite](https://vitejs.dev/) nopeaan kehitykseen ja buildaukseen
- [React](https://react.dev/) käyttöliittymän rakentamiseen
- [TypeScript](https://www.typescriptlang.org/) tyypitettyyn kehitykseen
- [Tailwind CSS](https://tailwindcss.com/) tyylien hallintaan

## Kehitysympäristön käynnistäminen

1. Asenna riippuvuudet:

   ```bash
   npm install
   ```

2. Käynnistä kehityspalvelin:

   ```bash
   npm run dev
   ```

3. Luo tuotantoversio:

   ```bash
   npm run build
   ```

   Generoitu tuotantoversio löytyy `dist/`-hakemistosta.

## Projektirakenne

- `src/components` sisältää uudelleenkäytettävät käyttöliittymäkomponentit, kuten navigaation ja footerin
- `src/sections` jakaa etusivun selkeisiin sisältöosiin (hero, painopisteet, ohjelmat, yhteystiedot)
- `src/data` kokoaa staattiset sisältö- ja navigaatiotiedot yhteen paikkaan
- `src/types` määrittelee ja jakaa tyypit datarakenteille

## Lisenssi

Tämä projekti on tarkoitettu Lapland AI Labin sisäiseen käyttöön.
