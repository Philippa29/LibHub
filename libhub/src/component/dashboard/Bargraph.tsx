import React from 'react';
import { Bar } from '@ant-design/charts';

interface BarGraphProps {
  data: { x: string; y: number }[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  const config = {
    data,
    xField: 'x',
    yField: 'y',
    meta: {
      x: { alias: 'Category' },
      y: { alias: 'Value' },
    },
  };

  return <Bar {...config} />;
};

export default BarGraph;
