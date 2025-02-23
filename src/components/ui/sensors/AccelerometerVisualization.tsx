'use client';

import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

/*interface AccelerometerChartProps {
  workoutId: string;
}
  
const AccelerometerChart: React.FC<AccelerometerChartProps> = ({workout_id}) => {
*/


const AccelerometerChart: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const chartDom = document.getElementById('chart-container');
    if (!chartDom) {
      console.error('Chart container not found');
      return;
    }
    
    const chart = echarts.init(chartDom);

    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        // Add pagination parameters
        const response = await fetch('http://localhost:8000/api/sensor-readings/?page=1&page_size=100');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        const data = result.results; // Access the paginated results
        
        console.log('Data structure:', {
          totalReadings: data.length,
          firstReading: data[0],
          sampleAccX: data[0]?.acc_x
        });
        
        // Transform the data
        //const timestamps = data.map((row: any) => row.timestamp);
        /*
        const accX = data.map((row: any) => {
          const value = parseFloat(row.acc_x);
          if (isNaN(value)) {
            console.warn('Invalid acc_x value:', row.acc_x);
            return 0;
          }
          return value;
        }); */

        //TODO Update this to be the pulled value
        const intervalPerPoint = 100; // Interval in milliseconds between each point

        const timestamps = data.flatMap((row: any) => {
          const startTimestamp = new Date(row.timestamp).getTime(); // Convert to milliseconds
          return Array.from({ length: 10 }, (_, i) => new Date(startTimestamp + i * intervalPerPoint).toISOString());
        });

        const accX = data.flatMap((row: any) => 
          row.acc_x.map((value: any) => {
            const parsedValue = parseFloat(value);
            return isNaN(parsedValue) ? 0 : parsedValue;
          })
        );
        
        /*
        const accY = data.map((row: any) => {
          const value = parseFloat(row.acc_y);
          console.log(value);
          if (isNaN(value)) {
            console.warn('Invalid acc_y value:', row.acc_y);
            return 0;
          }
          return value;
        }); */
        const accY = data.flatMap((row: any) => 
          row.acc_y.map((value: any) => {
            const parsedValue = parseFloat(value);
            return isNaN(parsedValue) ? 0 : parsedValue;
          })
        );
        
        /*
        const accZ = data.map((row: any) => {
          const value = parseFloat(row.acc_z);
          if (isNaN(value)) {
            console.warn('Invalid acc_z value:', row.acc_z);
            return 0;
          }
          return value;
        });*/
        const accZ = data.flatMap((row: any) => 
          row.acc_z.map((value: any) => {
            const parsedValue = parseFloat(value);
            return isNaN(parsedValue) ? 0 : parsedValue;
          })
        );
        

        const option = {
          title: {
            text: 'Sample XXX Accelerometer Data',
          },
          legend: {
            data: ['Acc X', 'Acc Y', 'Acc Z']
          },
          tooltip: {
            trigger: 'axis',
            formatter: function(params: any) {
              const dataIndex = params[0].dataIndex;
              return `Time: ${new Date(timestamps[dataIndex]).toLocaleString()}<br/>
                      Value: ${params[0].value}`;
            }
          },
          xAxis: {
            type: 'category',
            data: timestamps,
            axisLabel: {
              formatter: (value: string) => new Date(value).toLocaleTimeString(),
            }
          },
          yAxis: {
            type: 'value',
            name: 'Acceleration (g)',
          },
          series: [
            {
              name: 'Acc X',
              type: 'line',
              data: accX,
              sampling: 'lttb'
            },
            {
              name: 'Acc Y',
              type: 'line',
              data: accY,
              sampling: 'lttb'
            },
            {
              name: 'Acc Z',
              type: 'line',
              data: accZ,
              sampling: 'lttb'
            }
          ],
          dataZoom: [{
            type: 'inside',
            start: 0,
            end: 100
          }, {
            start: 0,
            end: 100
          }]
        };

        chart.setOption(option);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    fetchData();

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (error) {
    return <div className="p-4 text-red-500">Error loading data: {error}</div>;
  }

  return (
    <div className="p-4">
      <div id="chart-container" style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default AccelerometerChart;