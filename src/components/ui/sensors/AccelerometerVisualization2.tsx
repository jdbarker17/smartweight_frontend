'use client';

import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

interface AccelerometerChartProps {
    workoutId: string;
}

function applyLowPassFilter(data: number[], alpha: number = 0.9): number[] {
    if (!data.length) return [];
  
    const filtered: number[] = [];
    filtered[0] = data[0]; // Initialize first element
  
    for (let i = 1; i < data.length; i++) {
      filtered[i] = alpha * filtered[i - 1] + (1 - alpha) * data[i];
    }
  
    return filtered;
  }

const AccelerometerChart: React.FC<AccelerometerChartProps> = ({ workoutId }) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!workoutId) return; // Don't fetch if no workout is selected

        const chartDom = document.getElementById('chart-container-accel');
        if (!chartDom) {
            console.error('Chart container not found');
            return;
        }
        
        const chart = echarts.init(chartDom);

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/workouts/${workoutId}/sensor_readings/`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                const data = result.results;
                console.log(`Values of the response are ${JSON.stringify(Object.values(data), null, 2)}`);

                const intervalPerPoint = 100;

                const timestamps = data.flatMap((row: any) => {
                    const startTimestamp = new Date(row.timestamp).getTime();
                    //console.log(row.values);
                    // Get number of points from the amount of points in accX
                    const numPoints = row.acc_x.length;
                    return Array.from({ length: numPoints }, (_, i) => 
                        new Date(startTimestamp + i * intervalPerPoint).toISOString()
                    );
                });

                const accX = data.flatMap((row: any) => 
                    row.acc_x.map((value: any) => {
                        const parsedValue = parseFloat(value) * -1;
                        return isNaN(parsedValue) ? 0 : parsedValue;
                    })
                );

                const accY = data.flatMap((row: any) => 
                    row.acc_y.map((value: any) => {
                        const parsedValue = parseFloat(value) * -1;
                        return isNaN(parsedValue) ? 0 : parsedValue;
                    })
                );

                const accZ = data.flatMap((row: any) => 
                    row.acc_z.map((value: any) => {
                        const parsedValue = parseFloat(value) * -1;
                        return isNaN(parsedValue) ? 0 : parsedValue;
                    })
                );

                // Apply low-pass filter to each axis
                //const alpha = 0.85; // Adjust to taste
                const alpha = 0.2; // Adjust to taste
                const accX_filt = applyLowPassFilter(accX, alpha);
                const accY_filt = applyLowPassFilter(accY, alpha);
                const accZ_filt = applyLowPassFilter(accZ, alpha);




                const chartOption = {
                    title: {
                        text: `Workout ${workoutId} Accelerometer Data`,
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
                            data: accX_filt,
                            sampling: 'lttb'
                        },
                        {
                            name: 'Acc Y',
                            type: 'line',
                            data: accY_filt,
                            sampling: 'lttb'
                        },
                        {
                            name: 'Acc Z',
                            type: 'line',
                            data: accZ_filt,
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

                chart.setOption(chartOption);
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
    }, [workoutId]);

    if (error) {
        return <div className="p-4 text-red-500">Error loading data: {error}</div>;
    }

    return (
        <div className="p-4">
            <div id="chart-container-accel" style={{ width: '100%', height: '500px' }} />
        </div>
    );
};

export default AccelerometerChart;