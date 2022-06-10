import { useSetRecoilState } from 'recoil'
import cx from 'classnames'

import styles from './locationitem.module.scss'
import { IWeatherData } from 'types/weather'
import { Navi, Plus } from 'assets/svgs/weather'
import images from 'assets/img/'

import { geolocationState } from 'states/weather'

interface IProps {
  data?: IWeatherData
  type?: string
}

const LocationItem = ({ data, type }: IProps) => {
  const setGeolocation = useSetRecoilState(geolocationState)

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = { lat: position.coords.latitude, lon: position.coords.longitude }
        setGeolocation(location)
      },
      () => {},
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    )
  }

  if (!data?.current) return null

  return type === 'add' ? (
    <div className={cx(styles.plus, styles.container)}>
      <Plus />
    </div>
  ) : (
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
          <button onClick={getLocation} type='button'>
            {data?.timezone}
          </button>
        </dt>
      </div>
    </dl>
  )
}

export default LocationItem
