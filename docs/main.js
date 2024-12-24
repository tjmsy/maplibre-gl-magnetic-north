import { MagneticNorthControl } from 'https://cdn.jsdelivr.net/gh/tjmsy/maplibre-gl-magnetic-north/src/maplibre-gl-magnetic-north.js';

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://tiles.openfreemap.org/styles/liberty',
  center: [0, 0],
  zoom: 1,
  hash: true,
});
map.addControl(new maplibregl.NavigationControl(), 'top-right');
map.addControl(
  new MagneticNorthControl({
    apiProxyUrl: 'https://apiproxymagneticnorth.azurewebsites.net/api/getMagneticHeading',
  }),
  'top-left',
);
