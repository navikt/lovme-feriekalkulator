# LovMe-Feriekalkulator


## Teknologier brukt


|        Title         |           Name            | 
|:--------------------:|:-------------------------:|
|        Språk         |     React + Typescript    | 
|        Tests         |                           |  
|        Container     |          Docker           | 
|        Hosting       |           NAIS            | 
|        Design        |          Aksel            | 



## Struktur
### Kildekode
```
.
├── Dockerfile
├── README.md
├── nais.yaml
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── server.js
├── src
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── Dockerfile
│   ├── components
│   │   ├── Dato.tsx
│   │   └── TestComponent.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── tsconfig.json
└── yarn.lock
```


## Oversikt

Visjon:

- Bruker kan planlegge utenlandsopphold og får vite om det planlagte oppholdet får konsekvenser for medlemskapet
- Bruker kan selv generere sin egen bekreftelse på medlemskapet (til bruk når bruker skal tegne reiseforsikring)
- NAV tar vare på de opplysningene bruker ønsker at NAV skal få kjennskap til og bruker får mulighet til å laste opp "bevis" mens opplysningene er ferske
- Bruker kan på en enkel måte være med å bygge opp sin egen oversikt over sitt medlemskapet i folketrygden.
- NAV legger opplysningene til grunn på et senere tidspunkt.
- Feriekalkulatoren kan lages for brukere som er bosatt (trygdemessig) i Norge og som ønsker å tilbringe flere perioder utenfor Norge

## Bruk

#### Installere avhengigheter
```
cd lovme-feriekalkulator
yarn install
```

#### Start opp frontend-applikasjonen
```
yarn start
```

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.  
Interne henvendelser kan sendes via Slack i kanalen #team-lovme.

## Languages and Tools
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)



