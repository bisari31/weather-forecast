import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import styles from './app.module.scss';
import { getWeatherForecast5DaysApi } from 'services/weather';
import { geolocationState, geolocationStateData } from 'states/weather';

import Location from './location/Location';
import DayList from './dayList/DayList';
import ChartList from './chartList/ChartList';

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
      <DayList data={data[0].hourly} />
      <ChartList data={data[0].daily} />
    </div>
  );
};

export default App;
