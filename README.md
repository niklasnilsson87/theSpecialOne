# nn222ia-project 

www.thespecialone.se

Niklas Nilsson (nn222ia)

[Projektets wiki](https://github.com/1dv430/nn222ia-project/wiki)

## Komma igång i utvecklingsläge

* Ladda ned repot på valfritt sätt
* Gå till mappen client
* Skriv `npm install`
* Gå till mappen server
* Skapa en .env fil och lägg till variablarna

   * DB_PATH=< lägg till din query sträng från mongoAtlas >
   * PORT=5000
   * JWT_SECRET=< lägg till din hemliga sträng >
   * NODE_ENV=development

* Skriv `npm install`
* Skriv `npm run dev` för att starta både server och klient

## Testning

Testningen finns dokumenterad på projektets wiki [testrapport](https://github.com/1dv430/nn222ia-project/wiki/Test-Rapport)

Utför "Komma igång i utvecklingsläge" innan testningen på servern kan påbörjas

### Server testning

* Gå till server mappen
* Skriv `npx mocha -t 80000` för att starta testningen på servern.
* Rapporten skrivs ut i terminalen

### Klient testning

Jag använder mig utav Selenium Webdriver som startar upp webläsaren chrome och navigerar och
utför uppgifter

* Gå till client mappen
* Skriv `npm test` för att starta selenium Webdriver
* Rapporten skrivs ut i terminalen