import dayjs from 'dayjs';

import styles from './weeklyItem.module.scss';
import images from 'assets/img/';

import SliderWrapper from 'components/Slider';

interface Props {
  data?: Hourly[];
  timezone?: string;
}
const WeeklyItem = ({ data, timezone }: Props) => {
  return (
    <SliderWrapper>
      {!data?.length ? (
        <div className={`${styles.update} ${styles.list}`}>
          <p>1시 업데이트</p>
        </div>
      ) : (
        data?.map(({ dt, temp, weather }) => (
          <div className={styles.list} key={dt}>
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
        ))
      )}
    </SliderWrapper>
  );
};

export default WeeklyItem;
