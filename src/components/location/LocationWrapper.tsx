import { useEffect } from 'react';
import dayjs from 'dayjs';
import type { UseQueryResult } from 'react-query';

import styles from './locationWrapper.module.scss';

import LocationItem from './LocationItem';

interface Props {
  results: UseQueryResult<WeatherData, unknown>[];
}

const LocationWrapper = ({ results }: Props) => {
  useEffect(() => {
    if (!results[0].data) return;
    const { sunrise, sunset } = results[0].data.current;
    const [currentTime, sunriseTime, sunsetTime] = [0, sunrise, sunset].map(
      (time) => +dayjs(time ? time * 1000 : undefined).format('HHmm')
    );
    const theme = currentTime >= sunriseTime && currentTime <= sunsetTime ? 'day' : 'night';
    document.documentElement.setAttribute('theme', theme);
  }, [results]);

  return (
    <div aria-hidden className={styles.wrapper}>
      {results.map(({ data }, index) => {
        const key = (data?.lat ?? 0) + (data?.lon ?? 0);
        return data ? <LocationItem index={index} key={key} data={data} /> : null;
      })}
      <LocationItem isCreateButton />
    </div>
  );
};

export default LocationWrapper;
