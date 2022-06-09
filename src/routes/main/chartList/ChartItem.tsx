import { VictoryAxis, VictoryChart, VictoryGroup, VictoryLabel, VictoryLine } from 'victory'
import cx from 'classnames'

import styles from './chartitem.module.scss'
import { IDaliy } from 'types/weather'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

interface IProps {
  mean?: string
  active: boolean
  data: IDaliy[]
}

interface IState {
  x: string
  y: number
}

const Chart = ({ mean, active, data }: IProps) => {
  const [newData, setNewData] = useState<IState[]>()

  const changePropMean = () => {
    if (mean === 'rain') return 'Precipitation (%)'
    return 'Temperature (°C)'
  }

  useEffect(() => {
    const changeData = () => {
      const filterData = data.map((item) => {
        const target = Math.round(mean === 'rain' ? item.pop * 100 : item.temp.day)
        return { x: String(dayjs(item.dt * 1000).format('M.D')), y: target }
      })
      setNewData(filterData)
    }
    changeData()
  }, [data, mean])

  return (
    <div className={cx(styles.chart, { [styles.active]: active })}>
      <svg className={styles.gradient}>
        <defs>
          <linearGradient id='myGradient'>
            {/* <stop offset='0%' stopColor='#ffffff' opacity='0' /> */}
            <stop offset='24%' stopColor='#fed057' opacity='1' />
            <stop offset='100%' stopColor='#fed057' opacity='0' />
          </linearGradient>
        </defs>
      </svg>
      <VictoryChart domainPadding={{ x: 15, y: 15 }} padding={{ top: 40, bottom: 40, left: 15, right: 15 }}>
        <VictoryAxis
          style={{
            axis: { display: 'none' },
            tickLabels: {
              fontFamily: 'inherit',
              fill: '#ffffff99',
            },
          }}
        />
        <VictoryGroup
          data={newData}
          animate={{
            onLoad: {
              duration: 500,
            },
            duration: 1000,
          }}
        >
          <VictoryLabel
            className={styles.label}
            x={0}
            y={10}
            text={changePropMean}
            style={{
              fill: '#ffffff99',
            }}
          />
          <VictoryLine
            labels={({ datum }) => String(Math.round(datum.y))}
            style={{
              labels: {
                fontSize: '13',
                padding: 20,
                fontFamily: 'inherit',
                fill: '#ffffff99',
              },
              data: {
                stroke: 'url(#myGradient)',
                strokeWidth: 3,
                strokeLinecap: 'round',
              },
            }}
            interpolation='natural'
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  )
}

export default Chart
