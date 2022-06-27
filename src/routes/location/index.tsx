import dayjs from 'dayjs';
import { useEffect } from 'react';

import { IWeatherData } from 'types/weather';
import styles from './location.module.scss';

import LocationItem from './LocationItem';

interface IProps {
  data: IWeatherData;
}

const Location = ({ data }: IProps) => {
  useEffect(() => {
    const currentTime = dayjs().format('HHm');
    const sunset = dayjs(data.current.sunset * 1000).format('HHm');
    const sunrise = dayjs(data.current.sunrise * 1000).format('HHm');
    const theme = currentTime >= sunrise && currentTime <= sunset ? 'day' : 'night';

    document.documentElement.setAttribute('theme', theme);
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <LocationItem data={data} />
      <LocationItem type='add' data={data} />
    </div>
  );
};

export default Location;
