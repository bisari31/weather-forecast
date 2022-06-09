import dayjs from 'dayjs'
import { useSetRecoilState } from 'recoil'
import cx from 'classnames'

import styles from './screen.module.scss'
import { IWeatherData } from 'types/weather'
import { Navi } from 'assets/svgs/weather'
import images from 'assets/img/'

import { geolocationState } from 'states/weather'

interface IProps {
  data?: IWeatherData
}

const TitleWeather = ({ data }: IProps) => {
  const today = dayjs().format('ddd, D MMM')
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

  return (
    <dl className={styles.container}>
      <div className={styles.wrapper}>
        <dt className={styles.today}>Today</dt>
        <dd className={styles.engToday}>{today}</dd>
      </div>
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

export default TitleWeather
