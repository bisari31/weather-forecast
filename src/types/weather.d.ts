interface IFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

interface ITemp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}
interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface IHourly {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: IWeather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface IDaliy {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: IFeelsLike;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  rain: number;
  sunrise: number;
  sunset: number;
  temp: ITemp;
  uvi: number;
  weather: IWeather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface ICurrent {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: IWeather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

export interface IWeatherData {
  current: ICurrent;
  daily: IDaliy[];
  hourly: IHourly[];
  lat: number;
  lon: number;
  minutely: ICurrent[];
  timezone: string;
  timezone_offset: number;
}
