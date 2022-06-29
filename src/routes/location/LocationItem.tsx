import { useSetRecoilState, useRecoilState } from 'recoil';
import cx from 'classnames';
import { useEffect, useState } from 'react';

import styles from './locationitem.module.scss';
import { IWeatherData } from 'types/weather';
import { Navi, Plus } from 'assets/svgs/weather';
import images from 'assets/img/';

import { getGeoCodingLatlngApi } from 'services/geocoding';
import Modal from './modal/Modal';
import { geolocationState, geolocationStateData } from 'states/weather';
import { getWeatherForecast5DaysApi } from 'services/weather';
import { ICoordinate } from 'types/location';

interface IProps {
  data: IWeatherData;
  type?: string;
  index?: number;
}

const LocationItem = ({ data, type, index }: IProps) => {
  const [city, setCity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const setData = useSetRecoilState(geolocationStateData);
  const [gelocation, setGeolocation] = useRecoilState(geolocationState);

  const handleChangeOption = () => setShowModal((prev) => !prev);

  const handleAddOrModifyLocation = (coordinate: ICoordinate) => {
    const newCoordinate = { lat: coordinate.lat, lon: coordinate.lng };
    if (index === undefined) {
      setGeolocation((prev) => [...prev, newCoordinate]);
      getWeatherForecast5DaysApi(newCoordinate).then((res) => {
        setData((prev) => [...prev, res.data]);
      });
    } else {
      setGeolocation((prev) => prev.map((item, num) => (num === index ? newCoordinate : item)));
      getWeatherForecast5DaysApi(newCoordinate).then((res) => {
        setData((prev) => prev.map((item, dataIndex) => (dataIndex === index ? res.data : item)));
      });
    }
  };

  useEffect(() => {
    if (index === undefined) return;
    const { lat, lon } = gelocation[index];
    getGeoCodingLatlngApi(lat, lon)
      .then((res) => {
        if (!res.data.results[4].formatted_address) throw new Error();
        setCity(res.data.results[4].formatted_address);
      })
      .catch(() => setCity('업데이트 중'));
  }, [data, gelocation, index]);

  return type === 'add' ? (
    <>
      <div aria-hidden='true' onClick={handleChangeOption} className={cx(styles.plus, styles.container)}>
        <Plus />
      </div>
      {showModal && (
        <Modal
          handleAddOrModifyLocation={handleAddOrModifyLocation}
          handleChangeOption={handleChangeOption}
          showModal={showModal}
        />
      )}
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
            <button onClick={handleChangeOption} type='button'>
              {city.length > 18 ? `${city.slice(0, 18)}...` : city}
            </button>
          </dt>
        </div>
      </dl>
      {showModal && (
        <Modal
          handleAddOrModifyLocation={handleAddOrModifyLocation}
          handleChangeOption={handleChangeOption}
          showModal={showModal}
        />
      )}
    </>
  );
};

export default LocationItem;
