import dayjs from 'dayjs'

import { IHourly } from 'types/weather'
import styles from './dayitem.module.scss'
import images from 'assets/img/'

interface IProps {
  data: IHourly[] | undefined
}

const DayItem = ({ data }: IProps) => {
  return (
    <ul className={styles.wrapper}>
      {data?.map((list) => (
        <li key={list.dt}>
          <img src={images[list.weather[0].icon]} alt='weatherImage' />
          <time>
            <b>{dayjs(list.dt * 1000).format('h A ')}</b>
          </time>
          <span>{Math.round(list.temp)}</span>
        </li>
      ))}
    </ul>
  )
}

export default DayItem
