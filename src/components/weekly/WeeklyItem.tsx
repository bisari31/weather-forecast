import dayjs from 'dayjs';

import styles from './weeklyItem.module.scss';
import images from 'assets/img/';
import SliderWrapper from 'components/Slider';

interface Props {
  data?: Hourly[];
}
const WeeklyItem = ({ data }: Props) => {
  return (
    <SliderWrapper>
      {!data?.length ? (
        <div className={`${styles.update} ${styles.list}`}>1시 업데이트</div>
      ) : (
        data?.map(({ dt, temp, weather }) => (
          <div className={styles.list} key={dt}>
            <img src={images[weather[0].icon]} alt='weatherImage' />
            <time dateTime={dayjs(dt * 1000).format('hh:mm')}>{dayjs(dt * 1000).format('h A ')}</time>
            <span>{Math.round(temp)}</span>
          </div>
        ))
      )}
    </SliderWrapper>
  );
};

export default WeeklyItem;
