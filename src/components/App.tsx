import { useRecoilValue } from 'recoil';
import { useQueries } from 'react-query';

import styles from './app.module.scss';
import { getWeatherForecast5DaysApi } from 'services/weather';
import { coordinatesState } from 'atom/weather';

import LocationList from './location/LocationList';
import WeeklyList from './weekly/WeeklyList';
import ChartList from './chart/ChartList';

const App = () => {
  const coordinates = useRecoilValue(coordinatesState);
  const results = useQueries(
    coordinates.map((coords) => {
      return {
        queryKey: ['weatherApi', coords],
        queryFn: () => getWeatherForecast5DaysApi(coords),
      };
    })
  );

  return (
    <div className={styles.wrapper}>
      <LocationList results={results} />
      <WeeklyList result={results[0].data} />
      <ChartList result={results[0].data} />
    </div>
  );
};

export default App;
