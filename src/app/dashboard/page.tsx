// app/page.tsx
'use client';

import Dashboard from '@/components/ui/sensors/dashboard';
import React from 'react';

export default function Home() {
    return (
        <main className="min-h-screen">
            <title>Smartweight Dashboard</title>
            <Dashboard />
        </main>
    );
}