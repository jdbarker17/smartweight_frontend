import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define types for devices and workouts
interface Device {
    id: string;
    name: string; // Add other properties if needed
}

interface Workout {
    id: string;
    name: string;
    duration: number; // Example property, adjust to match your API
    created_at: string;
}

interface SensorReading {
    id: string;
    name: string;
    duration: number; // Example property, adjust to match your API
    acc_x: Float32Array
    acc_y: Float32Array
    acc_z: Float32Array
}

const Sidebar: React.FC = () => {
    const [deviceIds, setDeviceIds] = useState<Device[]>([]);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
    const [sensor_readings, setSensorReadings] = useState<SensorReading[]>([]);

    // Fetch all device IDs on component mount
    useEffect(() => {
        const fetchDeviceIds = async () => {
            try {
                const response = await axios.get<Device[]>('http://localhost:8000/api/device-ids/');
                setDeviceIds(response.data);
            } catch (error) {
                console.error("Error fetching device IDs:", error);
            }
        };

        fetchDeviceIds();
    }, []);

    // Fetch all sensor readings for a specific device
    const fetchWorkouts = async (deviceId: string) => {
        try {
            const response = await axios.get<Workout[]>(`http://localhost:8000/api/devices/${deviceId}/workouts/`);
            setWorkouts(response.data);
            setSelectedDevice(deviceId); // Update the selected device
        } catch (error) {
            console.error(`Error fetching workouts for device ${deviceId}:`, error);
        }
    };

    return (
        <div className="sidebar">
            <h2>All Device IDs</h2>
            <ul>
                {deviceIds.length > 0 ? (
                    deviceIds.map((device) => (
                        <li key={device.id}>
                            <button onClick={() => fetchWorkouts(device.id)}>{device.id}</button>
                        </li>
                    ))
                ) : (
                    <li>No devices available</li>
                )}
            </ul>

            {selectedDevice && (
                <div>
                    <h3>Workouts for Device {selectedDevice}</h3>
                    <ul>
                        {workouts.length > 0 ? (
                            workouts.map((workout) => (
                                <li key={workout.id}>
                                    Date: {workout.created_at}
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
