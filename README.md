# Rosa - Minimal Google Calendar

A Chrome extension that simplifies Google Calendar with a clean, distraction-free interface.

## Features

- **Clean UI**: Hides sidebars, removes clutter, and streamlines the calendar view
- **Focus Mode**: Dims past events to help you focus on what's next
- **Toggleable**: Easily turn features on/off with the popup menu
- **Lightweight**: Pure CSS and vanilla JavaScript, no dependencies

## Installation

### From Source (Development)

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `rosa` folder

### What Gets Hidden

- Left sidebar with calendar list
- Right sidebar (Tasks panel)
- Settings menu, support, and Google apps buttons
- Promotional banners
- Reduced visual clutter on event cards

## Usage

1. Visit [Google Calendar](https://calendar.google.com)
2. Click the Rosa extension icon in your toolbar
3. Toggle "Clean UI" to enable/disable the minimal interface
4. Toggle "Focus Mode" to dim past events

## Development

The extension consists of:

- `manifest.json` - Extension configuration
- `content/` - Scripts and styles injected into Google Calendar
- `popup/` - Extension popup UI for toggling features
- `icons/` - Extension icons (to be added)

## Requirements

- Chrome 88+ (Manifest V3 support)
- Works on all Chromium-based browsers (Edge, Brave, Arc, etc.)

## Roadmap

- [ ] Add extension icons
- [ ] Keyboard shortcuts (Ctrl+Shift+R to toggle)
- [ ] Custom color themes
- [ ] Hide specific calendar types
- [ ] Time blocking tools

## License

MIT
