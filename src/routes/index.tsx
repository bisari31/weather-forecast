import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import styles from './app.module.scss'
import { getWeatherForecast5DaysApi } from 'services/weather'
import { IWeatherData } from 'types/weather'

import Location from './location'
import DayList from './dayList'
import ChartList from './chartList'
import { geolocationState } from 'states/weather'

const App = () => {
  const geolocation = useRecoilValue(geolocationState)
  const [data, setData] = useState<IWeatherData>()

  useEffect(() => {
    getWeatherForecast5DaysApi(geolocation).then((res) => {
      setData(res.data)
    })
  }, [geolocation])

  if (!data) return null

  return (
    <div className={styles.wrapper}>
      <Location data={data} />
      <DayList data={data.hourly} />
      <ChartList data={data.daily} />
    </div>
  )
}

export default App
