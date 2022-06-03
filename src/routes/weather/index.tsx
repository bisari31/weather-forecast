import { useEffect, useState } from 'react'

import styles from './home.module.scss'
import { getWeatherForecast5DaysApi } from 'services/weather'
import { IWeatherData } from 'types/weather'

import MainWeather from './MainWeather'
import DayList from './dayList'
import ChartList from './chartList'

const Home = () => {
  const [geolocation, setGeolocation] = useState({ lat: 33.402566, lon: 126.630647 })
  const [data, setData] = useState<IWeatherData>()

  useEffect(() => {
    getWeatherForecast5DaysApi(geolocation).then((res) => {
      setData(res.data)
    })
  }, [])

  return (
    <div className={styles.wrapper}>
      <header>
        <h1>Weather Forecast</h1>
      </header>
      <MainWeather data={data} />
      <DayList data={data?.list} />
      <ChartList />
    </div>
  )
}

export default Home
