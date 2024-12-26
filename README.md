# maplibre-gl-magnetic-north

A custom control for [MapLibre GL JS](https://github.com/maplibre/maplibre-gl-js/) that enables users to:
- Align the map's heading to magnetic north based on the coordinates of the map's center.
- Customize API keys or configure API proxy URL for accessing geomagnetic data.

The magnetic heading is calculated using the latitude and longitude at the center of the map view. It retrieves geomagnetic data from [NOAA](https://www.ngdc.noaa.gov/geomag/calculators/magcalc.shtml)'s API, or alternatively, a user-configured proxy that includes the necessary API key.

---

## Demo  
[Demo](https://tjmsy.github.io/maplibre-gl-magnetic-north/)

## Usage  

Import from CDN.

```javascript
import { MagneticNorthControl } from 'https://cdn.jsdelivr.net/gh/tjmsy/maplibre-gl-magnetic-north@v0.1.0/src/maplibre-gl-magnetic-north.js';
```

Add control.

```javascript
// Specify either apiKey or apiProxyUrl, but not both.
// Avoid hardcoding apiKey in public code;
// use a user-configured API proxy that includes the API key in requests to the NOAA API,
// or use environment variables for security.
const magneticNorthControl = new MagneticNorthControl({
  apiKey: 'YOUR_NOAA_API_KEY', // Replace with your NOAA API key
  apiProxyUrl: 'https://your-proxy-server.com', // Optional: Specify a proxy URL
});

// Add the control to your map
map.addControl(magneticNorthControl);
```

---

## Feedback & Contributions

Feel free to open an issue or reach out with any feedback or suggestions!

Contributions are always welcome!
