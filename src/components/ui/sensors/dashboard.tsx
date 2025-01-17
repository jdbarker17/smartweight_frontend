// Dashboard.tsx
import React, { useState } from 'react';
import Sidebar from './sidebar';
import AccelerometerChart from './AccelerometerVisualization2';

const Dashboard: React.FC = () => {
    const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

    return (
        <div className="flex">
            <Sidebar onWorkoutSelect={setSelectedWorkout} />
            <div className="flex-1">
                {selectedWorkout && <AccelerometerChart workoutId={selectedWorkout} />}
            </div>
        </div>
    );
};

export default Dashboard;