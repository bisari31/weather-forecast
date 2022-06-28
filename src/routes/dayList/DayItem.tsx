import dayjs from 'dayjs';

import { IHourly } from 'types/weather';
import styles from './dayitem.module.scss';
import images from 'assets/img/';

interface IProps {
  data: IHourly[] | undefined;
}

const DayItem = ({ data }: IProps) => {
  return !data?.length ? (
    <ul className={styles.wrapper}>
      <li className={styles.update}>1시 업데이트</li>
    </ul>
  ) : (
    <ul className={styles.wrapper}>
      {data?.map((list) => (
        <li key={list.dt}>
          <img src={images[list.weather[0].icon]} alt='weatherImage' />
          <time dateTime={dayjs(list.dt * 1000).format('hh:mm')}>{dayjs(list.dt * 1000).format('h A ')}</time>
          <span>{Math.round(list.temp)}</span>
        </li>
      ))}
    </ul>
  );
};

export default DayItem;
