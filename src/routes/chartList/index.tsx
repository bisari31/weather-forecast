import { useState } from 'react'
import cx from 'classnames'

import styles from './chartlist.module.scss'
import ChartItem from './ChartItem'
import { IDaliy } from 'types/weather'

interface IProps {
  data: IDaliy[]
}

const ChartList = ({ data }: IProps) => {
  const [buttonList, setButtonList] = useState([
    { id: 1, text: 'Temperature', active: true },
    { id: 2, text: 'Precipitation', active: false },
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
              {list.text}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.chartWrapper}>
        <ChartItem data={data} active={buttonList[0].active} mean='temp' />
        <ChartItem data={data} active={buttonList[1].active} mean='rain' />
      </div>
    </div>
  )
}

export default ChartList
