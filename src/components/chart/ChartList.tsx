import { useState } from 'react';

import styles from './chartlist.module.scss';

import ChartItem from './ChartItem';

interface Props {
  result?: WeatherData;
}

interface Button {
  id: number;
  title: string;
  text: 'temp' | 'rainfall';
}
const BUTTONS: Button[] = [
  { id: 1, title: '온도 (°C)', text: 'temp' },
  { id: 2, title: '강수확률 (%)', text: 'rainfall' },
];

const ChartList = ({ result }: Props) => {
  const [seletedIndex, setSeletedIndex] = useState(1);

  return (
    <div className={styles.wrapper}>
      <h2>주간 날씨</h2>
      <ul className={styles.buttonList}>
        {BUTTONS.map((list) => (
          <li key={list.id}>
            <button
              className={list.id === seletedIndex ? styles.active : ''}
              type='button'
              onClick={() => setSeletedIndex(list.id)}
            >
              {list.title}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.chartWrapper}>
        <ChartItem data={result?.daily} text={BUTTONS[seletedIndex - 1].text} />
      </div>
    </div>
  );
};
export default ChartList;
