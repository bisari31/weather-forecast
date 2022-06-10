import { IWeatherData } from 'types/weather'
import styles from './location.module.scss'
import LocationItem from './LocationItem'

interface IProps {
  data?: IWeatherData
}

const Location = ({ data }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <LocationItem data={data} />
      <LocationItem type='add' data={data} />
    </div>
  )
}

export default Location
