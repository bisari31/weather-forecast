import { useState } from 'react';
import cx from 'classnames';

import styles from './chartlist.module.scss';

import ChartItem from './ChartItem';
import { IDaliy } from 'types/weather';

interface IProps {
  data: IDaliy[];
  timezone: string;
}

const ChartList = ({ data, timezone }: IProps) => {
  const [buttonList, setButtonList] = useState([
    { id: 1, title: '온도 (°C)', mean: 'temp', active: true },
    { id: 2, title: '강수확률 (%)', mean: 'rain', active: false },
  ]);

  const handleChangeActive = (id: number) =>
    setButtonList((prev) =>
      prev.map((list) => (list.id === id ? { ...list, active: true } : { ...list, active: false }))
    );

  return (
    <div className={styles.wrapper}>
      <h2>주간 날씨</h2>
      <ul className={styles.buttonList}>
        {buttonList.map((list) => (
          <li key={list.id}>
            <button
              className={cx({ [styles.active]: list.active })}
              type='button'
              onClick={() => handleChangeActive(list.id)}
            >
              {list.title}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.chartWrapper}>
        {buttonList.map((item) => (
          <ChartItem timezone={timezone} key={item.id} data={data} active={item.active} mean={item.mean} />
        ))}
      </div>
    </div>
  );
};

export default ChartList;
