import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

import { IWeatherData } from 'types/weather';
import styles from './location.module.scss';
import { useMouseSlider } from 'hooks';

import LocationItem from './LocationItem';

interface IProps {
  data: IWeatherData[];
}

const Location = ({ data }: IProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState(false);
  const [handleDragStart, handleDragEnd, handleDragMove] = useMouseSlider(scrollRef.current, type);

  useEffect(() => {
    const currentTime = dayjs().tz(data[0].timezone).format('HHmm');
    const sunrise = dayjs(data[0].current.sunrise * 1000)
      .tz(data[0].timezone)
      .format('HHm');
    const sunset = dayjs(data[0].current.sunset * 1000)
      .tz(data[0].timezone)
      .format('HHm');
    const theme = currentTime >= sunrise && currentTime <= sunset ? 'day' : 'night';
    document.documentElement.setAttribute('theme', theme);
  }, [data]);

  useEffect(() => {
    setType(false);
    if (data.length > 2) setType(true);
  }, [data]);

  if (!data) return null;

  return (
    <div
      aria-hidden
      className={styles.wrapper}
      ref={scrollRef}
      onMouseUp={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseLeave={handleDragEnd}
    >
      {data.map((item: IWeatherData, index) => (
        <LocationItem index={index} key={item.lat + item.lon} data={item} />
      ))}
      <LocationItem type='add' data={data[0]} />
    </div>
  );
};

export default Location;
