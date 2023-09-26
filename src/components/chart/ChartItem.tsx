import { Area, XAxis, AreaChart, ResponsiveContainer, LabelList } from 'recharts';
import dayjs from 'dayjs';

import styles from './chartitem.module.scss';

interface Props {
  text: 'temp' | 'rainfall';
  data?: Daliy[];
}

const ChartItem = ({ text, data }: Props) => {
  const newData = data?.map((item) => {
    const { day, eve, morn, night } = item.temp;
    const value = Math.round(text === 'rainfall' ? item.pop * 100 : (day + eve + morn + night) / 4);
    return { x: String(dayjs(item.dt * 1000).format('M.D')), y: value };
  });

  return (
    <ResponsiveContainer width='100%' height={250} className={styles.chart}>
      <AreaChart margin={{ top: 20, right: 5, left: 5, bottom: 0 }} data={newData}>
        <defs>
          <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='11%' stopColor='#fed057' stopOpacity={0.3} />
            <stop
              offset='85%'
              stopColor={`${document.documentElement.getAttribute('theme') === 'day' ? '#3c6ad4' : '#29295c'}`}
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
  );
};

export default ChartItem;
