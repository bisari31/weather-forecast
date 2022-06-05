import { Routes, Route } from 'react-router-dom'

import Main from './main'
import Location from './location'
import Header from './_shared'

const WeatherApp = () => {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route index element={<Main />} />
        <Route path='location' element={<Location />} />
      </Route>
    </Routes>
  )
}

export default WeatherApp
