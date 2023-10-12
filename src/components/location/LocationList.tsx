import { useEffect } from 'react';
import dayjs from 'dayjs';
import type { UseQueryResult } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';

import LocationItem from './LocationItem';

interface Props {
  results: UseQueryResult<WeatherData, unknown>[];
}

const LocationList = ({ results }: Props) => {
  useEffect(() => {
    if (!results[0].data) return;
    const { sunrise, sunset } = results[0].data.current;
    const [currentTime, sunriseTime, sunsetTime] = [0, sunrise, sunset].map(
      (time) =>
        +dayjs(time ? time * 1000 : undefined)
          .tz(results[0].data?.timezone)
          .format('HHmm')
    );
    const theme = currentTime >= sunriseTime && currentTime <= sunsetTime ? 'day' : 'night';
    document.documentElement.setAttribute('theme', theme);
  }, [results]);

  return (
    <Swiper
      breakpoints={{
        480: { spaceBetween: 30 },
        570: { slidesPerView: 1.5, spaceBetween: 30 },
        768: { slidesPerView: 1.8, spaceBetween: 40 },
        1024: { slidesPerView: 2.3 },
      }}
      speed={500}
      slidesPerView={1.1}
      spaceBetween={30}
    >
      {results.map(({ data }, index) => {
        const key = (data?.lat ?? 0) + (data?.lon ?? 0);
        return data ? (
          <SwiperSlide key={key}>
            <LocationItem index={index} data={data} />
          </SwiperSlide>
        ) : null;
      })}
      <SwiperSlide>
        <LocationItem isCreateButton />
      </SwiperSlide>
    </Swiper>
  );
};

export default LocationList;
