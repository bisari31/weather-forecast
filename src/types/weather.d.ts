interface IWeather {
  description: string
  icon: string
  id: number
  main: string
}

interface IMain {
  feels_like: number
  grnd_level: number
  humidity: number
  pressure: number
  sea_level: number
  temp: number
  temp_kf: number
  temp_max: number
  temp_min: number
}

interface ICoord {
  lat: number
  lon: number
}

interface IList {
  clouds: { all: string }
  dt: number
  dt_txt: string
  main: IMain
  pop: number
  sys: { pod: string }
  visibility: number
  weather
  wind: { deg: number; gust: number; speed: number }
}

interface ICity {
  coord: ICoord
  country: string
  id: number
  name: string
  population: number
  sunrise: number
  sunset: number
  timezone: number
}

export interface IWeatherData {
  city: ICity
  cnt: number
  cod: string
  list: IList[]
  message: number
}
