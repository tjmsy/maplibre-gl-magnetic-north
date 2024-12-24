# maplibre-gl-magnetic-north

A custom control for [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js/) that enables users to:
- Align the map's heading to magnetic north based on the user's current location.
- Customize API keys and proxy URLs for accessing geomagnetic data.

The magnetic heading is calculated using the latitude and longitude at the center of the map view, making use of data from [NOAA](https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml)'s geomagnetic API or a user-specified proxy.

---

## Demo  
[Demo](https://tjmsy.github.io/maplibre-gl-magnetic-north/)

## Usage  

### 1. Include the JavaScript and CSS files  

```html
<!-- Include the JavaScript file -->
<script src="https://cdn.jsdelivr.net/gh/tjmsy/maplibre-gl-magnetic-north@0.1.0/src/maplibre-gl-magnetic-north.js"></script>

<!-- Include the CSS file -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tjmsy/maplibre-gl-magnetic-north@0.1.0/src/maplibre-gl-magnetic-north.css" />
```

### 2. Add the Magnetic North Control to your MapLibre map

```javascript
import { MagneticNorthControl } from 'https://cdn.jsdelivr.net/gh/your-github-username/maplibre-gl-magnetic-north@0.1.0/src/maplibre-gl-magnetic-north.js';

// Initialize the control
const magneticNorthControl = new MagneticNorthControl({
  apiKey: 'YOUR_NOAA_API_KEY', // Replace with your NOAA API key
// IMPORTANT: Avoid hardcoding your API key directly in your source code if sharing the project publicly.
// Instead, consider using environment variables or a server-side proxy for better security.
  apiProxyUrl: 'https://your-proxy-server.com', // Optional: Specify a proxy URL
});

// Add the control to your map
map.addControl(magneticNorthControl);
```

---

## API Proxy Configuration

If you need to use a proxy for API requests due to CORS restrictions or other reasons, you can specify the `apiProxyUrl` option. The proxy should forward requests to `https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination`.

Example proxy request format:
```javascript
const params = new URLSearchParams({
  lat1: latitude,
  lon1: longitude,
  key: apiKey,
  resultFormat: 'json'
});

await fetch(`https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?${params.toString()}`);
```

---

## Feedback & Contributions

Feel free to open an issue, start a discussion, or reach out with any feedback or suggestions!

Contributions are always welcome!