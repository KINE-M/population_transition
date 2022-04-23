import { FC } from 'react';
import { randomColorHex } from '../../util/color';
import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';

interface PopulationChartProps {
  populationValue: any;
  checkedPrefList: any[][];
}

const PopulationChart: FC<PopulationChartProps> = ({ populationValue, checkedPrefList }) => {
  return (
    <div className="chart-box">
      <LineChart
        width={400}
        height={500}
        margin={{
          top: 30,
          right: 30,
          left: 30,
          bottom: 30,
        }}
        data={populationValue}
      >
        {checkedPrefList &&
          checkedPrefList.map((item) => <Line key={item[1]} type="monotone" dataKey={item[1]} />)}
        <XAxis
          dataKey="year"
          label={{ value: '年度', angle: 0, position: 'insideBottomRight', offset: -15 }}
        />
        <YAxis label={{ value: '人口数', angle: 0, position: 'insideTopLeft', offset: -25 }} />
        <Legend verticalAlign="bottom" />
      </LineChart>
    </div>
  );
};

export default PopulationChart;
