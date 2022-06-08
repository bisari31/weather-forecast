import { VictoryAxis, VictoryChart, VictoryGroup, VictoryLabel, VictoryLine } from 'victory'
import cx from 'classnames'

import styles from './chartitem.module.scss'
import { ICurrent } from 'types/weather'

interface IProps {
  mean?: string
  active: boolean
  data: ICurrent[]
}

const testData = [
  { x: 'Mon', y: 20 },
  { x: 'Tue', y: 22 },
  { x: 'Wed', y: 24 },
  { x: 'Thu', y: 19 },
  { x: 'Fri', y: 26 },
]

const Chart = ({ mean, active, data }: IProps) => {
  const changePropMean = () => {
    if (mean === 'rain') return 'Precipitation (%)'
    return 'Temperature (°C)'
  }
  console.log(data)
  return (
    <div className={cx(styles.chart, { [styles.active]: active })}>
      <svg className={styles.gradient}>
        <defs>
          <linearGradient id='myGradient'>
            <stop offset='0%' stopColor='#ffffff' opacity='0' />
            <stop offset='34%' stopColor='#fed057' opacity='1' />
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
          data={testData}
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
                strokeWidth: 5,
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
