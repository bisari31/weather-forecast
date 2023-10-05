import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import { getGeocodingApi } from 'services/geocoding';
import styles from './modal.module.scss';

import Portal from './Portal';

interface Props {
  onModalToggle: () => void;
  onLocationToggle: (coordinate: any) => void;
}

const Modal = ({ onLocationToggle, onModalToggle }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cityName, setCityName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { data, refetch, isSuccess } = useQuery(['search', cityName], () => getGeocodingApi(cityName), {
    enabled: false,
  });
  const handleCityNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setCityName(e.currentTarget.value);
  const handleChangeLocation = (e: React.ChangeEvent<HTMLLIElement>) => setSelectedIndex(+e.currentTarget.value);

  const handleAddLocation = () => {
    if (!data || selectedIndex < 0) return;
    onLocationToggle({ lat: data[selectedIndex].lat, lon: data[selectedIndex].lon });
    onModalToggle();
  };

  const geocoderTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Portal>
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <h2>지역을 입력 후 엔터키를 눌러주세요</h2>
          <form action='' onSubmit={geocoderTrigger}>
            <input
              ref={inputRef}
              type='text'
              value={cityName}
              onChange={handleCityNameChange}
              placeholder='안양시'
              className={styles.textInput}
            />
            <ul className={styles.locationList}>
              {!data?.length && isSuccess ? (
                <li className={styles.errorMsg}>검색 결과를 찾을 수 없습니다</li>
              ) : (
                data?.map((item, index) => (
                  <li key={item.name} onChange={handleChangeLocation}>
                    <label>
                      <input type='radio' value={index} name='location' />
                      {`${item.local_names?.ko ?? item.name} (${item.country})`}
                    </label>
                  </li>
                ))
              )}
            </ul>
            <div className={styles.btnWrapper}>
              <button type='button' className={styles.cancel} onClick={onModalToggle}>
                Cancel
              </button>
              <button type='button' onClick={handleAddLocation}>
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
