// Dashboard.tsx
import React, { useState } from 'react';
import Sidebar from './sidebar';
import AccelerometerChart from './AccelerometerVisualization2';
import AlkeLogo from '../dashboard/logo-color';
import GyroChart from './GyroVisualization';

const Dashboard: React.FC = () => {
    const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

    return (
        <div className="flex">
            <Sidebar onWorkoutSelect={setSelectedWorkout} />
            <div className = "flex-1 flex flex-col">
                <div className="flex-1">
                    {selectedWorkout && <AccelerometerChart workoutId={selectedWorkout} />}
                    {selectedWorkout && <GyroChart workoutId={selectedWorkout} />}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;