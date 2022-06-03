import dayjs from 'dayjs'

import { IWeatherData } from 'types/weather'
import styles from './mainweather.module.scss'
import Clouds from 'assets/img/Clouds.png'
import { Navi } from 'assets/svgs/weather'

interface IProps {
  data?: IWeatherData
}

const TitleWeather = ({ data }: IProps) => {
  const today = dayjs(new Date()).format('ddd, D MMM')

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.today}>Today</p>
        <p className={styles.engToday}>{today}</p>
      </div>
      <div className={styles.wrapper}>
        <p className={styles.temp}>{Math.round(Number(data?.list[2].main.temp))}</p>
        <img src={Clouds} alt='weatherImage' />
      </div>
      <div className={styles.wrapper}>
        <p className={styles.city}>
          <Navi />
          {data?.city.name}
        </p>
      </div>
    </div>
  )
}

export default TitleWeather
