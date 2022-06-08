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
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.today}>Today</p>
        <p className={styles.engToday}>{today}</p>
      </div>
      <div className={styles.wrapper}>
        <p className={styles.temp}>{Math.round(Number(data?.current.temp))}</p>

        <img src={images[data.current.weather[0].icon]} alt='weatherImage' />
      </div>
      <div className={cx(styles.wrapper, styles.detail)}>
        <p>{`${Math.round(data.daily[0].temp.max)} / ${Math.round(data.daily[0].temp.min)}`}</p>
      </div>
      <div className={styles.wrapper}>
        <p className={styles.city}>
          <Navi />
          <button onClick={getLocation} type='button'>
            {data?.timezone}
          </button>
        </p>
      </div>
    </div>
  )
}

export default TitleWeather
