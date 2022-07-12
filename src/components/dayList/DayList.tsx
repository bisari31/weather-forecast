import { useCallback, useState } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';

import styles from './daylist.module.scss';

import DayItem from './DayItem';
import { IHourly } from 'types/weather';

interface IProps {
  data: IHourly[];
  timezone: string;
}

const DayList = ({ data, timezone }: IProps) => {
  const [buttonList, setButtonList] = useState([
    { id: 1, text: '오늘', active: true },
    { id: 2, text: '내일', active: false },
    { id: 3, text: '모레', active: false },
  ]);

  const handleChangeActive = (id: number) =>
    setButtonList((prev) =>
      prev.map((list) => (list.id === id ? { ...list, active: true } : { ...list, active: false }))
    );

  const getSelectedDate = useCallback(() => {
    const activeList = buttonList.filter((list) => list.active);
    return activeList[0].text;
  }, [buttonList]);

  const getActiveDateData = useCallback(() => {
    const text = getSelectedDate();
    const getDate = (item: IHourly) =>
      dayjs(item.dt * 1000)
        .tz(timezone)
        .get('date');
    switch (text) {
      case '오늘':
        return data?.filter((item) => getDate(item) === dayjs().tz(timezone).get('date'));
      case '내일':
        return data?.filter((item) => getDate(item) === dayjs().tz(timezone).add(1, 'd').get('date'));
      default:
        return data?.filter((item) => getDate(item) === dayjs().tz(timezone).add(2, 'd').get('date'));
    }
  }, [data, getSelectedDate, timezone]);

  const newData = getActiveDateData();

  return (
    <div>
      <ul className={styles.wrapper}>
        {buttonList.map((list) => (
          <li key={list.id}>
            <button
              className={cx({ [styles.active]: list.active })}
              type='button'
              onClick={() => handleChangeActive(list.id)}
            >
              {list.text}
            </button>
          </li>
        ))}
      </ul>
      <DayItem data={newData} timezone={timezone} />
    </div>
  );
};

export default DayList;
