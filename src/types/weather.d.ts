interface ITemp {
  day: number
  eve: number
  max: number
  min: number
  morn: number
  night: number
}
interface IWeather {
  description: string
  icon: string
  id: number
  main: string
}

interface ICurrent {
  clouds: number
  dew_point: number | { day: number; eve: number; morn: number; night: number }
  dt: number
  feels_like: number
  humidity: number
  pressure: number
  sunrise: number
  sunset: number
  temp: ITemp | number
  uvi: number
  visibility: number
  weather: IWeather[]
  wind_deg: number
  wind_gust: number
  wind_speed: number
}

export interface IWeatherData {
  current: ICurrent
  daily: ICurrent[]
  hourly: ICurrent[]
  lat: number
  lon: number
  minutely: ICurrent[]
  timezone: string
  timezone_offset: number
}
