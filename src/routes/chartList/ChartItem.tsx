import { useEffect, useState } from 'react'
import { Area, XAxis, AreaChart, ResponsiveContainer, LabelList } from 'recharts'
import cx from 'classnames'
import dayjs from 'dayjs'

import styles from './chartitem.module.scss'
import { IDaliy } from 'types/weather'

interface IProps {
  mean?: string
  active: boolean
  data: IDaliy[]
}

interface IState {
  x: string
  y: number
}

const ChartItem = ({ mean, active, data }: IProps) => {
  const [newData, setNewData] = useState<IState[]>()

  useEffect(() => {
    const changeData = () => {
      const filterData = data.map((item) => {
        const target = Math.round(mean === 'rain' ? item.pop * 100 : item.temp.max)
        return { x: String(dayjs(item.dt * 1000).format('M.D')), y: target }
      })
      setNewData(filterData)
    }
    changeData()
  }, [data, mean])

  if (!active) return null

  return (
    <ResponsiveContainer className={cx(styles.chart, { [styles.active]: active })} width={500} height={250}>
      <AreaChart margin={{ top: 20, right: 5, left: 5, bottom: 0 }} data={newData}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='11%' stopColor='#fed057' stopOpacity={0.3} />
            <stop
              offset='85%'
              stopColor={`${document.documentElement.getAttribute('theme') === 'day' ? '#3c6ad4' : '#101039'}`}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <XAxis
          padding={{ left: 10, right: 10 }}
          stroke='#ffffff99'
          tickLine={false}
          tick={{ fill: '#ffffff99' }}
          dataKey='x'
        />
        <Area type='monotone' dataKey='y' stroke='#fed057' strokeWidth={2} fillOpacity={1} fill='url(#color)'>
          <LabelList fontSize={13} dataKey='y' position='top' fill='#ffffff99' offset={8} />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default ChartItem
