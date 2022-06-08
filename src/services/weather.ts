import { axios } from 'hooks/worker'
import { IWeatherData } from 'types/weather'

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

interface Params {
  lat: number
  lon: number
}

// 37.494958, 126.844128
export const getWeatherForecast5DaysApi = (params: Params) =>
  axios.get<IWeatherData>(`${WEATHER_BASE_URL}/onecall`, {
    params: {
      ...params,
      appid: process.env.REACT_APP_WEATHER_APP_ID,
      units: 'metric',
      exclude: 'minutely',
    },
  })
