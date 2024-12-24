export async function getMagneticHeading({ latitude, longitude, apiKey, apiProxyUrl }) {
  const baseUrl = apiProxyUrl || 'https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination';

  const params = new URLSearchParams({
    lat1: latitude,
    lon1: longitude,
    key: apiKey,
    resultFormat: 'json',
  });

  const apiUrl = `${baseUrl}?${params.toString()}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`HTTP Error: ${response.status}, Response: ${errorBody}`);
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    if (data.result && data.result[0] && data.result[0].declination !== undefined) {
      return data.result[0].declination;
    }
    throw new Error(`No declination data found for coordinates (${latitude}, ${longitude})`);
  } catch (error) {
    return null;
  }
}

export class MagneticNorthControl {
  constructor({ apiKey = null, apiProxyUrl = null } = {}) {
    this.container = null;
    this.button = null;
    this.map = null;
    this.apiKey = apiKey;
    this.apiProxyUrl = apiProxyUrl;
  }

  async alignWithMagneticNorth() {
    if (!this.map) return;

    const center = this.map.getCenter();
    const { lat, lng } = center;
    const magneticHeading = await getMagneticHeading({
      latitude: lat,
      longitude: lng,
      apiKey: this.apiKey || undefined,
      apiProxyUrl: this.apiProxyUrl || undefined,
    });

    if (magneticHeading !== null) {
      this.map.setPitch(0, { duration: 500 });
      this.map.rotateTo(magneticHeading, { duration: 500 });
    }
  }

  addMagneticNorthButton() {
    this.container = document.createElement('div');
    this.container.className = 'magnetic-north-button maplibregl-ctrl maplibregl-ctrl-group';

    const button = document.createElement('button');
    button.textContent = '🧭';
    button.addEventListener('click', this.alignWithMagneticNorth.bind(this));
    this.container.appendChild(button);

    this.button = button;
  }

  onAdd(map) {
    this.map = map;
    this.addMagneticNorthButton();
    return this.container;
  }

  onRemove() {
    this.button.removeEventListener('click', this.onButtonClick);
    this.container.parentNode.removeChild(this.container);
    this.map = null;
  }
}
