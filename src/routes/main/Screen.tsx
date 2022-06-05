import dayjs from 'dayjs'
import { useSetRecoilState } from 'recoil'

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

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.today}>Today</p>
        <p className={styles.engToday}>{today}</p>
      </div>
      <div className={styles.wrapper}>
        <p className={styles.temp}>{Math.round(Number(data?.list[2].main.temp))}</p>

        <img src={images[data?.list[2].weather[0].icon]} alt='weatherImage' />
      </div>
      <div className={styles.wrapper}>
        <p className={styles.city}>
          <Navi />
          <button onClick={getLocation} type='button'>
            {data?.city.name}
          </button>
        </p>
      </div>
    </div>
  )
}

export default TitleWeather
