import { useState } from 'react'
import cx from 'classnames'
import dayjs from 'dayjs'

import { IList } from 'types/weather'
import styles from './daylist.module.scss'

import DayItem from './DayItem'

interface IProps {
  data: IList[] | undefined
}

const DayList = ({ data }: IProps) => {
  const [buttonList, setButtonList] = useState([
    { id: 1, text: 'Today', active: true },
    { id: 2, text: 'Tomorrow', active: false },
    { id: 3, text: 'More days', active: false },
  ])

  const handleChangeActive = (id: number) =>
    setButtonList((prev) =>
      prev.map((list) => (list.id === id ? { ...list, active: true } : { ...list, active: false }))
    )

  const getSelectedDate = () => {
    const activeList = buttonList.filter((list) => list.active)
    return activeList[0].text
  }

  const getActiveDateData = () => {
    const text = getSelectedDate()
    const days = dayjs()
    let activeDate = ''

    switch (text) {
      case 'Today':
        activeDate = days.format('DD')
        break
      case 'Tomorrow':
        activeDate = days.add(1, 'd').format('DD')
        break
      case 'More days':
        activeDate = days.add(2, 'd').format('DD')
        break
      default:
        break
    }

    if (text === 'More days') {
      return data?.filter((item) => dayjs(item.dt_txt).format('DD') >= activeDate)
    }

    return data?.filter((item) => dayjs(item.dt_txt).format('DD') === activeDate)
  }

  const newData = getActiveDateData()

  return (
    <div>
      <ul className={styles.wrapper}>
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
      <DayItem data={newData} />
    </div>
  )
}

export default DayList
