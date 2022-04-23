import { FC } from 'react';
import { randomColorHex } from '../../util/color';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface PopulationChartProps {
  populationValue: any;
  checkedPrefList: any[][];
}

const PopulationChart: FC<PopulationChartProps> = ({ populationValue, checkedPrefList }) => {
  return (
    <div className="chart-box">
      <div className="chart">
        <ResponsiveContainer width={'90%'} height={550}>
          <LineChart
            width={400}
            height={500}
            margin={{
              top: 30,
              right: 5,
              left: 30,
              bottom: 30,
            }}
            data={populationValue}
          >
            {checkedPrefList &&
              checkedPrefList.map((item) => (
                <Line key={item[1]} type="monotone" dataKey={item[1]} stroke={randomColorHex()} />
              ))}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              fontSize={10}
              dataKey="year"
              label={{ value: '年度', position: 'insideBottomRight', offset: -5 }}
            />
            <YAxis
              fontSize={12}
              width={40}
              label={{ value: '人口数', angle: 0, position: 'insideTopLeft', offset: -20 }}
            />
            <Legend fontSize={8} iconSize={8} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PopulationChart;
