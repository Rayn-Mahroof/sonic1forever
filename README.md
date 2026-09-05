# Sonic 1 Forever — Web Port

A browser-based port of **Sonic 1 Forever v1.5.1** powered by Emscripten/WebAssembly.  
Works on desktop, Android, and **iOS** with full touch controls.

---

## 📁 Required File Structure

Place these files all in the **same folder** on your web server:

```
your-server-folder/
├── index.html          ← The web launcher (this port)
├── sw.js               ← Service worker (PWA/offline)
├── index.js            ← Emscripten JS glue (from the zip)
├── index.wasm          ← Game engine WebAssembly (from the zip)
├── Data.rsdk.xmf       ← Game data (from the zip)
└── favicon.ico         ← Icon (from the zip)
```

---

## 🚀 How to Host

### Option A — Python (local testing)
```bash
cd your-folder
python3 -m http.server 8080
# Open: http://localhost:8080
```

### Option B — GitHub Pages
1. Push all files to a GitHub repo  
2. Go to **Settings → Pages → Source: main branch / root**  
3. Access at `https://yourusername.github.io/repo-name/`

### Option C — Netlify / Vercel (drag & drop)
- Drag the entire folder onto [netlify.com/drop](https://app.netlify.com/drop)

### Option D — Any static host (Apache, Nginx, Caddy…)
The files are purely static. Just serve the folder.

> ⚠️ **Must be served over HTTP/HTTPS** — file:// protocol does NOT work because  
> WebAssembly and SharedArrayBuffer require a real server.

---

## 🎮 Controls

| Input | Action |
|-------|--------|
| Arrow Keys | Move |
| Z / X / Space | Jump / Special Action |
| Enter | Start / Pause |
| F | Toggle Fullscreen |
| M | Mute/Unmute |
| Esc | Close panels |

**Touch (mobile/iOS):** On-screen D-Pad and Jump button appear automatically on touch devices.

---

## 🎯 Mod Loader

The launcher includes a **Mod Manager**:

1. Click **"📁 Manage Mods"** on the splash screen (or in-game via the HUD)
2. Drop or browse for mod files:
   - **Full data replace:** Drop a `Data.rsdk` or `Data.rsdk.xmf` to replace the game's entire data
   - **Individual files:** Drop loose files to inject them into the engine's virtual filesystem
3. Click **Launch** — mods are active for this session

Mods are kept in memory for the current browser session and are **never uploaded**.

---

## 📱 iOS Notes

- Works in **Safari** on iOS 15+
- For best experience, tap **Share → Add to Home Screen** to run as a full-screen app
- Touch controls appear automatically and support multi-touch
- Audio may require a tap to start (browser restriction)

---

## ⚙️ Settings

Available via the HUD ⚙ button in-game:

| Setting | Description |
|---------|-------------|
| Touch Controls | Toggle the on-screen D-Pad/buttons |
| Pixel Filter | Smooth vs crisp (pixelated) rendering |
| HUD Bar | Show/hide the top control bar |
| Mute Audio | Silence all game audio |
| Lock Orientation | Force landscape mode on mobile |

---

## 🔧 Technical Details

- **Engine:** RSDK v3 (Retro-Sonic Engine), compiled to WebAssembly via Emscripten
- **Renderer:** SDL2 → Canvas 2D  
- **Audio:** SDL2 Mixer → Web Audio API  
- **Input:** Keyboard events + synthetic touch→keyboard mapping  
- **Filesystem:** Emscripten's in-memory FS with mod overlay support  
- **PWA:** Service Worker caches all assets for offline play

---

## 📜 Credits

- **Sonic 1 Forever** by the Sonic Forever team  
- **RSDK Decompilation / WebAssembly build** by the community  
- **Web launcher & mod system** — this project

Sonic the Hedgehog is © SEGA. This is a fan project.
