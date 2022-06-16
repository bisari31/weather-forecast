import dayjs from 'dayjs'
import { useEffect } from 'react'

import { IWeatherData } from 'types/weather'
import styles from './location.module.scss'

import LocationItem from './LocationItem'

interface IProps {
  data: IWeatherData
}

const Location = ({ data }: IProps) => {
  useEffect(() => {
    const currentTime = Number(dayjs().format('HHm'))
    const sunset = Number(dayjs(data.current.sunset * 1000).format('HHm'))
    const theme = currentTime >= sunset ? 'night' : 'day'
    document.documentElement.setAttribute('theme', theme)
  }, [data])

  return (
    <div className={styles.wrapper}>
      <LocationItem data={data} />
      <LocationItem type='add' data={data} />
    </div>
  )
}

export default Location
