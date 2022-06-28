import { useCallback, useState } from 'react';
import cx from 'classnames';
import dayjs from 'dayjs';

import styles from './daylist.module.scss';

import DayItem from './DayItem';
import { IHourly } from 'types/weather';

interface IProps {
  data: IHourly[];
}

const DayList = ({ data }: IProps) => {
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
    if (text === '오늘') return data?.filter((item) => dayjs(item.dt * 1000).get('date') === dayjs().get('date'));
    if (text === '내일')
      return data?.filter((item) => dayjs(item.dt * 1000).get('date') === dayjs().add(1, 'd').get('date'));

    return data?.filter((item) => dayjs(item.dt * 1000).get('date') > dayjs().add(1, 'd').get('date'));
  }, [data, getSelectedDate]);

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
      <DayItem data={newData} />
    </div>
  );
};

export default DayList;
