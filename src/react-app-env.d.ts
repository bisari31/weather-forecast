/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_WEATHER_APP_ID: string;
    REACT_APP_GEOCODING_ID: string;
  }
}
