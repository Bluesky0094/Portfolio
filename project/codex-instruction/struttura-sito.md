# SITE STRUCTURE INSTRUCTIONS — Flat Projects Index Layout

Questo file definisce esclusivamente le istruzioni sulla struttura del sito.
È vincolante per Codex durante lo sviluppo.

Modalità scelta: progetti con file index nominati, senza sottocartelle.

---

## OBIETTIVO DELLA STRUTTURA

- Sito statico (HTML / CSS / JS)
- Gestione di molti progetti
- Struttura semplice e leggibile
- Nessuna nidificazione inutile
- Compatibilità totale con Five Server
- Separazione netta tra:
  - codice del sito
  - asset globali
  - media portfolio
  - file di progetto / istruzioni

---

## STRUTTURA CANONICA DEL PROGETTO

PORTFOLIO/
├─ src/
│ ├─ pages/
│ │ ├─ about.html
│ │ ├─ contact.html
│ │ ├─ projects/
│ │ │ ├─ bar-giannone-index.html
│ │ │ ├─ friginfest-index.html
│ │ │ ├─ amazon-kdp-index.html
│ │ │ └─ <project-name>-index.html
│ │ └─ index.html 
│ ├─ assets/
│ │ ├─ css/
│ │ │ └─ styles.css
│ │ ├─ js/
│ │ │ └─ main.js
│ │ ├─ img/
│ │ ├─ fonts/
│ │ └─ downloads/
│ │
│ └─ media/
│ ├─ bar-giannone/
│ ├─ friginfest/
│ ├─ amazon-kdp/
│ ├─ menu-design/
│ ├─ portfolio-video-editor/
│ └─ <project-name>/
│
├─ index.html
│
├─ project/
│ ├─ codex-instruction/
│ │ ├─ AGENTS.md
| | ├─ config.toml
│ │ └─ struttura-sito.md
│ └─ notes/
│
└─ README.md

---


---

## REGOLE OBBLIGATORIE

### 1. Pagine progetto
- Tutti i progetti devono stare nella stessa cartella:
  `src/pages/projects/`
- Ogni progetto è un singolo file HTML
- Vietato creare sottocartelle per i progetti

Formato obbligatorio:
`src/pages/projects/<project-name>-index.html`

### 2. Media progetto
- Ogni progetto ha una sola cartella media dedicata
- Percorso obbligatorio:
`src/media/<project-name>/`

### 3. Coerenza dei nomi
Il `<project-name>` deve essere identico:
- nel nome del file HTML
- nel nome della cartella media
- nei link interni

---

## REGOLE DI RIGORE (NAMING & VALIDATION)

### 1. Standard naming (slug)
- Solo minuscole, numeri e trattini
- Pattern obbligatorio: `^[a-z0-9-]+$`
- Vietati spazi, underscore e caratteri speciali
- Lunghezza consigliata: 3–40 caratteri

Esempi validi:
`bar-giannone`, `amazon-kdp`, `menu-design`

Esempi NON validi:
`BarGiannone`, `menu_design`, `menu design`

### 2. Regola 1:1 tra file e media
Se esiste uno dei due, deve esistere anche l’altro:
- `src/pages/projects/<project-name>-index.html`
- `src/media/<project-name>/`

### 3. Invarianti sui percorsi
Usare sempre percorsi assoluti dal root del progetto:
- CSS: `/src/assets/css/styles.css`
- JS: `/src/assets/js/main.js`
- Media: `/src/media/<project-name>/...`

### 4. Struttura minima media
Obbligatoria:
- `src/media/<project-name>/cover.*` (jpg/png/webp)

Opzionale:
- `src/media/<project-name>/gallery/`
- `src/media/<project-name>/video/`

### 5. Indicizzazione obbligatoria
Ogni pagina progetto deve essere linkata in:
- `src/pages/index.html`

### 6. Regola anti-duplicati
- Vietati slug duplicati anche con varianti di maiuscole
- Ogni slug deve essere unico e stabile nel tempo

### 7. Checklist creazione progetto
1. Scegli uno slug valido
2. Crea `src/pages/projects/<project-name>-index.html`
3. Crea `src/media/<project-name>/` con `cover.*`
4. Aggiungi link in `src/pages/index.html`

---

## CONVENZIONE DEI PERCORSI (CRITICA)

Usare esclusivamente percorsi assoluti dal root del progetto.

Esempi corretti:
```html
<link rel="stylesheet" href="/src/assets/css/styles.css">
<script src="/src/assets/js/main.js"></script>
<img src="/src/media/bar-giannone/cover.jpg">

