import { useEffect } from 'react';
import dayjs from 'dayjs';
import type { UseQueryResult } from 'react-query';

import LocationItem from './LocationItem';
import SliderWrapper from 'components/Slider';

interface Props {
  results: UseQueryResult<WeatherData, unknown>[];
}

const LocationList = ({ results }: Props) => {
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
    <SliderWrapper>
      {results.map(({ data }, index) => {
        const key = (data?.lat ?? 0) + (data?.lon ?? 0);
        return data ? <LocationItem index={index} key={key} data={data} /> : null;
      })}
      <LocationItem isCreateButton />
    </SliderWrapper>
  );
};

export default LocationList;
