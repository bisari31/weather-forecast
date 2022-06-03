import { Routes, Route } from 'react-router-dom'
import Home from './weather'

const WeatherApp = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  )
}

export default WeatherApp
