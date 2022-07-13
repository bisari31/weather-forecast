import { atom } from 'recoil';
import { IWeatherData } from 'types/weather';

interface IGeolocation {
  lat: number;
  lon: number;
}

export const geolocationState = atom<IGeolocation[]>({
  key: 'geolocationState',

  default: [{ lat: 37.5666805, lon: 126.9784147 }],
});

export const geolocationStateData = atom<IWeatherData[]>({
  key: 'geolocationStateData',

  default: undefined,
});
