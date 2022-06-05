import a01d from './01d.png'
import a01n from './01n.png'
import a02d from './02d.png'
import a02n from './02n.png'
import a03d from './03d.png'
import a03n from './03n.png'
import a04d from './04d.png'
import a04n from './04n.png'
import a09d from './09d.png'
import a09n from './09n.png'
import a10d from './10d.png'
import a10n from './10n.png'
import a11d from './11d.png'
import a11n from './11n.png'
import a13d from './13d.png'
import a13n from './13n.png'
import a50d from './50d.png'
import a50n from './50n.png'

interface IImages {
  [key: string]: string
}

const images: IImages = {
  '01d': a01n,
  '01n': a01d,
  '02d': a02n,
  '02n': a02d,
  '03d': a03n,
  '03n': a03d,
  '04d': a04n,
  '04n': a04d,
  '09d': a09n,
  '09n': a09d,
  '10d': a10n,
  '10n': a10d,
  '11d': a11n,
  '11n': a11d,
  '13d': a13n,
  '13n': a13d,
  '50d': a50n,
  '50n': a50d,
}
export default images
