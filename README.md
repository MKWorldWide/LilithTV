# LilithTV

[![CI Status](https://github.com/MKWorldWide/LilithTV/actions/workflows/ci.yml/badge.svg)](https://github.com/MKWorldWide/LilithTV/actions)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Gemini-powered visual OS overlay for TVs and companion devices. A modern, extensible platform for creating interactive overlays with support for VRChat integration.

## ✨ Features

- 🖥️ React-based UI with Vite for fast development
- 🎮 VRChat integration through Creator Companion
- 🐳 Docker support for easy deployment
- 📱 Responsive design for various screen sizes
- 🔌 Plugin system for extending functionality
- 📊 Built-in telemetry with OpenTelemetry

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or pnpm 8+
- Docker (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MKWorldWide/LilithTV.git
   cd LilithTV
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with pnpm
   # pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Development

Start the development server:

```bash
npm run dev
# or with pnpm
# pnpm dev
```

The application will be available at `http://localhost:5173`

## 🧪 Testing

Run the test suite:

```bash
npm test
# or with pnpm
# pnpm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## 🏗️ Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🐳 Docker

### Development

Build and run the development container:

```bash
docker build -t lilithtv-dev -f Dockerfile .
docker run -p 5173:5173 -v $(pwd):/app lilithtv-dev
```

### Production

Build and serve the production app in a container:

```bash
docker build -t lilithtv .
docker run -p 4173:4173 lilithtv
```

### Raspberry Pi

For Raspberry Pi builds use `Dockerfile.pi`:

```bash
docker build -f Dockerfile.pi -t lilithtv-pi .
```

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env` and update the values:

```env
VITE_APP_TITLE=LilithTV
VITE_API_URL=http://localhost:3000
# Add other environment variables as needed
```

### Runtime Configuration

`lilithtv.config.json` controls runtime behavior:

```json
{
  "chat_stream_url": "ws://localhost:3000/chat",
  "plugins": ["chat", "notifications", "media"],
  "wake_word": "hey lilith",
  "theme": "dark",
  "overlays": {
    "chat": true,
    "alerts": true,
    "media": true
  },
  "default_channel": "home"
}
```

#### Configuration Options

- `chat_stream_url`: WebSocket endpoint for low-latency chat overlays
- `plugins`: Array of widget modules to load at startup
- `wake_word`: Voice activation phrase (if voice control is enabled)
- `theme`: UI theme ('light', 'dark', or 'system')
- `overlays`: Toggle specific overlay components
- `default_channel`: Default view to load on startup

## 🔌 Plugins

LilithTV supports dynamic plugin loading. Add plugins to the `plugins` array in the config file to enable them. Plugins are hot-reloaded when the config changes.

### Available Plugins

- **Chat**: Displays live chat messages
- **Media**: Shows currently playing media information
- **Notifications**: Displays system and user notifications
- **Voice**: Enables voice commands

### Creating a Plugin

1. Create a new file in `src/plugins/`
2. Export a default object with the following structure:

```javascript
export default {
  id: 'my-plugin',
  name: 'My Plugin',
  initialize: (config) => {
    // Initialize your plugin here
    return {
      // Return public API
      sayHello: () => console.log('Hello from My Plugin!'),
      // Cleanup function
      destroy: () => {
        // Clean up resources
      }
    };
  }
};
```

## 📊 Telemetry

OpenTelemetry is used for application monitoring. By default, it uses a console exporter for local development. For production, replace the exporter in `src/core/telemetry.js` with OTLP/Jaeger exporters.

## 🎮 VRChat Integration

The `vrchat/` folder contains a [Creator Companion](https://vcc.docs.vrchat.com/) package for VRChat integration.

### Setup

1. Add the `vrchat` folder as a **local package** in VRChat Creator Companion
2. Add the `LilithTVBridge` script to your world
3. Configure the bridge to forward world events to the web overlay

### Features

- Real-time chat relay
- Player tracking
- World state synchronization
- Interactive elements

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please open an issue in the [issue tracker](https://github.com/MKWorldWide/LilithTV/issues).

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes.

---

Made with ❤️ by MK Worldwide
