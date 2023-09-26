import { atom } from 'recoil';

interface Geolocation {
  lat: number;
  lon: number;
}

export const geolocationState = atom<Geolocation[]>({
  key: 'geolocation',
  default: [{ lat: 37.5666805, lon: 126.9784147 }],
});
