interface ReverseGeocodingData {
  country: string;
  lat: number;
  local_names: LocalNames;
  lon: number;
  name: string;
}

interface GeocodingData {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

interface LocalNames {
  en: string;
  ko: string;
}
