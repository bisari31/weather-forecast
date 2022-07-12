import dayjs from 'dayjs';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import { IHourly } from 'types/weather';
import styles from './dayitem.module.scss';
import images from 'assets/img/';

interface IProps {
  data: IHourly[] | undefined;
  timezone: string;
}

const DayItem = ({ data, timezone }: IProps) => {
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState(0);
  const scrollRef = useRef<HTMLUListElement>(null);

  const handleDragStart = (e: MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
    if (scrollRef.current) {
      setIsDrag(true);
      setStartX(e.pageX + scrollRef.current.scrollLeft);
    }
  };

  const handleDragEnd = () => setIsDrag(false);

  const handleDragMove = (e: MouseEvent) => {
    if (isDrag && scrollRef.current) {
      scrollRef.current.scrollLeft = startX - e.pageX;
    }
  };

  useEffect(() => {
    console.log('랜더링');
  });

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
