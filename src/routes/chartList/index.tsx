import { useState } from 'react'
import cx from 'classnames'

import styles from './chartlist.module.scss'
import { IDaliy } from 'types/weather'

import ChartItem from './ChartItem'

interface IProps {
  data: IDaliy[]
}

const ChartList = ({ data }: IProps) => {
  const [buttonList, setButtonList] = useState([
    { id: 1, title: 'Temperature (°C)', mean: 'temp', active: true },
    { id: 2, title: 'Precipitation (%)', mean: 'rain', active: false },
  ])

  const handleChangeActive = (id: number) =>
    setButtonList((prev) =>
      prev.map((list) => (list.id === id ? { ...list, active: true } : { ...list, active: false }))
    )

  return (
    <div className={styles.wrapper}>
      <h2>Weather chart</h2>
      <ul className={styles.buttonList}>
        {buttonList.map((list) => (
          <li key={list.id}>
            <button
              className={cx({ [styles.active]: list.active })}
              type='button'
              onClick={() => handleChangeActive(list.id)}
            >
              {list.title}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.chartWrapper}>
        {buttonList.map((item) => (
          <ChartItem key={item.id} data={data} active={item.active} mean={item.mean} />
        ))}
      </div>
    </div>
  )
}

export default ChartList
