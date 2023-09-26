import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { Navi, Plus } from 'assets/svgs/weather';
import images from 'assets/img/';
import styles from './locationitem.module.scss';
import { geolocationState } from 'states/weather';
import { getReverseGeocodingApi } from 'services/geocoding';

import Modal from './modal/Modal';

interface IProps {
  data?: WeatherData;
  isCreateButton?: boolean;
  index?: number;
}

const LocationItem = ({ data, isCreateButton = false, index }: IProps) => {
  const { data: city } = useQuery(['reverseGeocodingApi', { lat: data?.lat, lon: data?.lon }], () =>
    getReverseGeocodingApi(data?.lat, data?.lon)
  );

  const [showModal, setShowModal] = useState(false);
  const [geolocation, setGeolocation] = useRecoilState(geolocationState);

  const handleToggleModal = () => setShowModal((prev) => !prev);

  const handleLocationToggle = (coord: { lat: number; lon: number }) => {
    setGeolocation((prev) => (isCreateButton ? [...prev, coord] : prev.map((item, i) => (i === index ? coord : item))));
  };

  const handleLocationDelete = () => setGeolocation((prev) => prev.filter((_, prevItemIdx) => index !== prevItemIdx));

  return (
    <>
      {isCreateButton ? (
        <div aria-hidden='true' onClick={handleToggleModal} className={`${styles.plus} ${styles.container}`}>
          <Plus />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <p className={styles.temp}>{Math.round(Number(data?.current.temp))}</p>
            <img src={images[data?.current.weather[0].icon]} alt='weatherImage' />
          </div>
          <div className={`${styles.wrapper} ${styles.detail}`}>
            <p>{`${Math.round(data?.daily[0].temp.max ?? 0)} / ${Math.round(data?.daily[0].temp.min ?? 0)}`}</p>
          </div>
          <div className={styles.wrapper}>
            <p className={styles.city}>
              <Navi />
              <button onClick={handleToggleModal} type='button'>
                {city ?? '업데이트 중'}
              </button>
            </p>
          </div>
          <div className={styles.deleteWrapper}>
            {geolocation.length > 1 && <Plus onClick={handleLocationDelete} />}
          </div>
        </div>
      )}
      {showModal && <Modal onLocationToggle={handleLocationToggle} onModalToggle={handleToggleModal} />}
    </>
  );
};

export default LocationItem;
