# Old City Portal Hub

This is now a mobile-ready installable web app for the Old City portal. It works on iPhone and Android through the browser and can be added to the home screen like an app.

## What it includes

- dashboard overview
- sales hub pipeline table
- mandates tracker
- portal activity feed
- team execution board
- installable phone app behavior through a web app manifest
- offline caching through a service worker
- mobile layout optimized for smaller screens

## How to open it on a phone

You should serve this folder from a local or hosted web server. Opening the raw file directly will not fully enable install and offline features.

For a quick local test on your computer, from this folder run:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

To use it on your phone:

1. Put this app on a host your phone can reach, such as GitHub Pages, Netlify, Vercel, or your company server.
2. Open the hosted URL on the phone.
3. On iPhone, tap Share then Add to Home Screen.
4. On Android, open the browser menu then tap Install App or Add to Home Screen.

## Key files

- `index.html`: app shell and phone metadata
- `styles.css`: desktop and mobile responsive styling
- `app.js`: app behavior and service worker registration
- `site.webmanifest`: installable app configuration
- `service-worker.js`: offline caching
- `icon.svg`: app icon

## Where to connect the real portal

The mock data lives in `portalApi.getPortalSnapshot()` inside `app.js`.

When Old City gives you real access details, replace that mock function with:

- a `fetch()` call to the portal API
- authentication headers or tokens
- response mapping to fit the UI model

## Important note

This is an installable web app, not an App Store package yet. If Old City eventually wants a true downloadable iOS and Android store app, the next step would be wrapping this in Capacitor or rebuilding it in React Native or Flutter.
