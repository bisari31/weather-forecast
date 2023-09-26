import { useState } from 'react';
import dayjs from 'dayjs';

import styles from './weeklylist.module.scss';

import WeeklyItem from './WeeklyItem';

interface Props {
  result?: WeatherData;
}

const DAY_LIST = [
  {
    id: 1,
    text: '오늘',
  },
  {
    id: 2,
    text: '내일',
  },
  {
    id: 3,
    text: '모레',
  },
];

const WeeklyList = ({ result }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const getWeatherBySeletedIndex = () => {
    const today = dayjs().get('date');
    return result?.hourly.filter((item) => today + selectedIndex - 1 === dayjs(item.dt * 1000).get('date'));
  };

  const seletedWeatherData = getWeatherBySeletedIndex();

  return (
    <div>
      <ul className={styles.wrapper}>
        {DAY_LIST.map(({ id, text }) => (
          <li key={id}>
            <button
              className={id === selectedIndex ? styles.active : ''}
              type='button'
              onClick={() => setSelectedIndex(id)}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
      <WeeklyItem data={getWeatherBySeletedIndex()} />
    </div>
  );
};
export default WeeklyList;
