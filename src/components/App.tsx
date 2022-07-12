import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import styles from './app.module.scss';
import { getWeatherForecast5DaysApi } from 'services/weather';
import { geolocationState, geolocationStateData } from 'states/weather';

import Location from './location/Location';
import DayList from './dayList/DayList';
import ChartList from './chartList/ChartList';

dayjs.extend(utc);
dayjs.extend(timezone);

const App = () => {
  const geolocation = useRecoilValue(geolocationState);
  const [data, setData] = useRecoilState(geolocationStateData);

  useEffect(() => {
    getWeatherForecast5DaysApi(geolocation[0]).then((res) => {
      setData([res.data]);
    });
  }, []);

  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      <Location data={data} />
      <DayList data={data[0].hourly} timezone={data[0].timezone} />
      <ChartList data={data[0].daily} timezone={data[0].timezone} />
    </div>
  );
};

export default App;
