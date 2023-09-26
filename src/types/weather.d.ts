interface Temp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}
interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface Hourly {
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
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface Daliy {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: { day: number; night: number; eve: number; morn: number };
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  rain: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  uvi: number;
  weather: IWeather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}

interface Current {
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

interface WeatherData {
  current: Current;
  daily: Daliy[];
  hourly: Hourly[];
  lat: number;
  lon: number;
  minutely: Current[];
  timezone: string;
  timezone_offset: number;
}
