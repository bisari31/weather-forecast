import { useState } from 'react'
import cx from 'classnames'

import styles from './chartlist.module.scss'
import { IList } from 'types/weather'
import ChartItem from './ChartItem'

interface IProps {
  data: IList[] | undefined
}

const ChartList = ({ data }: IProps) => {
  const [buttonList, setButtonList] = useState([
    { id: 1, text: 'Temperature', active: false },
    { id: 2, text: 'Precipitation', active: true },
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
        <ChartItem active={buttonList[0].active} data={data} mean='temp' />
        <ChartItem active={buttonList[1].active} data={data} mean='rain' />
      </div>
    </div>
  )
}

export default ChartList
