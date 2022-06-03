import { useState } from 'react'
import cx from 'classnames'

import { IList } from 'types/weather'
import styles from './daylist.module.scss'
import DayItem from './DayItem'
import dayjs from 'dayjs'

interface IProps {
  data: IList[] | undefined
}

const DayList = ({ data }: IProps) => {
  const [buttonList, setButtonList] = useState([
    { id: 1, text: 'Today', active: true },
    { id: 2, text: 'Tomorrow', active: false },
    { id: 3, text: 'Day after tomorrow', active: false },
  ])

  const handleChangeActive = (id: number) =>
    setButtonList((prev) =>
      prev.map((list) => (list.id === id ? { ...list, active: true } : { ...list, active: false }))
    )

  const getSelectedDate = () => {
    const activeList = buttonList.filter((list) => list.active)
    return activeList[0].text
  }

  const activeDateData = () => {
    const text = getSelectedDate()
    const days = dayjs(new Date())
    let activeDate = ''

    switch (text) {
      case 'Today':
        activeDate = days.format('dd')
        break
      case 'Tomorrow':
        activeDate = days.add(1, 'd').format('dd')
        break
      case 'Day after tomorrow':
        activeDate = days.add(2, 'd').format('dd')
        break
      default:
        break
    }
    return data?.filter((item) => dayjs(item.dt_txt).format('dd') === activeDate)
  }

  const newData = activeDateData()

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
