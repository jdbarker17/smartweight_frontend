// app/page.tsx
'use client';

import Dashboard from '@/components/ui/sensors/dashboard';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Dashboard />
        </main>
    );
}