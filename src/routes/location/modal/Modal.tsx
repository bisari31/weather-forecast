import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import styles from './modal.module.scss';
import { getGeoCodingApi } from 'services/geocoding';
import { IResults } from 'types/location';

import Portal from './Portal';
import { getWeatherForecast5DaysApi } from 'services/weather';
import { geolocationState } from 'states/weather';

interface IProps {
  showModal: boolean;
  handleChangeOption: () => void;
  type?: string;
}

const Modal = ({ handleChangeOption, showModal, type }: IProps) => {
  const [text, setText] = useState('');
  const [locationList, setLocationList] = useState<IResults[]>([]);
  const [status, setStatus] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [geolocation, setGeolocation] = useRecoilState(geolocationState);

  const optionRef = useRef<HTMLDivElement>(null);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value);

  const handleClickOutSide = (e: MouseEvent | Event) => {
    const target = e.target as HTMLDivElement;
    if (showModal && !optionRef.current?.contains(target)) handleChangeOption();
  };

  const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => setSelectedLocation(e.currentTarget.value);

  const getAdressApi = (e: FormEvent) => {
    e.preventDefault();
    getGeoCodingApi(text).then((res) => {
      setLocationList(res.data.results);
      setStatus(res.data.status);
      if (selectedLocation) {
        handleAddOrModifyLocation();
        handleChangeOption();
      }
    });
  };

  const handleAddOrModifyLocation = () => {
    if (type !== 'add') {
      const data = locationList[0].geometry.location;
      setGeolocation({ lat: data.lat, lon: data.lng });
    }
  };

  useEffect(() => {
    if (showModal) document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  });

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleChangeOption();
    };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  });

  return (
    <Portal>
      <div className={styles.background}>
        <div className={styles.wrapper} ref={optionRef}>
          <h2>지역을 입력하세요.</h2>
          <form action='' onSubmit={getAdressApi}>
            <input
              type='text'
              placeholder='서울'
              className={styles.textInput}
              value={text}
              onChange={handleChangeText}
            />
            <ul className={styles.locationList}>
              {status === 'ZERO_RESULTS' ? (
                <li className={styles.errorMsg}>해당 지역이 없습니다.</li>
              ) : (
                locationList.map((list: IResults) => (
                  <li key={list.place_id}>
                    <input
                      onChange={handleChangeLocation}
                      type='radio'
                      value={list.formatted_address}
                      name='location'
                    />
                    <label>{list.formatted_address}</label>
                  </li>
                ))
              )}
            </ul>
            <div className={styles.btnWrapper}>
              <button type='button' className={styles.cancel} onClick={handleChangeOption}>
                Cancel
              </button>
              <button type='button' onClick={getAdressApi}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
