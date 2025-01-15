'use client';

import AccelerometerVisualization from '@/components/AccelerometerVisualization';

export default function SensorsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Sensor Readings</h1>
      <div className="w-full">
        <AccelerometerVisualization />
      </div>
    </div>
  );
}