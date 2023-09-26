import axios from 'axios';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherForecast5DaysApi = async (coords: { lat: number; lon: number }) => {
  const { data } = await axios.get<WeatherData>(`${WEATHER_BASE_URL}/onecall`, {
    params: {
      ...coords,
      appid: process.env.REACT_APP_WEATHER_APP_ID,
      units: 'metric',
      exclude: 'minutely',
    },
  });
  return data;
};
