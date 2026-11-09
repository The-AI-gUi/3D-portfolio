# Satyam Gupta — Immersive 3D Portfolio

A scene-first, interactive 3D portfolio built with Next.js 15, TypeScript, React Three Fiber, Three.js, Drei and Framer Motion.

## Start locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add your existing images

Copy your existing image files into the `public` folder (not `public/images`):

- `public/satyam-hero.png`
- `public/adrishya-prototype.png`

The project references these exact paths.

## Background music

Use the MUSIC control in the bottom dock, then select an audio file from your device. The chosen file plays locally in the browser; it is not uploaded to the site or committed to the repository. Browsers require a user action before audio playback.

To bundle a permanent soundtrack instead, place an MP3 at `public/audio/portfolio-ambient.mp3` and adapt the audio source in `app/page.tsx`.

## Included interactions

- Full-screen real-time Three.js / React Three Fiber world with a central energy core, orbiting navigation nodes, trails, stars and particles.
- Click 3D nodes, top navigation or side navigation to jump between portfolio zones.
- Three themes: Dark, Light and Cyber; theme selection persists in local storage.
- Optional UI sound effects and a local background music picker.
- Responsive layouts and reduced-motion CSS support.

## Notes

- No image or audio assets are fabricated. Add the two existing PNG files listed above.
- The Delhi Police internship is described as supervised exposure; edit the wording if your official role description differs.
- The ESP-based smart-home project is intentionally not labelled ESP8266 or ESP32 because the exact board model has not been confirmed.
