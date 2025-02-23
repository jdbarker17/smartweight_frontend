// Sidebar.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlkeLogo from '../dashboard/logo-color';

interface SidebarProps {
    onWorkoutSelect: (workoutId: string) => void;
}
/*
for (let i =0; i < deviceIds.length; i++){
    if (deviceIds[i].id == "180668370574044"){
        deviceIds[i].name = "Jon";
        setDeviceNames(deviceIds[i]);
        
    } 
    if (deviceIds[i].id == "277272330063220"){
        deviceIds[i].name = "Stephen";
    } 
} */

interface Device {
    id: string;
    user_id: string;
}

interface Workout {
    id: string;
    name: string;
    duration: number;
    created_at: string;
}

interface DeviceMap {
    
}

const Sidebar: React.FC<SidebarProps> = ({ onWorkoutSelect }) => {
    const [deviceIds, setDeviceIds] = useState<Device[]>([]);
    const [deviceNames, setDeviceNames] = useState<Device[]>([]);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);

    useEffect(() => {
        const fetchDeviceIds = async () => {
            try {
                const response = await axios.get<Device[]>('http://localhost:8000/api/device-ids/');
                //response.data
                setDeviceIds(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Error fetching device IDs:", error);
            }
        };
       

        fetchDeviceIds(); 

        
    }, []);

    const fetchWorkouts = async (deviceId: string) => {
        try {
            const response = await axios.get<Workout[]>(`http://localhost:8000/api/devices/${deviceId}/workouts/`);
            setWorkouts(response.data);
            setSelectedDevice(deviceId);
            setSelectedWorkoutId(null); // Reset selected workout when changing device
            onWorkoutSelect(""); // Clear the chart when changing device
        } catch (error) {
            console.error(`Error fetching workouts for device ${deviceId}:`, error);
        }
    };

    const handleWorkoutClick = (workoutId: string) => {
        setSelectedWorkoutId(workoutId);
        onWorkoutSelect(workoutId);
    };

    return (
        <div className="w-64 p-4 border-r bg-[#F4F4F9] rounded">
            {/*
            <div className="shrink w-64 h-14"><AlkeLogo /></div>
            */}

            <div className="flex justify-center mb-4">
                    <AlkeLogo className="w-full h-full border-0" />
            </div>
            

            <h2 className="text-xl  font-bold mb-4">Devices</h2>
            <ul className="space-y-2">
                {deviceIds.length > 0 ? (
                    deviceIds.map((device) => (
                        
                        <li key={device.id}>
                            <button 
                                onClick={() => fetchWorkouts(device.id)}
                                
                                className={`w-full text-left p-2 rounded text-[#586F7C] ${
                                    
                                    selectedDevice === device.id 
                                        ? 'bg-[#B8DBD9] text-[#04724D]' 
                                        : 'hover:bg-gray-100'
                                }`}
                            >   
                                {device.user_id}
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No devices available</li>
                )}
            </ul>

            {selectedDevice && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Workouts</h3>
                    <ul className="space-y-2">
                        {workouts.length > 0 ? (
                            workouts.map((workout) => (
                                <li key={workout.id}>
                                    <button 
                                        onClick={() => handleWorkoutClick(workout.id)}
                                        className={`w-full text-left p-2 rounded text-[#586F7C] ${
                                            selectedWorkoutId === workout.id 
                                                ? 'bg-[#B8DBD9] text-[#04724D]' 
                                                : 'hover:bg-gray-100'
                                        }`}
                                    >
                                        {new Date(workout.created_at).toLocaleString()}

                                    </button>
                                </li>
                            ))
                        ) : (
                            <li>No workouts available</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sidebar;