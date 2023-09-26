import axios from 'axios';

const GEOCODING_BASE_URL = 'http://api.openweathermap.org/geo/1.0';
const API_KEY = { appid: process.env.REACT_APP_GEOCODING_ID };

export const getReverseGeocodingApi = async (lat?: number, lon?: number) => {
  if (!lat || !lon) return null;
  const { data } = await axios.get<ReverseGeocodingData[]>(`${GEOCODING_BASE_URL}/reverse`, {
    params: {
      ...API_KEY,
      lat,
      lon,
    },
  });

  return data[0].local_names?.ko ?? data[0].name;
};

export const getGeocodingApi = async (cityName: string) => {
  if (!cityName) return null;
  const { data } = await axios.get<GeocodingData[]>(`${GEOCODING_BASE_URL}/direct`, {
    params: {
      q: cityName,
      ...API_KEY,
    },
  });
  return data;
};
