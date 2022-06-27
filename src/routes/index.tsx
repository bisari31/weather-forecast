import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import styles from './app.module.scss';
import { getWeatherForecast5DaysApi } from 'services/weather';
import { geolocationState, geolocationStateData } from 'states/weather';

import Location from './location';
import DayList from './dayList';
import ChartList from './chartList';

const App = () => {
  const geolocation = useRecoilValue(geolocationState);
  const [data, setData] = useRecoilState(geolocationStateData);

  useEffect(() => {
    getWeatherForecast5DaysApi(geolocation).then((res) => {
      setData(res.data);
      console.log(data);
    });
  }, [geolocation, setData]);

  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      <Location data={data} />
      <DayList data={data.hourly} />
      <ChartList data={data.daily} />
    </div>
  );
};

export default App;
