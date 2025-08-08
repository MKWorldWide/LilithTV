# LilithTV

Gemini-powered visual OS overlay for TVs and companion devices.

## Setup

1. Copy `.env.example` to `.env` and populate API keys.
2. Install dependencies: `npm install`.
3. Run lint and tests: `npm run lint && npm test`.
4. Start the development server: `npm run dev`.

## Scripts

- `npm run dev` – start local dev server via Vite (React front-end).
- `npm run build` – production build.
- `npm run preview` – preview build output.
- `npm run lint` – run ESLint.
- `npm test` – execute unit tests via Vitest.

## Docker

Build and serve the app in a container:

```bash
docker build -t lilithtv .
docker run -p 4173:4173 lilithtv
```

For Raspberry Pi builds use `Dockerfile.pi`:

```bash
docker build -f Dockerfile.pi -t lilithtv-pi .
```

## Configuration

`lilithtv.config.json` controls runtime behavior:

- `chat_stream_url` – WebSocket endpoint for low-latency chat overlays.
- `plugins` – array of widget modules dynamically loaded at boot.
- `wake_word`, `theme`, `overlays`, `default_channel` – core behavior toggles.

Hot-swapping plugins only requires updating the config; no rebuild is necessary.

## Telemetry

OpenTelemetry is initialized with a console exporter for local development. Replace the exporter in `src/core/telemetry.js` with OTLP/Jaeger exporters for production tracing.

## VRChat Deployment

The `vrchat/` folder exposes a [Creator Companion](https://vcc.docs.vrchat.com/) package so the overlay can be dropped into VRChat worlds. Add the folder as a **local package** in VCC and use the `LilithTVBridge` script to forward world events to the web overlay.
