# Venezuela — Scroll Experience

An immersive, scroll-driven landing page about Venezuela, built with [Astro](https://astro.build/), [React](https://react.dev/) and [GSAP](https://gsap.com/). As the user scrolls, an animated SVG map draws itself, a parallax title fades away, and an image gallery reveals itself with staggered animations. Background ambient audio can be toggled on and off.

## Features

- **Animated intro** — A centered title with a bouncing scroll indicator that fades out on scroll (`src/layouts/intro.tsx`).
- **Self-drawing SVG map** — The map of Venezuela strokes itself in as you scroll, using GSAP `ScrollTrigger` and path length animation (`src/ui/map-gsap.tsx`).
- **Scroll-reveal gallery** — A pinned, masonry-style image gallery with `SplitText` title animation and per-image reveal transitions (`src/layouts/gallery.tsx`).
- **Ambient audio toggle** — A floating button plays/pauses a looping background tone with accessible play/pause states (`src/pages/index.astro`).
- **Utility-first styling** — Styled with [Tailwind CSS](https://tailwindcss.com/) v4 via the Vite plugin.

## Tech Stack

- **Framework:** Astro 7
- **UI:** React 19
- **Animations:** GSAP 3 (`ScrollTrigger`, `SplitText`)
- **Styling:** Tailwind CSS 4

## Requirements

- Node.js `>=22.12.0`

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`.

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the local development server.      |
| `npm run build`   | Build the production site to `./dist/`.  |
| `npm run preview` | Preview the production build locally.    |
| `npm run astro`   | Run Astro CLI commands.                  |

## Project Structure

```text
├── data/
│   └── images.json        # Gallery image sources and alt text
├── public/
│   ├── images/            # Gallery images (.avif)
│   └── music/tone.mp3     # Background ambient audio
├── src/
│   ├── layouts/
│   │   ├── intro.tsx      # Intro title + scroll indicator
│   │   └── gallery.tsx    # Scroll-reveal image gallery
│   ├── pages/
│   │   └── index.astro    # Page entry point + audio toggle
│   ├── ui/
│   │   └── map-gsap.tsx   # Self-drawing SVG map animation
│   └── styles/
│       └── global.css     # Global styles
└── astro.config.mjs
```

## Adding Images

Drop new images into `public/images/` and register them in `data/images.json`:

```json
{
  "src": "/images/image-1.avif",
  "alt": "Venezuela 1"
}
```
