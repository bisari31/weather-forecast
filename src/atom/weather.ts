import { atom } from 'recoil';
import type { AtomEffect } from 'recoil';

interface Coordinate {
  lat: number;
  lon: number;
}

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const coordinatesState = atom<Coordinate[]>({
  key: 'coordinatesState',
  default: [{ lat: 37.5666805, lon: 126.9784147 }],
  effects_UNSTABLE: [localStorageEffect('coordinates')],
});
