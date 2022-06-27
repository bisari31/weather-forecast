import { axios } from 'hooks/worker';

const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export const getGeoCodingLatlngApi = (params1: number, parmas2: number) =>
  axios.get(BASE_URL, {
    params: {
      latlng: `${params1}, ${parmas2}`,
      key: process.env.REACT_APP_GEOCODING_ID,
    },
  });

export const getGeoCodingApi = (address: string) =>
  axios.get(BASE_URL, {
    params: {
      address,
      key: process.env.REACT_APP_GEOCODING_ID,
    },
  });
