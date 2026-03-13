# legaltechweb

Jednoduchý web s kontaktným formulárom, ktorý vždy odošle vyplnené údaje na `mojmi.mochnac@gmail.com` cez Resend.

## Spustenie

1. Nainštaluj závislosti:
   ```bash
   npm install
   ```
2. Vytvor `.env` súbor podľa `.env.example` a nastav `RESEND_API_KEY`.
3. Spusť server:
   ```bash
   npm start
   ```
4. Otvor `http://localhost:3000`.

## Poznámky

- Cieľová adresa príjemcu je napevno v `server.js` ako `mojmi.mochnac@gmail.com`.
- API kľúč nedávaj priamo do kódu ani do repozitára.
