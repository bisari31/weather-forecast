import dayjs from 'dayjs';

import styles from './weeklyItem.module.scss';
import images from 'assets/img/';

interface Props {
  data: Hourly;
  timezone?: string;
}
const WeeklyItem = ({ data, timezone }: Props) => {
  const { weather, dt, temp } = data;

  return (
    <div className={styles.list}>
      <img src={images[weather[0].icon]} alt='weatherImage' />
      <time
        dateTime={dayjs(dt * 1000)
          .tz(timezone)
          .format('hh:mm')}
      >
        {dayjs(dt * 1000)
          .tz(timezone)
          .format('h A ')}
      </time>
      <span>{Math.round(temp)}</span>
    </div>
  );
};

export default WeeklyItem;
