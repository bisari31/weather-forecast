import { useRecoilState, useRecoilValue } from 'recoil';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import styles from './locationitem.module.scss';
import { IWeatherData } from 'types/weather';
import { Navi, Plus } from 'assets/svgs/weather';
import images from 'assets/img/';

import { getGeoCodingLatlngApi } from 'services/geocoding';
import Modal from './modal/Modal';
import { geolocationState, geolocationStateData } from 'states/weather';

interface IProps {
  data: IWeatherData;
  type?: string;
}

const LocationItem = ({ data, type }: IProps) => {
  const [city, setCity] = useState('');
  const [showModal, setShowModal] = useState(false);

  // const [geolocation, setGeolocation] = useRecoilState(geolocationStateData);
  const gelocation = useRecoilValue(geolocationState);

  // const getLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const location = { lat: position.coords.latitude, lon: position.coords.longitude }
  //       setGeolocation(location)
  //     },
  //     () => {},
  //     {
  //       enableHighAccuracy: true,
  //       maximumAge: 0,
  //     }
  //   )
  // }
  const handleChangeOption = () => setShowModal((prev) => !prev);

  useEffect(() => {
    const { lat, lon } = gelocation;
    getGeoCodingLatlngApi(lat, lon).then((res) => setCity(res.data.results[4].formatted_address));
  }, [data, gelocation]);

  return type === 'add' ? (
    <>
      <div aria-hidden='true' onClick={handleChangeOption} className={cx(styles.plus, styles.container)}>
        <Plus />
      </div>
      {showModal && <Modal type='add' handleChangeOption={handleChangeOption} showModal={showModal} />}
    </>
  ) : (
    <>
      <dl className={styles.container}>
        <div className={styles.wrapper}>
          <dt className={styles.temp}>{Math.round(Number(data?.current.temp))}</dt>
          <img src={images[data.current.weather[0].icon]} alt='weatherImage' />
        </div>
        <div className={cx(styles.wrapper, styles.detail)}>
          <dt>{`${Math.round(data.daily[0].temp.max)} / ${Math.round(data.daily[0].temp.min)}`}</dt>
        </div>
        <div className={styles.wrapper}>
          <dt className={styles.city}>
            <Navi />
            {/* <button type='button'>{city}</button> */}
            <button onClick={handleChangeOption} type='button'>
              {city}
            </button>
          </dt>
        </div>
      </dl>
      {showModal && <Modal handleChangeOption={handleChangeOption} showModal={showModal} />}
    </>
  );
};

export default LocationItem;
