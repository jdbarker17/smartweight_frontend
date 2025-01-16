'use client';

import AccelerometerVisualization from '@/components/ui/sensors/AccelerometerVisualization';
import SideNav from '@/components/ui/sensors/sidenav';
import Sidebar from '@/components/ui/sensors/navbar';
import { Metadata } from 'next';

 
export default function SensorsPage() {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <Sidebar />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-6">Sensor Readings</h1>
              <div className="w-full">
                <AccelerometerVisualization />
              </div>
            </div>
          </div>
        </div>
      );
}