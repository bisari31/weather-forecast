import { VictoryArea, VictoryAxis, VictoryChart, VictoryGroup, VictoryLabel, VictoryLine } from 'victory'
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

  if (!active) return null
  return (
    <div className={cx(styles.chart, { [styles.active]: active })}>
      <svg className={styles.gradient}>
        <linearGradient id='myGradient' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='11%' stopColor='#fed057' stopOpacity={0.3} />
          <stop
            offset='85%'
            stopColor={`${document.documentElement.getAttribute('theme') === 'day' ? '#3c6ad4' : '#101039'}`}
            stopOpacity={0.1}
          />
        </linearGradient>
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
          {/* <VictoryLabel
            className={styles.label}
            x={0}
            y={10}
            text={changePropMean}
            style={{
              fill: '#ffffff99',
            }}
          /> */}
          <VictoryArea
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
                fill: 'url(#myGradient)',
                stroke: '#fed057',
                strokeWidth: 2,
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
