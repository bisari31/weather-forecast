import { useRecoilValue } from 'recoil';
import { useQueries } from 'react-query';

import styles from './app.module.scss';
import { getWeatherForecast5DaysApi } from 'services/weather';
import { geolocationState } from 'states/weather';

import LocationWrapper from './location/LocationWrapper';
// import DayList from './dayList/DayList';
// import ChartList from './chartList/ChartList';

const App = () => {
  const coordinates = useRecoilValue(geolocationState);
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
      <LocationWrapper results={results} />
      {/* <DayList result={results[0].data} />
      <ChartList result={results[0].data} /> */}
    </div>
  );
};

export default App;
