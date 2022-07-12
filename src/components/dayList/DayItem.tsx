import dayjs from 'dayjs';
import { useRef } from 'react';

import { IHourly } from 'types/weather';
import styles from './dayitem.module.scss';
import images from 'assets/img/';
import { useMouseSlider } from 'hooks';

interface IProps {
  data: IHourly[] | undefined;
  timezone: string;
}

const DayItem = ({ data, timezone }: IProps) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [handleDragStart, handleDragEnd, handleDragMove] = useMouseSlider(scrollRef.current);

  return !data?.length ? (
    <ul className={styles.wrapper}>
      <li className={styles.update}>1시 업데이트</li>
    </ul>
  ) : (
    <ul
      className={styles.wrapper}
      ref={scrollRef}
      onMouseUp={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseLeave={handleDragEnd}
    >
      {data?.map((list) => (
        <li key={list.dt}>
          <img src={images[list.weather[0].icon]} alt='weatherImage' />
          <time
            dateTime={dayjs(list.dt * 1000)
              .tz(timezone)
              .format('hh:mm')}
          >
            {dayjs(list.dt * 1000)
              .tz(timezone)
              .format('h A ')}
          </time>
          <span>{Math.round(list.temp)}</span>
        </li>
      ))}
    </ul>
  );
};

export default DayItem;
