import dayjs from 'dayjs'

import { IList } from 'types/weather'
import styles from './dayitem.module.scss'
import images from 'assets/img/'

interface IProps {
  data: IList[] | undefined
}

const DayItem = ({ data }: IProps) => {
  return (
    <ul className={styles.wrapper}>
      {data?.map((list: IList) => (
        <li key={list.dt}>
          <img src={images[list.weather[0].icon]} alt='weatherImage' />
          <time>
            <b>{dayjs(list.dt_txt).format('h A ')}</b>
            {dayjs(list.dt_txt).format('ddd')}
          </time>
          <span>{Math.round(list.main.temp)}</span>
        </li>
      ))}
    </ul>
  )
}

export default DayItem
