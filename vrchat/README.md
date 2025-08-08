# LilithTV VRChat Companion

This folder contains scaffolding to deploy the LilithTV overlay inside VRChat using the [VRChat Creator Companion](https://vcc.docs.vrchat.com/).

## Setup

1. Install the VRChat Creator Companion (VCC).
2. In VCC, create a new World project or open an existing one.
3. Add this package as a **local package**:
   - Click **Projects → Manage Project → Add**.
   - Choose `Add local package` and select this repository's `vrchat` folder.
4. Ensure `UdonSharp` and `Worlds` SDK packages are installed automatically via `vpmDependencies`.
5. Place the `LilithTVBridge` prefab or script into your scene to forward events to the web overlay.

## LilithTVBridge.cs

`Assets/LilithTV/Runtime/LilithTVBridge.cs` is an `UdonSharpBehaviour` stub that can be extended to relay world events to the LilithTV service (e.g., via HTTP or WebSockets). Customize the `apiUrl` field to point at your LilithTV instance.

## Building

Export the world through the VRChat SDK as usual. The companion package ensures all required dependencies are bundled.

## Security

- **Never** hardcode secrets inside the world; use secure remote endpoints.
- Rate limit and sanitize any inputs that reach the LilithTV service.
