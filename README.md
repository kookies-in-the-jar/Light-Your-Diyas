# Light Your Diyas

A single-page web app for celebrating Deepavali (Diwali) online. Visitors can light a digital diya, design and share personalized greeting cards, explore a rangoli gallery, set off virtual fireworks, and leave a blessing on a community wish wall. All sound is generated in the browser, so the app ships with no audio files.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Sharing Blessing Links](#sharing-blessing-links)
- [Project Structure](#project-structure)
- [Notes](#notes)
- [License](#license)

## Features

### Light a Diya
An interactive diya altar at the top of the page. Touching the diya lights it and plays a bell chime. A silent prayer modal lets visitors offer a blessing in a quiet, meditative moment.

### Personalized Wishes
A greeting card designer with:
- Recipient and sender name fields
- Preset blessing messages, or a custom message
- Three color themes: amber, emerald, and crimson
- Download of the finished card as an 800 x 950 PNG, rendered client-side on an HTML5 canvas
- A shareable link that encodes the card, plus sharing through WhatsApp, Twitter, SMS, or the native device share sheet

### Received Blessing Card
When someone opens a shared link, a modal presents the card addressed to them. They can download it, light a diya in return, or reply with a card of their own.

### Rangoli Gallery
A curated gallery of rangoli and kolam artwork, grouped by category (diya, kolam, floral, mandala). Visitors can like items, copy share links, and open a detail view for each piece.

### Virtual Fireworks
A canvas-based fireworks display with click-to-launch bursts and several firework types (rocket, chakri, anar, and burst), each with its own synthesized sound.

### Community Wish Wall
A wall of blessings with a form for adding your own name, location, and message.

### Ambient Music
A procedurally generated tanpura drone with sitar-style plucks in Raag Yaman, toggled from the header. Sound effects, including key clicks, chimes, and firework sounds, are produced with the Web Audio API.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS 4 |
| Animation | Motion |
| Icons | Lucide React |
| Audio | Web Audio API (no audio assets) |
| Graphics | HTML5 Canvas |
| Fonts | Playfair Display, Plus Jakarta Sans (Google Fonts) |

## Getting Started

### Prerequisites

- Node.js (a recent LTS release; 20.19 or later is recommended for the current Vite version)
- npm

### Installation

```bash
git clone https://github.com/kookies-in-the-jar/Light-Your-Diyas.git
cd Light-Your-Diyas
npm install
```

### Run the Development Server

```bash
npm run dev
```

The app is served at `http://localhost:3000` and is also reachable on your local network, since the dev server binds to `0.0.0.0`.

### Build for Production

```bash
npm run build
npm run preview
```

The production build is written to the `dist/` directory.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Type-check the project with `tsc --noEmit` |
| `npm run clean` | Remove `dist/` and `server.js` |

## Configuration

The repository includes a `.env.example` file with two variables:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | API key for Gemini calls. Injected automatically when the project runs in Google AI Studio. |
| `APP_URL` | The URL where the app is hosted. Injected automatically in AI Studio. |

To set these locally, copy the example file and fill in your values:

```bash
cp .env.example .env
```

The current front-end code does not call the Gemini API, so the app runs without a key. Files matching `.env*` are git-ignored, except `.env.example`.

## Sharing Blessing Links

Personalized cards are shared through URL query parameters. Opening a link with `to` and `from` set displays the blessing modal automatically.

| Parameter | Required | Description |
| --- | --- | --- |
| `to` | Yes | Recipient name |
| `from` | Yes | Sender name |
| `msg` | No | Blessing message (a default message is used if omitted) |
| `theme` | No | `amber`, `emerald`, or `crimson` (defaults to `amber`) |

Example:

```
http://localhost:3000/?to=Ananya&from=Rohan&theme=crimson&msg=Happy%20Deepavali
```

## Project Structure

```
Light-Your-Diyas/
├── index.html              # HTML entry point, fonts, and meta tags
├── metadata.json           # AI Studio app metadata
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── public/
│   └── assets/aistudio/    # Static assets
└── src/
    ├── main.tsx            # React entry point
    ├── App.tsx             # Page layout, shared state, and link handling
    ├── index.css           # Global styles
    ├── assets/images/      # Rangoli and diya artwork
    ├── types/
    │   └── index.ts        # Shared TypeScript types
    ├── utils/
    │   └── audio.ts        # Web Audio synthesis (chimes, fireworks, ambient drone)
    └── components/
        ├── Header.tsx                # Navigation and ambient music toggle
        ├── HeroDiya.tsx              # Interactive diya altar
        ├── BentoGrid.tsx             # Fireworks, featured rangoli, and wisdom tiles
        ├── FireworksCanvas.tsx       # Canvas fireworks engine
        ├── CardCreator.tsx           # Greeting card designer and sharing
        ├── ReceivedBlessingModal.tsx # Card shown to recipients of shared links
        ├── BlessingModal.tsx         # Silent prayer modal
        ├── RangoliShowcase.tsx       # Rangoli gallery
        ├── WishWall.tsx              # Community blessings
        ├── Footer.tsx                # Share and copy-link actions
        └── Toast.tsx                 # Toast notifications
```

## Notes

- The wish wall and gallery likes are handled in client-side state. There is no backend, so these do not persist between sessions or sync between visitors.
- Browsers block audio until the user interacts with the page, so sound begins after the first click or tap.
- `package.json` still uses the placeholder name `react-example`, and a few dependencies (`express`, `dotenv`) are not used by the current front-end code.

## License

Source files carry an Apache-2.0 license header. The repository does not currently include a `LICENSE` file; add one if you want the terms to be explicit for contributors and users.
