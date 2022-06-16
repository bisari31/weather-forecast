import { VictoryAxis, VictoryChart, VictoryGroup, VictoryLabel, VictoryLine } from 'victory'
import cx from 'classnames'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

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

const Chart = ({ mean, active, data }: IProps) => {
  const [newData, setNewData] = useState<IState[]>()

  const changePropMean = () => {
    if (mean === 'Precipitation') return 'Precipitation (%)'
    return 'Temperature (°C)'
  }

  useEffect(() => {
    const changeData = () => {
      const filterData = data.map((item) => {
        const target = Math.round(mean === 'Precipitation' ? item.pop * 100 : item.temp.max)
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
            padding={{ top: 20, bottom: 60 }}
            labels={({ datum }) => String(Math.round(datum.y))}
            labelComponent={<VictoryLabel renderInPortal dy={-20} />}
            style={{
              labels: {
                fontSize: '13',
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
