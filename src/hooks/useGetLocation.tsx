import { useState } from 'react'

interface ILocation {
  lat: number
  lon: number
}

const useGetLocation = () => {
  const [location, setLocation] = useState<ILocation>()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newGeoLocation = { lat: position.coords.latitude, lon: position.coords.longitude }
        setLocation(newGeoLocation)
      },
      (error) => {
        console.error(error)
      },
      {
        maximumAge: 0,
      }
    )
  }
  return { location }
}

export default useGetLocation
