import dayjs from 'dayjs';
import { useEffect } from 'react';

import { IWeatherData } from 'types/weather';
import styles from './location.module.scss';

import LocationItem from './LocationItem';

interface IProps {
  data: IWeatherData[];
}

const Location = ({ data }: IProps) => {
  useEffect(() => {
    const currentTime = dayjs().format('HHm');
    const sunset = dayjs(data[0].current.sunset * 1000).format('HHm');
    const sunrise = dayjs(data[0].current.sunrise * 1000).format('HHm');
    const theme = currentTime >= sunrise && currentTime <= sunset ? 'day' : 'night';
    document.documentElement.setAttribute('theme', theme);
  }, [data]);

  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      {data.map((item: IWeatherData, index) => (
        <LocationItem index={index} key={item.lat + item.lon} data={item} />
      ))}
      <LocationItem type='add' data={data[0]} />
    </div>
  );
};

export default Location;
