'use client'; 
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const BookRequestsChart: React.FC = () => {
  // Dummy data for book requests
  const months: string[] = [
    'J', 'F', 'M', 'A', 'M', 'J',
    'J', 'A', 'S', 'O', 'N', 'D'
  ];

  const bookRequestsData: { x: string; y: number }[] = months.map((month, index) => ({
    x: month,
    y: Math.floor(Math.random() * 100) // Dummy data for number of book requests
  }));

  return (
    <div>
      <h2 style={{ marginBottom: '10px' }}>Book Requests per Month</h2>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 20 }}
        width={200} // Set the width of the chart
        height={200} // Set the height of the chart
      >
        <VictoryAxis
          tickValues={months}
          tickFormat={months}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(t) => `${t}`}
        />
        <VictoryBar
          data={bookRequestsData}
          x="x"
          y="y"
          style={{
            data: { fill: 'rgba(75,192,192,0.2)', stroke: 'rgba(75,192,192,1)', strokeWidth: 1 },
            labels: { fontSize: 10 }
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default BookRequestsChart;



