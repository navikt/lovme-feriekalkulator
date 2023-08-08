# LovMe-Feriekalkulator

## Innholdsfortegnelse
- [Bruk](#bruk)
- [Installere avhengigheter](#installere-avhengigheter)
- [Start opp applikasjonen](#start-opp-applikasjonen)
- [Struktur](#struktur)
- [Kildekode](#kildekode)
- [Oversikt](#oversikt)
- [Henvendelser](#henvendelser)
- [Languages and Tools](#languages-and-tools)
- [Regler](/docs/Regler.md)
- [Bugs](/docs/Bugs.md)


## Bruk

#### Installere avhengigheter
```bash
yarn install #or
npm install
```

#### Start opp applikasjonen
```bash
yarn run dev #or 
npm run dev
```


## Struktur
### Kildekode
```
.
├── Dockerfile
├── README.md
├── docs
│   ├── Bugs.md
│   └── Regler.md
├── jest.config.ts
├── nais.yaml
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── components
│   │   ├── ComboBox.tsx
│   │   ├── CountryChooser.tsx
│   │   ├── CustomDatePicker.tsx
│   │   ├── DateChooser.tsx
│   │   ├── JourneyTable.tsx
│   │   ├── Navbar.tsx
│   │   ├── Purpose.tsx
│   │   ├── SummaryCard.tsx
│   │   ├── VisualTimeline.tsx
│   │   └── editAndDelete
│   │       ├── DeleteModal.tsx
│   │       ├── EditAndDelete.tsx
│   │       ├── EditModal.tsx
│   │       └── EditTravel.tsx
│   ├── models
│   │   ├── Country.tsx
│   │   ├── TotalDaysAbroadAndTravel.ts
│   │   ├── Travel.tsx
│   │   └── YearlySummary.ts
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── api
│   │   │   ├── isAlive.ts
│   │   │   └── isReady.ts
│   │   └── index.tsx
│   ├── resources
│   │   ├── en
│   │   │   └── world.json
│   │   ├── eøs.json
│   │   ├── no
│   │   │   └── world.json
│   │   └── utenfor.tsx
│   ├── styles
│   │   └── globals.css
│   └── utilities
│       ├── ruleEngine.ts
│       └── summaryEngine.ts
├── tailwind.config.js
├── tests
│   └── ruleEngineTests.test.ts
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

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.  
Interne henvendelser kan sendes via Slack i kanalen #team-ferie-værsågod.

## Languages and Tools
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)



