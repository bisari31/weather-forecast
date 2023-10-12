import { useState } from 'react';
import dayjs from 'dayjs';
import { Swiper, SwiperSlide } from 'swiper/react';
import swiperType from 'swiper';

import styles from './weeklylist.module.scss';
import 'swiper/scss';

import WeeklyItem from './WeeklyItem';

interface Props {
  result?: WeatherData;
}

const DAY_LIST = [
  {
    id: 1,
    text: '오늘',
  },
  {
    id: 2,
    text: '내일',
  },
  {
    id: 3,
    text: '모레',
  },
];

const WeeklyList = ({ result }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [swiper, setSwiper] = useState<swiperType>();

  const getWeatherBySeletedIndex = () => {
    const today = dayjs().get('date');
    return result?.hourly.filter(
      (item) =>
        today + selectedIndex - 1 ===
        dayjs(item.dt * 1000)
          .tz(result.timezone)
          .get('date')
    );
  };

  const selectedWeatherItems = getWeatherBySeletedIndex();

  return (
    <div className={styles.wrapper}>
      <ul>
        {DAY_LIST.map(({ id, text }) => (
          <li key={id}>
            <button
              className={id === selectedIndex ? styles.active : ''}
              type='button'
              onClick={() => {
                setSelectedIndex(id);
                swiper?.slideTo(0);
              }}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
      {selectedWeatherItems?.length ? (
        <Swiper
          breakpoints={{
            480: { slidesPerView: 2.6, spaceBetween: 20 },
            570: { slidesPerView: 3.2, spaceBetween: 20 },
            768: { slidesPerView: 4.3, spaceBetween: 20 },
            1024: { slidesPerView: 5.8, spaceBetween: 10 },
          }}
          onSwiper={setSwiper}
          slidesPerView={2.1}
          spaceBetween={20}
        >
          {selectedWeatherItems.map((data) => (
            <SwiperSlide key={data.dt}>
              <WeeklyItem data={data} timezone={result?.timezone} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.list}>
          <p>업데이트 예정</p>
        </div>
      )}
    </div>
  );
};
export default WeeklyList;
