# ItsTime

A clean, minimal desktop **Timer & Stopwatch** app (inspired by Microsoft Clock). Built with **Electron Forge (webpack)** and **React + Tailwind**. Timers persist locally in SQLite and the app can speak a message when a timer finishes.

---

## Table of contents

* [ Screenshots](#screenshots)
* [Features](#features)
* [Tech stack](#tech-stack)
* [Install & run](#install--run)
* [Scripts](#scripts)
* [Preload / IPC API (exact names)](#preload--ipc-api-exact-names)
* [SQLite schema](#sqlite-schema)
* [Project structure (high-level)](#project-structure-high-level)
* [How it works (high-level)](#how-it-works-high-level)
* [Roadmap / TODO](#roadmap--todo)
* [Contributing](#contributing)
* [License](#license)

---

## Screenshots


```markdown
![Main view](assets/screenshots/main-view.png)
![Timer card](assets/screenshots/timer-card.png)
```


---

## Features

* Create / edit / delete timers
* Timers can include an optional message that will be spoken via TTS (`say`) when the timer finishes
* Default ringtone plays when a timer finishes
* Stopwatch with Start / Pause / Reset and Lap marking
* Local persistence using SQLite (`better-sqlite3`)
* Secure IPC via a `preload` bridge (`contextBridge.exposeInMainWorld`)
* TypeScript + Node ESM in the main process

Planned (future): Settings screen, Alarm screen, custom ringtones, export laps.

---

## Tech stack

* Electron (Electron Forge + webpack)
* React (frontend)
* Tailwind CSS (styling)
* TypeScript (renderer & main)
* Node ESM (`"type": "module"` in `package.json`)
* `better-sqlite3` for local storage
* `say` for text-to-speech

---

## Install & run

```bash
git clone https://github.com/LH-10/ItsTime-ElectronProject.git
cd ItsTime-ElectronProject
npm install
npm run dev:start   # or: npm start
```

Build / package:

```bash
npm run package
npm run make
```

---

## Scripts

Your `package.json` scripts:

```json
"scripts": {
  "dev:start": "electron-forge start",
  "start": "electron-forge start",
  "package": "electron-forge package",
  "make": "electron-forge make",
  "publish": "electron-forge publish",
  "lint": "eslint --ext .ts,.tsx ."
}
```

`npm install` will install dependencies; use `npm run dev:start` or `npm start` to run the app in development.

---

## Preload / IPC API (exact names)

In `preload.ts` you expose the API as: #this code is there in preload folder timerpreload file

```ts
contextBridge.exposeInMainWorld('timeApi', {
  timer: {
    addNewTimer: /* function */,
    editTimer:   /* function */,
    deleteTimer: /* function */,
  }
});
```

* The exposed object name is `timeApi`.
* Timer APIs live at `timeApi.timer.*`.
* Recommended: implement these functions using `ipcRenderer.invoke(...)` inside the preload so they return `Promise`s (main process handles DB operations).

---

## SQLite schema

Timers are stored in a local SQLite table. The fields are:

* `id` — unique identifier for each timer, **INTEGER PRIMARY KEY AUTOINCREMENT**
* `seconds` — total duration in seconds (INTEGER)
* `title` — human-readable title for the timer (TEXT)
* `message` — optional message to be spoken when the timer ends (TEXT)

Example conceptual CREATE statement: #Its included in the index.ts file

```sql
CREATE TABLE IF NOT EXISTS timers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  seconds INTEGER NOT NULL,
  title TEXT,
  message TEXT
);
```

Notes:

* All create / update / delete operations are performed in the **main** process and persisted with `better-sqlite3`.
* On app startup the main process reads the `timers` table and serves data to the renderer through the preload API.

---

## Project structure (high-level)

```
The-app/
├─ src/
│  ├─ alarms/            # future alarm logic
│  ├─ app-assets/
│  ├─ database/          # sqlite wrappers and schema (timers table)
│  ├─ ipc/               # ipc channel definitions / handlers (main)
│  ├─ preload/           # preload.ts - exposes timeApi
│  ├─ React/             # React app (components, pages)
│  ├─ types/             # shared TS types
│  ├─ ui-assets/
│  ├─ index.css
│  ├─ index.html
│  ├─ index.ts           # Electron main (ESM)
│  ├─ preload.ts
│  ├─ renderer.ts
│  
├─ .eslintrc.json
├─ forge.config.ts
├─ package.json
```

---

## How it works (high-level)

* **Persistence:** timers data is stored locally in SQLite (`better-sqlite3`). The main process accesses the DB.
* **IPC & Security:** `preload.ts` exposes `timeApi` via `contextBridge.exposeInMainWorld`. Renderer calls `timeApi.timer.*` to request create / update / delete operations from the main process. Renderer does not access `ipcRenderer` directly.
* **Timer finish:** when a timer reaches zero the app plays the default ringtone and uses `say` to speak the timer `message` (if provided).
* **Syncing:** main process handles DB changes and returns results to the renderer so UI stays in sync.

---

## Roadmap / TODO(Features I have to add)

* Settings screen (app preferences)
* Alarm screen (scheduled alarms, repeats)
* Allow custom ringtones
* Export / save stopwatch laps locally
* Add tests and CI
* Accessibility and keyboard shortcuts

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/some-feature`
3. Make changes & test locally
4. Open a PR with a clear description

Please open issues for bugs or feature requests.

---

## License

This project is licensed under the MIT License.

---


