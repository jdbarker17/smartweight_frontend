'use client';

import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

interface GyroChartProps {
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

const GyroChart: React.FC<GyroChartProps> = ({ workoutId }) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!workoutId) return; // Don't fetch if no workout is selected

        const chartDom = document.getElementById('chart-container-gyro');
        if (!chartDom) {
            console.error('Chart container not found');
            return;
        }
        
        const chart = echarts.init(chartDom);

        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/workouts/${workoutId}/sensor_readings/?page=1&page_size=100`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                const data = result.results;

                const intervalPerPoint = 100;

                const timestamps = data.flatMap((row: any) => {
                    const startTimestamp = new Date(row.timestamp).getTime();
                    return Array.from({ length: 10 }, (_, i) => 
                        new Date(startTimestamp + i * intervalPerPoint).toISOString()
                    );
                });

                const gyrX = data.flatMap((row: any) => 
                    row.gyr_x.map((value: any) => {
                        const parsedValue = parseFloat(value) * -1;
                        return isNaN(parsedValue) ? 0 : parsedValue;
                    })
                );

                const gyrY = data.flatMap((row: any) => 
                    row.gyr_y.map((value: any) => {
                        const parsedValue = parseFloat(value) * -1;
                        return isNaN(parsedValue) ? 0 : parsedValue;
                    })
                );

                const gyrZ = data.flatMap((row: any) => 
                    row.gyr_z.map((value: any) => {
                        const parsedValue = parseFloat(value) * -1;
                        return isNaN(parsedValue) ? 0 : parsedValue;
                    })
                );

                // Apply low-pass filter to each axis
                //const alpha = 0.85; // Adjust to taste
                const alpha = 0.6; // Adjust to taste
                const gyrX_filt = applyLowPassFilter(gyrX, alpha);
                const gyrY_filt = applyLowPassFilter(gyrY, alpha);
                const gyrZ_filt = applyLowPassFilter(gyrZ, alpha);




                const chartOption = {
                    title: {
                        text: `Workout ${workoutId} Gyroscope Data`,
                    },
                    legend: {
                        data: ['Gyr X', 'Gyr Y', 'Gyr Z']
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
                        name: 'Gyro (g)',
                    },
                    series: [
                        {
                            name: 'Gyr X',
                            type: 'line',
                            data: gyrX_filt,
                            sampling: 'lttb'
                        },
                        {
                            name: 'Gyr Y',
                            type: 'line',
                            data: gyrY_filt,
                            sampling: 'lttb'
                        },
                        {
                            name: 'Gyr Z',
                            type: 'line',
                            data: gyrZ_filt,
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
            <div id="chart-container-gyro" style={{ width: '100%', height: '500px' }} />
        </div>
    );
};

export default GyroChart;